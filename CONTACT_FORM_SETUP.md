# Contact Form Setup Guide

Your contact form is now **fully functional** and ready to use! Here's what's been implemented:

## ✅ What's Working Now

- ✓ Form validation (all fields required)
- ✓ Email format validation
- ✓ API endpoint at `/api/contact`
- ✓ Rate limiting (5 submissions per hour per IP)
- ✓ Error handling & user feedback
- ✓ Loading states
- ✓ Success/error messages

## 🚀 Quick Start (No Email Setup Required)

The form works immediately without any setup:

```bash
npm run dev
# Visit http://localhost:3000/contact
# Fill out and submit the form
# You'll see a success message ✓
```

Form submissions are logged to your console, but **won't send emails** until you configure Resend.

---

## 📧 Enable Email Notifications (Optional)

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for free
3. Get your API key from the dashboard

### Step 2: Add API Key to Environment

**For Local Development:**
```bash
# Add to .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

**For Production (Vercel):**
1. Go to Vercel → Project Settings → Environment Variables
2. Add `RESEND_API_KEY` with your API key
3. Deploy

### Step 3: Verify Your Domain (Production)

For production, you need to verify your domain in Resend:

1. In Resend dashboard, go to "Domains"
2. Add your domain (e.g., `noreply@yourdomain.com`)
3. Follow the DNS verification steps
4. Update the email in `api/contact.ts` line 59:
   ```typescript
   from: "noreply@yourdomain.com",  // Use your verified domain
   ```

For development/testing, you can use:
```typescript
from: "onboarding@resend.dev",  // Resend's test domain
```

### Step 4: Install @vercel/node (if needed)

```bash
npm install @vercel/node
```

---

## 📝 Configuration

### Default Email Recipient
Update in `api/contact.ts` line 59:
```typescript
to: "hello@pocketuse.com",  // Change to your email
```

### Rate Limiting
Adjust in `api/contact.ts` line 7:
```typescript
const MAX_SUBMISSIONS_PER_HOUR = 5;  // Change as needed
```

### Message Size Limit
Adjust in `api/contact.ts` line 134:
```typescript
const sanitizedMessage = message.trim().substring(0, 5000);  // Max characters
```

---

## 🧪 Testing

### Test Locally (Without Emails)
```bash
npm run dev
# Open http://localhost:3000/contact
# Fill form and submit
# Check terminal for log: "📧 Processing contact form submission..."
```

### Test with Emails
1. Add `RESEND_API_KEY` to `.env.local`
2. Restart dev server
3. Submit form - check your email inbox
4. Look for email from `onboarding@resend.dev` (or your domain)

---

## 🔒 Security Features

✓ **CORS Protection** - Configured with proper headers
✓ **Rate Limiting** - Prevents spam (5 per hour per IP)
✓ **Input Validation** - All fields validated
✓ **Input Sanitization** - Trimmed, length-limited
✓ **Email Validation** - Regex validation
✓ **HTML Escaping** - Safe HTML rendering in emails

---

## 📊 Debugging

### Check if Emails are Being Sent
Look for these logs in your Vercel/server logs:
```
✅ Email sent successfully via Resend: re_xxxxx
```

### Common Issues

**"Resend API key not configured"**
- Add `RESEND_API_KEY` to `.env.local` (local) or Vercel settings (production)
- Restart your dev server

**"Failed to send email" / 403 Error**
- Check your API key is correct
- Visit [resend.com](https://resend.com) to verify your key

**"Invalid email" error from Resend**
- Make sure your domain is verified in Resend dashboard
- Use `onboarding@resend.dev` for testing

**Too many submissions error**
- Rate limiting activated (5/hour)
- Wait an hour or change `MAX_SUBMISSIONS_PER_HOUR`

---

## 📦 File Structure

```
api/
└── contact.ts          # Email handler API endpoint
src/
└── pages/
    └── Contact.tsx     # Updated form with real submissions
.env.example            # Updated with Resend key template
```

---

## 🎯 Next Steps

1. **Local Testing** → Test form works without emails first
2. **Optional: Add Resend** → Enable email notifications
3. **Production Deploy** → Push to Vercel with env vars set

That's it! Your contact form is production-ready. 🎉
