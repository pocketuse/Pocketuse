import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  Code, 
  Smartphone, 
  Server, 
  Flame, 
  Store, 
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function TemplateCustomization() {
  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="CodeCanyon App Setup & Reskin Services" 
        description="Professional setup, reskinning, and customization services for CodeCanyon Flutter apps. Laravel backend setup, Firebase integration, and App Store publishing." 
        url="https://pocketuse.com/template-setup" 
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
              <Code size={14} />
              CodeCanyon Services
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-6">
              Turn Your Template into a <span className="grad-text">Ready-to-Launch App</span>
            </h1>
            <p className="text-[1.15rem] text-text-secondary leading-relaxed max-w-[700px] mx-auto font-light mb-12">
              Bought a Flutter app template from CodeCanyon? We handle the complex technical setup, UI reskinning, Laravel backend configuration, and app store publishing so you can focus on your business.
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

      {/* CORE SERVICES */}
      <section className="py-25 px-6 md:px-12 bg-surface relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">Complete Setup Services</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">Everything you need to get your purchased template live and fully functional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
              icon={<Smartphone className="text-blue" />}
              title="App Reskinning"
              description="Complete UI transformation. We change logos, colors, fonts, and splash screens to match your unique brand identity."
            />
            <ServiceCard 
              icon={<Server className="text-violet" />}
              title="Laravel Admin Panel"
              description="Full backend installation on your server (VPS/Shared), database configuration, and seamless API connection to the app."
            />
            <ServiceCard 
              icon={<Flame className="text-orange-500" />}
              title="Firebase Integration"
              description="Setup for push notifications, OTP authentication, real-time database, and crash analytics."
            />
            <ServiceCard 
              icon={<Store className="text-emerald-500" />}
              title="Store Publishing"
              description="We handle the complex submission process for both the Apple App Store and Google Play Store."
            />
            <ServiceCard 
              icon={<Wrench className="text-blue" />}
              title="Bug Fixes & Updates"
              description="Templates often have outdated dependencies. We upgrade packages and fix compilation errors."
            />
            <ServiceCard 
              icon={<Zap className="text-violet" />}
              title="Custom Features"
              description="Need something extra? We can add custom payment gateways, new screens, or modify existing logic."
            />
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-25 px-6 md:px-12 bg-bg relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1160px] mx-auto relative z-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-6">Expertise in the Modern Mobile Stack</h2>
              <p className="text-text-secondary leading-relaxed mb-8 font-light">
                Most high-quality CodeCanyon templates use a specific technology stack. Our team specializes exactly in these technologies, ensuring a smooth, error-free setup process.
              </p>
              
              <div className="space-y-6">
                <TechItem 
                  title="Flutter (Dart)" 
                  description="Cross-platform mobile development. We handle SDK upgrades, null-safety migrations, and complex UI edits."
                />
                <TechItem 
                  title="Laravel (PHP)" 
                  description="Robust backend framework. We configure the server environment, run migrations, and secure the API endpoints."
                />
                <TechItem 
                  title="Firebase" 
                  description="Google's mobile platform. We configure the google-services.json, APNs certificates, and Cloud Messaging."
                />
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-surface border border-tint/10 p-8 flex flex-col justify-center items-center gap-8 shadow-2xl">
                <div className="flex gap-8">
                  <div className="w-24 h-24 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center shadow-[0_0_30px_rgba(97,218,251,0.1)]">
                    <Smartphone size={40} className="text-[#61DAFB]" />
                  </div>
                  <div className="w-24 h-24 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,45,32,0.1)]">
                    <Server size={40} className="text-[#FF2D20]" />
                  </div>
                </div>
                <div className="w-24 h-24 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,202,40,0.1)]">
                  <Flame size={40} className="text-[#FFCA28]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="py-25 px-6 md:px-12 bg-surface relative" id="pricing">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">Transparent Pricing</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">Choose the package that best fits your launch requirements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <PricingCard 
              name="Basic Setup"
              price="$299"
              description="Perfect for developers who just need help with the initial configuration."
              features={[
                "Flutter App Compilation",
                "Laravel Admin Panel Setup",
                "Database Configuration",
                "API Connection",
                "Basic App Name Change",
                "Delivery in 3-5 Days"
              ]}
            />

            {/* Pro Plan */}
            <PricingCard 
              name="Complete Reskin"
              price="$599"
              description="The most popular choice. A full brand transformation ready for the market."
              isPopular={true}
              features={[
                "Everything in Basic Setup",
                "Complete UI Reskin (Colors/Fonts)",
                "Logo & Splash Screen Update",
                "Firebase Integration (Push/Auth)",
                "Package Name / Bundle ID Change",
                "App Store & Play Store Publishing",
                "Delivery in 7-10 Days"
              ]}
            />

            {/* Custom Plan */}
            <PricingCard 
              name="Custom Build"
              price="Custom"
              description="For businesses that need extra features not included in the original template."
              features={[
                "Everything in Complete Reskin",
                "Custom Feature Development",
                "Third-party API Integrations",
                "Payment Gateway Setup",
                "Backend Logic Modifications",
                "Priority Support",
                "Timeline based on scope"
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden bg-bg">
        <div className="absolute inset-0 bg-linear-to-br from-blue/10 to-violet/10 pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative z-2">
          <h2 className="text-[3rem] md:text-[4rem] font-display font-extrabold tracking-tighter text-tint leading-[1] mb-8">
            Ready to Launch Your App?
          </h2>
          <p className="text-[1.15rem] text-text-secondary mb-10 font-light">
            Send us the link to your CodeCanyon template and your requirements. We'll get back to you with a detailed timeline.
          </p>
          <button className="bg-invert text-bg font-display font-bold px-10 py-4.5 rounded-full text-lg hover:scale-105 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
            Contact Us Now
          </button>
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
      className="p-8 bg-bg border border-tint/7 rounded-2xl hover:border-blue/30 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-tint/5 flex items-center justify-center mb-6 text-xl border border-tint/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-tint mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function TechItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 w-6 h-6 rounded-full bg-blue/20 flex items-center justify-center shrink-0">
        <CheckCircle2 size={14} className="text-blue" />
      </div>
      <div>
        <h4 className="text-tint font-bold mb-1">{title}</h4>
        <p className="text-text-secondary text-sm leading-relaxed font-light">{description}</p>
      </div>
    </div>
  );
}

function PricingCard({ name, price, description, features, isPopular = false }: { name: string, price: string, description: string, features: string[], isPopular?: boolean }) {
  return (
    <div className={`relative p-8 rounded-[2rem] border ${isPopular ? 'bg-linear-to-b from-blue/10 to-bg border-blue/30 shadow-[0_0_40px_rgba(59,130,255,0.15)]' : 'bg-bg border-tint/10'}`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-tint mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-display font-extrabold text-tint">{price}</span>
      </div>
      <p className="text-text-secondary text-sm mb-8 font-light min-h-[40px]">{description}</p>
      
      <ul className="space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-text-primary">
            <ShieldCheck size={18} className="text-blue shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-3.5 rounded-xl font-bold transition-all ${isPopular ? 'bg-blue text-white hover:bg-blue/90' : 'bg-tint/5 text-white hover:bg-tint/10 border border-tint/10'}`}>
        Get Started
      </button>
    </div>
  );
}
