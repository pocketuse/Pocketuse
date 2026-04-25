import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { Shield, Lock, Eye, FileText, Smartphone, Database } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Privacy Policy | Ritual App" 
        description="Privacy Policy for Ritual - Habit, Todo, and Mood Tracker. Learn how we protect your data with our local-first, privacy-centric approach." 
        url="https://pocketuse.com/privacy-policy" 
      />
      <Navbar />

      <section className="relative pt-[180px] pb-20 px-6 md:px-12 overflow-hidden grid-bg">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue/20 rounded-full blur-[120px] pointer-events-none opacity-40" />
        
        <div className="max-w-[800px] mx-auto relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/25 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-blue uppercase tracking-widest mb-7">
              <Shield size={14} />
              Legal & Privacy
            </div>
            <h1 className="text-[3rem] md:text-[4rem] font-display font-extrabold leading-[1.1] tracking-tight text-tint mb-8">
              Privacy <span className="grad-text">Policy</span>
            </h1>
            <p className="text-[1.1rem] text-text-secondary leading-relaxed font-light mb-12">
              Last Updated: April 8, 2026
            </p>
          </motion.div>

          <div className="space-y-12 text-text-secondary font-light leading-relaxed">
            <section>
              <p className="mb-4 text-lg text-tint font-medium">
                At Pocketuse, the creators of <strong>Ritual: Habits • Todo • Mood</strong>, we believe your personal growth is your private business. This Privacy Policy outlines our commitment to your privacy and explains how data is handled when you use the Ritual mobile application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Database size={18} />
                </div>
                1. Local Storage & Your Data
              </h2>
              <p className="mb-4">
                <strong>Total Privacy: Your data stays with you.</strong> Ritual is designed with a local-first architecture. All your personal data—including your habits, tasks, mood logs, reflection notes, and statistics—is stored locally on your device.
              </p>
              <p>
                We do not transmit, store, or process your personal journal entries, habits, or task data on our servers. You have complete ownership and control over your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue">
                  <Eye size={18} />
                </div>
                2. Information We Collect
              </h2>
              <p className="mb-4">
                Because Ritual operates locally, the information we collect is strictly limited to what is necessary for the app to function and improve:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Automatically Collected Data:</strong> We may collect anonymous, aggregated usage data and crash reports (e.g., device type, operating system version, and crash logs) to help us identify bugs and improve app stability. This data cannot be used to identify you personally.</li>
                <li><strong>Support Communications:</strong> If you contact us for support, we will collect your email address and any information you provide in your message solely to assist you.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center text-violet">
                  <Smartphone size={18} />
                </div>
                3. Third-Party Services
              </h2>
              <p className="mb-4">
                Ritual may use third-party services that collect information used to identify you, primarily for app distribution and analytics. These include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Apple App Store & Google Play Store:</strong> For app distribution, subscription management, and basic analytics provided by the platform.</li>
                <li><strong>Cloud Backups:</strong> If you have iCloud (iOS) or Google Drive (Android) device backups enabled, your local app data may be backed up to your personal cloud account according to your device settings. We do not have access to these backups.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Lock size={18} />
                </div>
                4. Data Security
              </h2>
              <p>
                Since your data is stored locally on your device, the security of your data relies on the security of your device. We strongly recommend securing your smartphone with a passcode, biometric authentication (Face ID/Touch ID), and keeping your operating system up to date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue">
                  <Shield size={18} />
                </div>
                5. Children's Privacy
              </h2>
              <p>
                Our Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information (e.g., via a support email), we immediately delete this from our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center text-violet">
                  <FileText size={18} />
                </div>
                6. Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4">7. Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <strong>privacy@pocketuse.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
