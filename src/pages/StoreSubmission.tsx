import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  Store, 
  Apple, 
  Play, 
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Smartphone,
  Search,
  Globe,
  Image
} from "lucide-react";
import { Link } from "react-router-dom";

export default function StoreSubmission() {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="App Store & Google Play Store Submission | Pocketuse" 
        description="Professional app store submission services for iOS and Android. Let us handle the complex approval process, metadata optimization, and publishing to Apple App Store and Google Play." 
        url="https://pocketuse.com/store-submission" 
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-[180px] pb-20 px-6 md:px-12 overflow-hidden grid-bg">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue/35 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-[1160px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/25 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-blue uppercase tracking-widest mb-7">
              <Store size={14} />
              App Publishing Services
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-6">
              Launch Your App with <span className="grad-text">Zero Hassle</span>
            </h1>
            <p className="text-[1.15rem] text-text-secondary leading-relaxed max-w-[700px] mx-auto font-light mb-12">
              We navigate the complex guidelines of the Apple App Store and Google Play Store to get your app approved and published quickly. Say goodbye to rejections and technical headaches.
            </p>
            
            <div className="flex flex-wrap justify-center gap-5">
              <button 
                onClick={scrollToPricing}
                className="bg-invert text-bg font-display font-bold px-9 py-4.5 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
              >
                View Pricing
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORES SECTION */}
      <section className="py-25 px-6 md:px-12 bg-surface relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">Supported Platforms</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">We provide end-to-end publishing services for both major app stores.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {/* Apple App Store */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 bg-surface2 border border-tint/7 rounded-[2rem] hover:border-blue/30 transition-all text-center flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-tint/5 flex items-center justify-center mb-6 text-white border border-tint/10 group-hover:bg-blue/10 group-hover:text-blue transition-colors">
                <Apple size={40} />
              </div>
              <h3 className="text-2xl font-bold text-tint mb-4">Apple App Store</h3>
              <p className="text-text-secondary leading-relaxed font-light mb-8">
                Strict guidelines mean iOS apps are frequently rejected. We ensure your app meets all Apple Review Guidelines, handle certificates, provisioning profiles, and App Store Connect setup.
              </p>
              <ul className="text-left space-y-3 w-full max-w-[280px]">
                <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" /><span className="text-sm text-text-primary">Developer Account Setup</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" /><span className="text-sm text-text-primary">TestFlight Beta Testing</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" /><span className="text-sm text-text-primary">Review Resolution</span></li>
              </ul>
            </motion.div>

            {/* Google Play Store */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-10 bg-surface2 border border-tint/7 rounded-[2rem] hover:border-emerald-500/30 transition-all text-center flex flex-col items-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-tint/5 flex items-center justify-center mb-6 text-emerald-500 border border-tint/10 group-hover:bg-emerald-500/10 transition-colors">
                <Play size={40} className="ml-1" />
              </div>
              <h3 className="text-2xl font-bold text-tint mb-4">Google Play Store</h3>
              <p className="text-text-secondary leading-relaxed font-light mb-8">
                The Play Console can be overwhelming. We handle the 20-tester requirement (for new accounts), content ratings, privacy policy requirements, and seamless rollout.
              </p>
              <ul className="text-left space-y-3 w-full max-w-[280px]">
                <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /><span className="text-sm text-text-primary">Closed Testing (20 Testers)</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /><span className="text-sm text-text-primary">Keystore Management</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" /><span className="text-sm text-text-primary">Content Rating & Privacy</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-25 px-6 md:px-12 bg-bg relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">What's Included in Publishing?</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">We don't just upload a file; we optimize your store presence for success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Search className="text-blue" />}
              title="Metadata Optimization (ASO)"
              description="We optimize your app title, short description, and keywords to help your app rank higher in store search results."
            />
            <ServiceCard 
              icon={<Image className="text-violet" />}
              title="Engaging Screenshot Design"
              description="We design and craft the best-looking, highly engaging app store screenshots to maximize your conversion rates and downloads."
            />
            <ServiceCard 
              icon={<ShieldCheck className="text-emerald-500" />}
              title="Compliance & Privacy"
              description="We help draft required Privacy Policy pages, fill out Data Safety forms, and ensure compliance with COPPA and GDPR."
            />
            <ServiceCard 
              icon={<Zap className="text-orange-500" />}
              title="Fast Issue Resolution"
              description="If your app is rejected, we analyze the rejection reason, make necessary adjustments, and immediately resubmit."
            />
            <ServiceCard 
              icon={<Globe className="text-blue" />}
              title="Global Distribution"
              description="Configure pricing, taxes, and country availability to ensure your app reaches the right global audience."
            />
            <ServiceCard 
              icon={<Store className="text-violet" />}
              title="Account Setup Assistance"
              description="Need help setting up your Apple Developer or Google Play Developer accounts? We guide you through the process."
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-25 px-6 md:px-12 bg-surface relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">Publishing Pricing</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">Transparent pricing for getting your app live.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
            <PricingCard 
              title="Google Play"
              price="$150"
              description="Complete Play Store submission."
              features={[
                "Play Console Setup",
                "App Bundle (AAB) Generation & Upload",
                "Data Safety Form Completion",
                "Custom Engaging Screenshots & Icon Upload",
                "20-Tester closed testing execution (if needed)",
                "Review handling"
              ]}
              icon={<Play size={24} className="text-emerald-500" />}
            />
            
            <PricingCard 
              title="Apple App Store"
              price="$200"
              popular
              description="Complete iOS App Store submission."
              features={[
                "App Store Connect Setup",
                "Certificates & Provisioning profiles",
                "IPA Generation & Upload via Transporter",
                "Custom Engaging Screenshots & Metadata",
                "App Privacy Form",
                "Rejection resolution (up to 2 rounds)"
              ]}
              icon={<Apple size={24} className="text-blue" />}
            />
            
            <PricingCard 
              title="Both Stores"
              price="$300"
              description="Publish to iOS and Android simultaneously."
              features={[
                "Everything in Google Play package",
                "Everything in Apple App Store package",
                "Unified metadata strategy",
                "Synchronized launch timing",
                "Premium support via Slack/WhatsApp",
                "Save $50"
              ]}
              icon={<Store size={24} className="text-violet" />}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue/10 to-violet/10" />
        <div className="max-w-[800px] mx-auto text-center relative z-2">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-tint mb-6">Ready to Go Live?</h2>
          <p className="text-text-secondary mb-10 text-lg">Stop stressing about store guidelines. Let our experts handle your submission today.</p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-linear-to-br from-blue to-violet text-white font-display font-bold px-8 py-4 rounded-xl hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(59,130,255,0.35)] transition-all cursor-pointer"
          >
            Start Publishing
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-surface2 border border-tint/7 rounded-2xl hover:border-tint/20 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-tint/5 flex items-center justify-center mb-6 border border-tint/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-tint mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function PricingCard({ title, price, description, features, popular, icon }: { title: string, price: string, description: string, features: string[], popular?: boolean, icon: React.ReactNode }) {
  return (
    <div className={`relative flex flex-col p-8 rounded-3xl border transition-all ${popular ? 'bg-linear-to-b from-[#13132A] to-[#0D0D1A] border-blue shadow-[0_0_40px_rgba(59,130,255,0.15)] scale-105 z-10' : 'bg-surface2 border-tint/10 hover:border-tint/20'}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-blue to-violet text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-tint">{title}</h3>
      </div>
      
      <div className="mb-2">
        <span className="text-4xl font-display font-extrabold text-tint">{price}</span>
      </div>
      <p className="text-text-secondary text-sm mb-8 font-light min-h-[40px]">{description}</p>
      
      <div className="flex-1">
        <ul className="space-y-4 mb-8">
          {features.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" />
              <span className="text-text-primary text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Link 
        to="/contact"
        className={`w-full py-3.5 rounded-xl text-center font-bold transition-all ${popular ? 'bg-invert text-bg hover:scale-[1.02]' : 'bg-tint/5 text-tint hover:bg-tint/10 border border-tint/10'}`}
      >
        Select Plan
      </Link>
    </div>
  );
}
