import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { Cookie, Info, Settings, ShieldCheck } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Cookie Policy | Transparency & Privacy" 
        description="Read the Pocketuse cookie policy to understand how we use cookies and similar technologies to improve your experience on our website." 
        url="https://pocketuse.com/cookie-policy" 
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
              <Cookie size={14} />
              Tracking & Cookies
            </div>
            <h1 className="text-[3rem] md:text-[4rem] font-display font-extrabold leading-[1.1] tracking-tight text-tint mb-8">
              Cookie <span className="grad-text">Policy</span>
            </h1>
            <p className="text-[1.1rem] text-text-secondary leading-relaxed font-light mb-12">
              Last Updated: March 27, 2026
            </p>
          </motion.div>

          <div className="space-y-12 text-text-secondary font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue">
                  <Info size={18} />
                </div>
                What Are Cookies
              </h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center text-violet">
                  <Settings size={18} />
                </div>
                How We Use Cookies
              </h2>
              <p className="mb-4">
                We use cookies for several reasons:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off.</li>
                <li><strong>Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
                <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
                <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-tint mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue">
                  <ShieldCheck size={18} />
                </div>
                Managing Cookies
              </h2>
              <p>
                Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
