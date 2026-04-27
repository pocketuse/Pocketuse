import { VercelRequest, VercelResponse } from "@vercel/node";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting (simple in-memory - use Redis for production)
const submissionTracker = new Map<string, number[]>();
const MAX_SUBMISSIONS_PER_HOUR = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;
  
  const submissions = submissionTracker.get(ip) || [];
  const recentSubmissions = submissions.filter(time => time > oneHourAgo);
  
  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
    return true;
  }
  
  submissionTracker.set(ip, [...recentSubmissions, now]);
  return false;
}

async function sendEmailWithResend(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.log("⚠️  Resend API key not configured. Skipping email notification.");
    return { success: true, emailSent: false };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@pocketuse.com",
        to: "hello@pocketuse.com",
        replyTo: email,
        subject: `New Contact Form: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #3b82ff; color: white; padding: 20px; border-radius: 8px; }
                .content { margin: 20px 0; }
                .field { margin: 15px 0; }
                .label { font-weight: bold; color: #3b82ff; }
                .value { margin-top: 5px; color: #666; }
                hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
                .footer { font-size: 12px; color: #999; margin-top: 30px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">From:</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Subject:</div>
                    <div class="value">${subject}</div>
                  </div>
                  <hr />
                  <div class="field">
                    <div class="label">Message:</div>
                    <div class="value">${message.replace(/\n/g, "<br />")}</div>
                  </div>
                  <div class="footer">
                    <p>This is an automated response. Please do not reply to this email.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Resend API error:", error);
      return { success: false, error: error.message || "Failed to send email" };
    }

    const data = await response.json();
    console.log("✅ Email sent successfully via Resend:", data.id);
    return { success: true, emailSent: true, emailId: data.id };
  } catch (error) {
    console.error("❌ Error calling Resend API:", error);
    return { success: false, error: "Email service temporarily unavailable" };
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body;
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || "unknown";

  // Rate limiting check
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Too many submissions. Please try again later.",
    });
  }

  // Validation
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Sanitize inputs (basic)
  const sanitizedName = name.trim().substring(0, 100);
  const sanitizedSubject = subject.trim().substring(0, 200);
  const sanitizedMessage = message.trim().substring(0, 5000);

  // Email validation
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    console.log("📧 Processing contact form submission from:", clientIp);

    // Send email if Resend is configured
    const emailResult = await sendEmailWithResend(
      sanitizedName,
      email,
      sanitizedSubject,
      sanitizedMessage
    );

    if (!emailResult.success && emailResult.error) {
      console.error("Email sending failed:", emailResult.error);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you soon.",
      emailSent: emailResult.emailSent,
    });
  } catch (error) {
    console.error("❌ Unexpected error in contact handler:", error);
    return res.status(500).json({
      error: "An unexpected error occurred. Please try again later.",
    });
  }
}
