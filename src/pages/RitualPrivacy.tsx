import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";

export default function RitualPrivacy() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden font-sans">
      <SEO 
        title="Privacy Policy - Ritual App" 
        description="Privacy Policy for the Ritual app. Learn how we handle your data with a privacy-first approach using local storage." 
        url="https://pocketuse.com/ritual/privacy" 
      />
      <Navbar />

      <section className="pt-[180px] pb-32 px-6 md:px-12 max-w-[900px] mx-auto">
        <div className="mb-12">
          <Link to="/ritual" className="text-[#8FB37B] hover:underline text-sm font-bold mb-6 inline-block">
            &larr; Back to Ritual
          </Link>
          <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-tint mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-text-secondary text-lg">Last updated: April 8, 2026</p>
        </div>

        <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-tint prose-p:text-text-secondary prose-p:font-light prose-a:text-[#8FB37B] prose-li:text-text-secondary prose-li:font-light">
          <p>
            Pocketuse ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your information is collected, used, and protected when you use the Ritual mobile application (the "App").
          </p>

          <h2>1. Data Collection and Local Storage</h2>
          <p>
            <strong>Your Data Stays With You.</strong> Ritual is designed with a privacy-first philosophy. All of your personal data, including habits, tasks, mood logs, and reflection notes, is stored <strong>locally on your device</strong>. We do not collect, transmit, or store your personal entries on our servers.
          </p>

          <h2>2. Information We Do Not Collect</h2>
          <p>
            Because Ritual relies on local storage for its core functionality, we do not require you to create an account, nor do we collect:
          </p>
          <ul>
            <li>Your name, email address, or contact information.</li>
            <li>The content of your habits, tasks, or mood logs.</li>
            <li>Your precise location data.</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>
            While your personal data remains on your device, the App may use third-party services that collect information used to identify you for basic app functionality and analytics:
          </p>
          <ul>
            <li><strong>Apple App Store / Google Play Store:</strong> These platforms may collect basic usage data and crash reports in accordance with their respective privacy policies.</li>
            <li><strong>Local Notifications:</strong> Ritual uses your device's native notification system to provide custom reminders. These are scheduled locally and do not rely on external servers.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We value your trust in providing us your information. Since your data is stored locally on your device, the security of your data is tied to the security of your device. We strongly recommend using device-level security features such as passcodes, Face ID, or Touch ID to protect your information.
          </p>

          <h2>5. Children's Privacy</h2>
          <p>
            These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to take necessary actions.
          </p>

          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <a href="mailto:privacy@pocketuse.com">privacy@pocketuse.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
