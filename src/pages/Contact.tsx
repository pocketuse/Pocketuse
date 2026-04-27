import React, { useState } from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send, 
  Globe,
  Twitter,
  Linkedin,
  Github
} from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSuccess(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Contact Us | Start Your Project" 
        description="Get in touch with Pocketuse to discuss your next mobile app project. We're ready to bring your vision to life." 
        url="https://pocketuse.com/contact" 
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-[180px] pb-20 px-6 md:px-12 overflow-hidden grid-bg">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-violet/25 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-[1160px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet/10 border border-violet/25 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-violet uppercase tracking-widest mb-7">
              <MessageSquare size={14} />
              Get In Touch
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-6">
              Let's Build Something <span className="grad-text">Great Together</span>
            </h1>
            <p className="text-[1.15rem] text-text-secondary leading-relaxed max-w-[700px] mx-auto font-light mb-12">
              Have an idea for a mobile app? Need help scaling your existing product? We're here to help you navigate the mobile landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="py-10 pb-25 px-6 md:px-12 bg-bg relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* CONTACT INFO */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-surface2 border border-tint/7 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-tint mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <ContactInfoItem 
                    icon={<Mail className="text-blue" />} 
                    title="Email Us" 
                    value="hello@pocketuse.com" 
                  />
                  <ContactInfoItem 
                    icon={<WhatsAppIcon className="text-[#25D366]" />} 
                    title="WhatsApp Me"
                    value="+923394631144"
                    href="https://wa.me/923394631144"
                  />
                  <ContactInfoItem 
                    icon={<MapPin className="text-blue" />} 
                    title="Our Office" 
                    value="Remote First · Global Presence" 
                  />
                </div>

                <div className="mt-12 pt-8 border-t border-tint/5">
                  <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    <SocialIcon icon={<Twitter size={20} />} />
                    <SocialIcon icon={<Linkedin size={20} />} />
                    <SocialIcon icon={<Github size={20} />} />
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-blue/10 to-violet/10 border border-tint/10 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe size={120} />
                </div>
                <h3 className="text-xl font-bold text-tint mb-2 relative z-2">Global Support</h3>
                <p className="text-text-secondary text-sm font-light relative z-2">
                  Our distributed team ensures we can support clients across all time zones.
                </p>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="lg:col-span-7">
              <div className="bg-surface2 border border-tint/7 rounded-3xl p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-secondary ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-tint/5 border border-tint/10 rounded-xl px-4 py-3.5 text-tint focus:outline-none focus:border-blue/50 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-text-secondary ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-tint/5 border border-tint/10 rounded-xl px-4 py-3.5 text-tint focus:outline-none focus:border-blue/50 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary ml-1">Subject</label>
                    <input 
                      type="text" 
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                      className="w-full bg-tint/5 border border-tint/10 rounded-xl px-4 py-3.5 text-tint focus:outline-none focus:border-blue/50 transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-secondary ml-1">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-tint/5 border border-tint/10 rounded-xl px-4 py-3.5 text-tint focus:outline-none focus:border-blue/50 transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-linear-to-br from-blue to-violet text-white font-display font-bold text-lg py-4 rounded-xl hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(59,130,255,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:translate-y-0"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-3 border-tint/30 border-t-white rounded-full animate-spin" />
                    ) : isSuccess ? (
                      "Message Sent!"
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                  {isSuccess && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-blue font-medium"
                    >
                      Thanks for reaching out! We'll get back to you shortly.
                    </motion.p>
                  )}
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center text-red-500 font-medium"
                    >
                      {error}
                    </motion.p>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactInfoItem({ icon, title, value, href }: { icon: React.ReactNode, title: string, value: string, href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-1">{title}</h3>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-tint font-medium text-lg hover:text-blue transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-tint font-medium text-lg">{value}</p>
        )}
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      width="24"
      height="24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.46 1.33 4.97L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.89-4.43 9.89-9.89a9.83 9.83 0 0 0-2.89-7.04zM12.05 20.1h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.53 3.69-8.22 8.23-8.22a8.17 8.17 0 0 1 5.82 2.41 8.17 8.17 0 0 1 2.4 5.82c0 4.53-3.69 8.21-8.21 8.21zm4.52-6.16c-.25-.12-1.47-.73-1.7-.82-.23-.08-.4-.12-.57.12-.17.25-.65.82-.8.99-.15.17-.3.19-.56.06-.25-.12-1.06-.39-2.02-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.3.37-.45.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.54.12.17 1.73 2.64 4.19 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.17.21-.58.21-1.07.15-1.17-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-12 h-12 rounded-xl bg-tint/5 border border-tint/10 flex items-center justify-center text-text-secondary hover:bg-blue/10 hover:border-blue/30 hover:text-blue transition-all">
      {icon}
    </a>
  );
}
