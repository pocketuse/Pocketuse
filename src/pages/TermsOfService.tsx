import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { Gavel, FileCheck, AlertCircle, Scale, HardDrive } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Terms of Service | Ritual App" 
        description="Terms of Service for Ritual. Read the rules, guidelines, and agreements for using our habit and mood tracking application." 
        url="https://pocketuse.com/terms-of-service" 
      />
      <Navbar />

      <section className="relative pt-[180px] pb-20 px-6 md:px-12 overflow-hidden grid-bg">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-violet/20 rounded-full blur-[120px] pointer-events-none opacity-40" />
        
        <div className="max-w-[800px] mx-auto relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 border border-violet/25 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-violet uppercase tracking-widest mb-7">
              <Gavel size={14} />
              Legal Agreement
            </div>
            <h1 className="text-[3rem] md:text-[4rem] font-display font-extrabold leading-[1.1] tracking-tight text-tint mb-8">
              Terms of <span className="grad-text">Service</span>
            </h1>
            <p className="text-[1.1rem] text-text-secondary leading-relaxed font-light mb-12">
              Last Updated: April 8, 2026
            </p>
          </motion.div>

          <div className="space-y-12 text-text-secondary font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center text-violet">
                  <FileCheck size={18} />
                </div>
                1. Acceptance of Terms
              </h2>
              <p>
                By downloading, accessing, or using the <strong>Ritual</strong> mobile application ("App") provided by Pocketuse ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our App. These terms comply with the guidelines set forth by the Apple App Store and Google Play Store.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue">
                  <Scale size={18} />
                </div>
                2. Use License
              </h2>
              <p className="mb-4">
                We grant you a personal, non-exclusive, non-transferable, revocable license to use Ritual for your personal, non-commercial purposes on devices that you own or control, subject to these Terms and the usage rules set forth in the respective App Store Terms of Service.
              </p>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Modify, reverse engineer, decompile, or disassemble the App.</li>
                <li>Rent, lease, lend, sell, redistribute, or sublicense the App.</li>
                <li>Use the App for any illegal or unauthorized purpose.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <HardDrive size={18} />
                </div>
                3. User Data and Device Backups
              </h2>
              <p>
                Ritual is designed to store your data (habits, tasks, moods) locally on your device to ensure maximum privacy. <strong>You are solely responsible for backing up your device.</strong> We are not responsible for any loss of data resulting from device failure, app deletion, or operating system updates. If you change devices without a proper system backup, your data will not transfer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <AlertCircle size={18} />
                </div>
                4. Medical Disclaimer
              </h2>
              <p>
                Ritual includes mood tracking and habit building features intended for personal growth and general wellness. <strong>Ritual is not a medical device or a substitute for professional medical advice, diagnosis, or treatment.</strong> Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical or mental health condition.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4">5. Intellectual Property</h2>
              <p>
                The App, including its original content, features, functionality, design (including the specific blend of Noto Serif and Plus Jakarta Sans typography), and codebase, are owned by Pocketuse and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, in no event shall Pocketuse, its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the App; (ii) any conduct or content of any third party on the App; or (iii) unauthorized access, use or alteration of your transmissions or content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4">7. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our App after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <strong>legal@pocketuse.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
