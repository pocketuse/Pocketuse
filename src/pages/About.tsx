import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Globe, 
  Award,
  Rocket,
  Shield,
  Plus,
  Minus
} from "lucide-react";

export default function About() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="About the Founder | Solo Developer & Marketer" 
        description="Learn about the solo developer behind Pocketuse. With 3 years of app development and 6 years of marketing experience, I build world-class mobile products." 
        url="https://pocketuse.com/about" 
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-[180px] pb-20 px-6 md:px-12 overflow-hidden grid-bg">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue/25 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-[1160px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/25 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-blue uppercase tracking-widest mb-7">
              <Users size={14} />
              The Founder
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-6">
              Crafted by One, <br /> <span className="grad-text">Built for Millions</span>
            </h1>
            <p className="text-[1.15rem] text-text-secondary leading-relaxed max-w-[700px] mx-auto font-light mb-12">
              I am a solo developer and a dedicated, seasoned app developer and marketer, bridging the gap between technical engineering and strategic growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BACKGROUND SECTION */}
      <section className="py-25 px-6 md:px-12 bg-surface relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 md:order-1"
            >
              <div className="relative aspect-square max-w-[500px] mx-auto group">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-blue/20 rounded-[48px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-blue/30 rounded-tl-3xl pointer-events-none" />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-violet/30 rounded-br-3xl pointer-events-none" />
                
                {/* Image Container */}
                <div className="relative w-full h-full rounded-[40px] border border-tint/10 overflow-hidden bg-bg/50">
                  <img 
                    src="/founder.jpg" 
                    alt="Founder of Pocketuse"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image doesn't exist yet
                      e.currentTarget.src = "https://picsum.photos/seed/founder/800/800?grayscale=1";
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-bg via-transparent to-transparent opacity-40" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2"
            >
              <h2 className="text-[2.5rem] font-display font-extrabold tracking-tight text-tint mb-6">Founder's Expertise</h2>
              <p className="text-text-secondary text-lg leading-relaxed font-light mb-8">
                With a Bachelor's degree in Management and Marketing, I bring a business-first perspective to digital product creation. My work is defined by the intersection of 3 years of rigorous app development and 6 years of strategic marketing execution.
              </p>
              <div className="space-y-4">
                <MissionPoint icon={<Award className="text-blue" />} text="Google-certified professional credentials" />
                <MissionPoint icon={<Zap className="text-violet" />} text="3 years of full-stack app development" />
                <MissionPoint icon={<Target className="text-blue" />} text="6 years of performance-driven marketing" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE CREDENTIALS */}
      <section className="py-25 px-6 md:px-12 bg-bg relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[2.5rem] font-display font-extrabold tracking-tight text-tint mb-4">Core Credentials</h2>
            <p className="text-text-secondary">The professional foundation driving every successful launch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard 
              icon={<Rocket />} 
              title="3 Years App Dev" 
              description="Seasoned expertise in Flutter and modern mobile architectures."
              color="blue"
            />
            <ValueCard 
              icon={<Target />} 
              title="6 Years Marketing" 
              description="Strategic background in growth, acquisition, and market positioning."
              color="violet"
            />
            <ValueCard 
              icon={<Award />} 
              title="Google Certified" 
              description="Credentials that validate professional standards and technical proficiency."
              color="blue"
            />
            <ValueCard 
              icon={<Shield />} 
              title="Academic Degree" 
              description="Bachelor's degree in Management and Marketing for business-centric engineering."
              color="violet"
            />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-25 px-6 md:px-12 bg-surface text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[2.5rem] font-display font-extrabold tracking-tight text-tint mb-6">Solo Excellence</h2>
          <p className="text-text-secondary mb-12">
            As a solo developer, I offer a level of accountability and agility that large firms cannot match. Every line of code and every marketing campaign passes through a single point of unified vision.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-tint/5 border border-tint/10 mb-4 flex items-center justify-center text-2xl">⚡</div>
              <span className="text-tint font-bold">Agile Logic</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-tint/5 border border-tint/10 mb-4 flex items-center justify-center text-2xl">🎯</div>
              <span className="text-tint font-bold">Marketing-Led</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-tint/5 border border-tint/10 mb-4 flex items-center justify-center text-2xl">🎓</div>
              <span className="text-tint font-bold">Certified Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-25 px-6 md:px-12 bg-bg relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet/10 rounded-full blur-[140px] pointer-events-none opacity-30" />
        
        <div className="max-w-[800px] mx-auto relative z-2">
          <div className="text-center mb-15">
            <h2 className="text-[2.5rem] font-display font-extrabold tracking-tight text-tint mb-4">Frequently Asked Questions</h2>
            <p className="text-text-secondary">Common questions about working with Pocketuse.</p>
          </div>

          <div className="space-y-4">
            <FAQItem 
              question="What development services does Pocketuse specifically offer?"
              answer="We specialize in mobile-first app development primarily using Google's Flutter framework to deliver high-performance iOS and Android applications. Our services span from initial wireframing and UI/UX design to full-stack engineering and final deployment."
            />
            <FAQItem 
              question="How do you integrate marketing into the development process?"
              answer="Unlike traditional agencies, we treat marketing as a technical requirement. Every app is built with growth tracking, analytics, and ASO (App Store Optimization) fundamentals baked in. We don't just build an app; we build a scalable product."
            />
            <FAQItem 
              question="How is pricing determined for a new project?"
              answer="Pricing is scope-dependent. We typically offer fixed-fee quotes for clearly defined MVPs or projects with specific milestones. For ongoing development and growth marketing, we provide flexible retainer options suited to your budget and velocity needs."
            />
            <FAQItem 
              question="Why should I work with a solo developer instead of a large agency?"
              answer="Working with a solo founder like me means zero 'translation loss.' The person you discuss strategy with is the same person writing the code and managing the growth. You get faster agility, direct accountability, and a more personal, long-term partnership."
            />
            <FAQItem 
              question="What is the founder's technical and professional background?"
              answer="I have 3 years of deep mobile engineering experience and 6 years of performance marketing execution. I also hold a Bachelor's degree in Management and Marketing for high-level business strategy, and I am a Google-certified professional developer."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-surface2 border border-tint/7 rounded-2xl overflow-hidden transition-all hover:border-tint/20 group">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
      >
        <span className="font-bold text-tint pr-8">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border border-tint/10 flex items-center justify-center transition-all ${isOpen ? 'bg-blue border-blue text-white' : 'text-text-secondary group-hover:border-tint/30'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-text-secondary font-light leading-relaxed border-t border-tint/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MissionPoint({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-tint/5 flex items-center justify-center border border-tint/10">
        {icon}
      </div>
      <span className="text-tint font-medium">{text}</span>
    </div>
  );
}

function ValueCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: "blue" | "violet" }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-surface2 border border-tint/7 rounded-2xl hover:border-tint/20 transition-all"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-xl border ${color === "blue" ? "bg-blue/15 border-blue/30 text-blue" : "bg-violet/15 border-violet/30 text-violet"}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-tint mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}
