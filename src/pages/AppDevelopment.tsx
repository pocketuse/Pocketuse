import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { IPhoneFrame } from "../components/IPhoneFrame";
import { 
  Smartphone, 
  Zap, 
  Shield, 
  Cpu, 
  Layers, 
  Rocket,
  Code,
  Layout,
  Globe,
  Database,
  Infinity,
  Bell,
  BarChart3,
  Cloud,
  CreditCard,
  WifiOff,
  Users,
  Apple,
  Atom
} from "lucide-react";
import { ServiceCard } from "../components/Common";
import { BeforeAfterSlider } from "../components/BeforeAfterSlider";
import { SEO } from "../components/SEO";

export default function AppDevelopment() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Full-Stack App Development Services" 
        description="Native iOS, Android, and cross-platform app development. We engineer scalable digital experiences with enterprise-grade security and performance." 
        url="https://pocketuse.com/app-development" 
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-[180px] pb-20 px-6 md:px-12 overflow-hidden grid-bg">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue/35 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-[1160px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hud-label justify-center mb-8">
              Core Competencies
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-6">
              Full-Stack <span className="grad-text">App Development</span>
            </h1>
            <p className="text-[1.15rem] text-text-secondary leading-relaxed max-w-[700px] mx-auto font-light mb-12">
              We don't just build apps; we <span className="text-editorial text-blue">engineer digital experiences</span> that scale. From native performance to cross-platform efficiency, our development stack is built for the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-25 px-6 md:px-12 bg-surface relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Smartphone className="text-blue" />}
              title="Native iOS & Android"
              description="High-performance native apps built with Swift and Kotlin for the best possible user experience."
            />
            <FeatureCard 
              icon={<Layers className="text-violet" />}
              title="Cross-Platform"
              description="Efficient development using React Native and Flutter to reach both platforms with a single codebase."
            />
            <FeatureCard 
              icon={<Layout className="text-blue" />}
              title="UI/UX Prototyping"
              description="Interactive high-fidelity prototypes that let you feel the app before a single line of code is written."
            />
            <FeatureCard 
              icon={<Database className="text-violet" />}
              title="Backend Architecture"
              description="Scalable cloud infrastructure and robust APIs built to handle millions of requests."
            />
            <FeatureCard 
              icon={<Shield className="text-blue" />}
              title="Security First"
              description="Enterprise-grade security protocols, data encryption, and secure authentication flows."
            />
            <FeatureCard 
              icon={<Zap className="text-violet" />}
              title="Performance Tuning"
              description="Obsessive optimization for speed, battery life, and smooth 60fps animations."
            />
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="py-25 px-6 md:px-12 bg-bg relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="flex flex-col gap-25">
            <DetailSection 
              title="Native Development"
              subtitle="The Gold Standard"
              description="When performance and platform integration are non-negotiable, native is the way. We leverage the full power of iOS and Android APIs to create seamless, deeply integrated experiences."
              image={
                <IPhoneFrame className="h-[420px] w-[210px]">
                  <div className="w-full h-full bg-surface-dark flex flex-col items-center justify-center gap-10 p-4 pt-12">
                    <div className="flex flex-col items-center gap-3">
                      <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-18 h-18 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center p-3 shadow-[0_0_30px_rgba(59,130,255,0.2)]"
                      >
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg" 
                          alt="Android Logo" 
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <span className="text-[0.75rem] font-bold text-text-secondary uppercase tracking-[0.2em]">Android</span>
                    </div>
                    
                    <div className="w-12 h-[1px] bg-tint/10" />

                    <div className="flex flex-col items-center gap-3">
                      <motion.div 
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                        className="w-18 h-18 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center p-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                      >
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" 
                          alt="Apple Logo" 
                          className="w-full h-full object-contain invert brightness-200"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <span className="text-[0.75rem] font-bold text-text-secondary uppercase tracking-[0.2em]">iOS</span>
                    </div>
                  </div>
                </IPhoneFrame>
              }
              features={[
                "Swift & SwiftUI for modern iOS apps",
                "Kotlin & Jetpack Compose for Android",
                "Direct access to hardware features (Camera, NFC, Sensors)",
                "Optimal memory management and performance",
                "Platform-specific UI patterns and accessibility"
              ]}
              reversed={false}
            />

            <DetailSection 
              title="Cross-Platform Mastery"
              subtitle="Efficiency Meets Quality"
              description="Reach your audience faster without compromising on quality. Our cross-platform solutions provide near-native performance with the speed of a single development cycle."
              image={
                <IPhoneFrame className="h-[420px] w-[210px]">
                  <div className="w-full h-full bg-surface-dark flex flex-col items-center justify-center gap-10 p-4 pt-12">
                    <div className="flex flex-col items-center gap-3">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-18 h-18 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center text-[#61DAFB] shadow-[0_0_30px_rgba(97,218,251,0.2)]"
                      >
                        <Atom size={36} />
                      </motion.div>
                      <span className="text-[0.75rem] font-bold text-text-secondary uppercase tracking-[0.2em]">React Native</span>
                    </div>
                    
                    <div className="w-12 h-[1px] bg-tint/10" />

                    <div className="flex flex-col items-center gap-3">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-18 h-18 rounded-2xl bg-tint/5 border border-tint/10 flex items-center justify-center text-[#02569B] shadow-[0_0_30px_rgba(2,86,155,0.2)]"
                      >
                        <Zap size={36} fill="currentColor" />
                      </motion.div>
                      <span className="text-[0.75rem] font-bold text-text-secondary uppercase tracking-[0.2em]">Flutter</span>
                    </div>
                  </div>
                </IPhoneFrame>
              }
              features={[
                "React Native for web-like agility with native feel",
                "Flutter for stunning, custom-designed interfaces",
                "Shared business logic across platforms",
                "Faster time-to-market for MVPs",
                "Simplified maintenance and updates"
              ]}
              reversed={true}
            />

            <DetailSection 
              title="Backend & API"
              subtitle="The Engine Room"
              description="A great app needs a powerful engine. We build robust, secure, and scalable backends that power your mobile experience and grow with your user base."
              image="⚙️"
              features={[
                "Node.js & Go for high-concurrency backends",
                "PostgreSQL & MongoDB for flexible data storage",
                "RESTful & GraphQL API design",
                "Real-time features with WebSockets",
                "Cloud-native deployment (AWS, GCP, Azure)"
              ]}
              reversed={false}
            />
          </div>
        </div>
      </section>

      {/* UI/UX REDESIGN SLIDER */}
      <section className="py-25 px-6 md:px-12 bg-bg relative overflow-hidden border-y border-tint/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1160px] mx-auto relative z-2">
          <div className="text-center mb-16">
            <div className="hud-label justify-center mb-5">
              UI/UX Transformation
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">See the Difference</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">
              We don't just make apps look pretty; we design <span className="text-editorial">conversion-optimized interfaces</span>. Drag the slider to compare a typical wireframe with our polished final product.
            </p>
          </div>
          
          <BeforeAfterSlider 
            beforeImage="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2070&auto=format&fit=crop"
            afterImage="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=2070&auto=format&fit=crop"
            beforeLabel="Wireframe"
            afterLabel="Final Design"
          />
        </div>
      </section>

      {/* COMPREHENSIVE FEATURES */}
      <section className="py-25 px-6 md:px-12 bg-surface relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,255,0.05),transparent_70%)] pointer-events-none" />
        <div className="max-w-[1160px] mx-auto relative z-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">Comprehensive Features</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">We integrate the latest mobile technologies to ensure your app stands out in the crowded marketplace.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureItemSmall icon={<Bell size={20} />} title="Push Notifications" description="Keep users engaged with smart, timely alerts." />
            <FeatureItemSmall icon={<BarChart3 size={20} />} title="Advanced Analytics" description="Track user behavior and growth metrics." />
            <FeatureItemSmall icon={<Cloud size={20} />} title="Cloud Sync" description="Seamless data synchronization across devices." />
            <FeatureItemSmall icon={<CreditCard size={20} />} title="Payment Systems" description="Secure in-app purchases and subscriptions." />
            <FeatureItemSmall icon={<WifiOff size={20} />} title="Offline Support" description="Full functionality even without internet." />
            <FeatureItemSmall icon={<Users size={20} />} title="Social Integration" description="Easy login and sharing with social platforms." />
            <FeatureItemSmall icon={<Cpu size={20} />} title="AI Integration" description="Smart features powered by machine learning." />
            <FeatureItemSmall icon={<Infinity size={20} />} title="Scalable Infrastructure" description="Built to grow from 1 to 1M+ users." />
          </div>
        </div>
      </section>

      {/* DEVELOPMENT PROCESS */}
      <section className="py-25 px-6 md:px-12 bg-bg relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-4">Our Development Process</h2>
            <p className="text-text-secondary max-w-[600px] mx-auto font-light">A systematic approach to building high-quality mobile applications.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-tint/10 to-transparent z-0" />
            
            <ProcessStep number="01" title="Discovery" description="We dive deep into your vision, target audience, and business goals." />
            <ProcessStep number="02" title="Design" description="Crafting intuitive UI/UX that users will love to interact with." />
            <ProcessStep number="03" title="Build" description="Agile development with regular updates and transparent progress." />
            <ProcessStep number="04" title="Launch" description="Deployment, store optimization, and initial growth support." />
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-25 px-6 md:px-12 bg-surface text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[2.5rem] font-display font-extrabold tracking-tight text-tint mb-6">Our Tech Stack</h2>
          <p className="text-text-secondary mb-12">We use the best tools for the job, ensuring your app is built on a solid, modern foundation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["React Native", "Flutter", "Swift", "Kotlin", "Node.js", "TypeScript", "AWS", "Firebase", "PostgreSQL", "Docker", "GraphQL"].map((tech) => (
              <span key={tech} className="px-5 py-2.5 bg-tint/5 border border-tint/10 rounded-xl text-sm font-semibold text-tint">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-surface2 border border-tint/7 rounded-2xl hover:border-blue/30 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-tint/5 flex items-center justify-center mb-6 text-xl border border-tint/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-tint mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function FeatureItemSmall({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 bg-tint/3 border border-tint/5 rounded-2xl hover:bg-tint/5 transition-colors">
      <div className="text-blue mb-4">{icon}</div>
      <h4 className="text-tint font-bold mb-2 text-sm">{title}</h4>
      <p className="text-text-secondary text-xs leading-relaxed">{description}</p>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="relative z-2">
      <div className="w-24 h-24 rounded-full bg-surface border border-tint/10 flex items-center justify-center text-2xl font-display font-black text-blue mb-6 mx-auto lg:mx-0 shadow-[0_0_30px_rgba(59,130,255,0.1)]">
        {number}
      </div>
      <h4 className="text-xl font-bold text-tint mb-3 text-center lg:text-left">{title}</h4>
      <p className="text-text-secondary text-sm leading-relaxed font-light text-center lg:text-left">{description}</p>
    </div>
  );
}

function DetailSection({ title, subtitle, description, image, features, reversed }: { title: string, subtitle: string, description: string, image: React.ReactNode, features: string[], reversed: boolean }) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${reversed ? "lg:flex-row-reverse" : ""}`}>
      <div className="flex-1">
        <div className="text-blue font-bold uppercase tracking-widest text-xs mb-3">{subtitle}</div>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-6">{title}</h2>
        <p className="text-text-secondary leading-relaxed mb-8 font-light">{description}</p>
        <ul className="space-y-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-text-primary">
              <div className="w-5 h-5 rounded-full bg-blue/20 flex items-center justify-center text-blue">
                <Rocket size={12} />
              </div>
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex justify-center">
        {typeof image === 'string' ? (
          <div className="w-full max-w-[400px] aspect-square bg-linear-to-br from-blue/10 to-violet/10 rounded-[40px] border border-tint/10 flex items-center justify-center text-[8rem] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,255,0.1),transparent_70%)]" />
            {image}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue/20 rounded-full blur-[80px] pointer-events-none opacity-30" />
            {image}
          </div>
        )}
      </div>
    </div>
  );
}
