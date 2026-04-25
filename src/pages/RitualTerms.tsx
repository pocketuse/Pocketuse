import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { Link } from "react-router-dom";

export default function RitualTerms() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden font-sans">
      <SEO 
        title="Terms of Service - Ritual App" 
        description="Terms of Service for the Ritual app. Read the rules and guidelines for using our habit tracking application." 
        url="https://pocketuse.com/ritual/terms" 
      />
      <Navbar />

      <section className="pt-[180px] pb-32 px-6 md:px-12 max-w-[900px] mx-auto">
        <div className="mb-12">
          <Link to="/ritual" className="text-[#8FB37B] hover:underline text-sm font-bold mb-6 inline-block">
            &larr; Back to Ritual
          </Link>
          <h1 className="text-[3rem] md:text-[4rem] font-serif font-bold text-tint mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-text-secondary text-lg">Last updated: April 8, 2026</p>
        </div>

        <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-tint prose-p:text-text-secondary prose-p:font-light prose-a:text-[#8FB37B] prose-li:text-text-secondary prose-li:font-light">
          <p>
            By downloading or using the Ritual app (the "App"), these terms will automatically apply to you. You should make sure therefore that you read them carefully before using the App.
          </p>

          <h2>1. Use of the App</h2>
          <p>
            Pocketuse grants you a personal, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial purposes, subject to these Terms of Service.
          </p>
          <p>You are not allowed to:</p>
          <ul>
            <li>Copy, or modify the App, any part of the App, or our trademarks in any way.</li>
            <li>Attempt to extract the source code of the App.</li>
            <li>Translate the App into other languages or make derivative versions.</li>
          </ul>

          <h2>2. User Content and Data</h2>
          <p>
            Ritual is designed to store your data (habits, tasks, moods) locally on your device. You are solely responsible for backing up your device to prevent data loss. Pocketuse is not responsible for any lost data resulting from device failure, app deletion, or other circumstances.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            The App itself, and all the trademarks, copyright, database rights, and other intellectual property rights related to it, belong to Pocketuse.
          </p>

          <h2>4. Updates and Availability</h2>
          <p>
            We are committed to ensuring that the App is as useful and efficient as possible. For that reason, we reserve the right to make changes to the App or to charge for its services, at any time and for any reason. We will never charge you for the App or its services without making it very clear to you exactly what you're paying for.
          </p>
          <p>
            The App is currently available on iOS and Android. The requirements for both systems (and for any additional systems we decide to extend the availability of the app to) may change, and you'll need to download the updates if you want to keep using the App.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The App is provided "as is" and "as available" without any warranties of any kind, either express or implied. Pocketuse does not warrant that the App will be uninterrupted or error-free.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Pocketuse be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the App.
          </p>

          <h2>7. Changes to These Terms</h2>
          <p>
            We may update our Terms of Service from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Terms of Service on this page.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Terms of Service, do not hesitate to contact us at <a href="mailto:legal@pocketuse.com">legal@pocketuse.com</a>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
