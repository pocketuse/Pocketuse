import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import React, { useRef } from "react";
import { IPhoneFrame } from "../components/IPhoneFrame";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  Smartphone, 
  ArrowRight, 
  Plus, 
  Star, 
  Mail,
  Activity,
  Fingerprint,
  Layers
} from "lucide-react";
import { 
  TaskItem, 
  StatItem, 
  ServiceCard, 
  ProductTask, 
  FeatureItem, 
  StoreBadge 
} from "../components/Common";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const bgX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), { damping: 50, stiffness: 200 });
  const bgY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), { damping: 50, stiffness: 200 });

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Premium Mobile App Development Agency" 
        description="Pocketuse designs, builds, and launches world-class mobile apps. We engineer digital experiences that scale with data-driven marketing." 
        url="https://pocketuse.com/" 
      />
      <Navbar />
      
      {/* PERSPECTIVE FLOOR */}
      <div className="absolute top-0 left-0 w-full h-[1000px] perspective-grid pointer-events-none z-0" />

      {/* HERO */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center grid-bg pt-[120px] pb-20 px-6 md:px-12 overflow-hidden" 
        id="home"
      >
        {/* Interactive Background Glows */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-blue/30 rounded-full blur-[140px] pointer-events-none opacity-60 z-0" 
        />
        <motion.div 
          style={{ x: useTransform(bgX, (v) => -v), y: useTransform(bgY, (v) => -v) }}
          className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-violet/30 rounded-full blur-[140px] pointer-events-none opacity-50 z-0" 
        />

        <div className="max-w-[1160px] mx-auto w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 max-w-[580px] relative z-2"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-blue/10 border border-blue/25 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold text-blue uppercase tracking-widest mb-7"
            >
              <span className="w-1.5 h-1.5 bg-blue rounded-full animate-pulse" />
              Mobile-First Studio
            </motion.div>
            <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-display font-extrabold leading-[1.08] tracking-tight text-tint mb-6 italic-serif-accent">
              Bringing Your<br /><span className="grad-text">Mobile Vision</span><br />to Life
            </h1>
            <p className="text-[1.1rem] text-text-secondary leading-relaxed max-w-[460px] mb-10 font-light">
              We design, build, and launch <span className="text-editorial">world-class mobile apps</span> — and grow them with data-driven marketing. Your idea deserves more than just code.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <button 
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2 bg-linear-to-br from-blue to-violet text-white font-display font-semibold text-[0.9rem] px-6.5 py-3 rounded-xl hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(59,130,255,0.35)] active:scale-95 transition-all cursor-pointer"
              >
                <ArrowRight size={16} strokeWidth={2.5} />
                Start Your Project
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-transparent border border-tint/7 backdrop-blur-lg text-white font-display font-semibold text-[0.9rem] px-6.5 py-3 rounded-xl hover:border-blue/50 hover:bg-blue/6 hover:translate-y-[-2px] active:scale-95 transition-all cursor-pointer"
              >
                <Smartphone size={16} strokeWidth={2.5} />
                Explore Our Apps
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 flex justify-center relative z-2"
          >
            {/* FLOATING HUD LABELS */}
            <div className="absolute -top-4 -right-4 z-10 px-3 py-1 bg-bg border border-tint/10 rounded-lg text-[10px] font-mono text-text-tertiary flex items-center gap-2 shadow-xl backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
              SESSION_ACTIVE::ROOT
            </div>
            <div className="absolute -bottom-4 -left-4 z-10 px-3 py-1 bg-bg border border-tint/10 rounded-lg text-[10px] font-mono text-text-tertiary flex items-center gap-2 shadow-xl backdrop-blur-md">
              LATENCY: 8ms
              <Activity size={10} className="text-violet" />
            </div>

            <IPhoneFrame className="h-[650px] relative group overflow-hidden">
              {/* SCANLINE EFFECT */}
              <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-20" />
              
              <div className="w-full h-full bg-surface flex flex-col gap-2.5 p-4.5 pt-12.5 relative">
                {/* INNER GRAIN */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] contrast-150 brightness-110" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
                
                <div className="font-display text-[0.8rem] font-black text-tint mb-1 flex items-center justify-between">
                  PROJECT_QUEUE
                  <Layers size={12} className="text-blue" />
                </div>
                <div className="text-[0.55rem] font-mono text-text-tertiary mb-3 opacity-60">ACTIVE_SESSION: PX-201</div>

                <div className="space-y-2">
                  <TaskItem label="App Development" tag="ENG" tagColor="blue" done delay={0.1} />
                  <TaskItem label="Growth Marketing" tag="MKT" tagColor="violet" done delay={0.2} />
                  <TaskItem label="UI/UX Prototyping" tag="DSN" tagColor="blue" done delay={0.3} />
                  <TaskItem label="ASO Strategy" tag="SEO" tagColor="violet" done delay={0.4} />
                  <TaskItem label="Deployment" tag="SYS" tagColor="red" done delay={0.5} />
                </div>

                <div className="mt-auto flex justify-center">
                  <div className="w-10.5 h-10.5 rounded-full bg-linear-to-br from-blue to-violet flex items-center justify-center text-[1.4rem] text-white shadow-[0_4px_20px_rgba(59,130,255,0.35)]">
                    <Plus size={20} />
                  </div>
                </div>
              </div>
            </IPhoneFrame>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-surface border-y border-tint/7 py-15 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem number="50+" label="Apps Delivered" />
          <StatItem number="2M+" label="App Downloads" />
          <StatItem number="98%" label="Client Satisfaction" />
          <StatItem number="4.9★" label="Avg Store Rating" />
        </div>
      </div>

      {/* PHILOSOPHY SECTION */}
      <section className="py-32 px-6 md:px-12 bg-bg relative overflow-hidden border-b border-tint/5">
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 text-[10px] font-mono text-text-tertiary opacity-20 pointer-events-none hidden lg:block">
          <code>01 // DESIGN_SYSTEM::PROTOTYPE</code><br />
          <code>02 // GRID_ENGINE::INIT(60px)</code>
        </div>
        <div className="absolute bottom-20 right-10 text-[10px] font-mono text-text-tertiary opacity-20 pointer-events-none hidden lg:block text-right">
          <code>// RECURSIVE_OPTIMIZATION_ACTIVE</code><br />
          <code>STATUS: STABLE_RELEASE</code>
        </div>

        <div className="max-w-[900px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="hud-label justify-center mb-10">Mission Statement</div>
            <h2 className="text-[2.2rem] md:text-[3.5rem] font-serif font-black italic text-tint leading-[1.2] mb-12">
              "We believe great mobile experiences aren't just built — <span className="text-blue">they are engineered</span> with a soul."
            </h2>
            <div className="w-16 h-[1px] bg-blue/30 mx-auto mb-8" />
            <p className="text-text-secondary text-[1.1rem] font-light max-w-[600px] mx-auto">
              In a world of templates and automation, we prioritize the <span className="text-editorial">human element</span>. Every pixel is intentional, every line of code is performance-optimized, and every growth strategy is data-validated.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-surface py-25 px-6 md:px-12 relative">
        <div className="absolute top-1/2 right-[-80px] -translate-y-1/2 w-[380px] h-[380px] bg-violet/25 rounded-full blur-[120px] pointer-events-none opacity-25" />
        <div className="max-w-[1160px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-15"
          >
            <div className="hud-label mb-5">
              Service Ecosystem
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-4">
              Crafted for the<br /><span className="grad-text">Mobile Generation</span>
            </h2>
            <p className="text-[1rem] text-text-secondary leading-relaxed max-w-[520px] font-light">
              From the <span className="text-editorial">first wireframe</span> to app store launch, we cover every layer of the mobile stack — engineering and growth strategies that endure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard 
              icon="📱" 
              title="App Development" 
              description="We build scalable, performant, and pixel-perfect mobile apps for iOS and Android. Whether it's your MVP or a full enterprise-grade platform, we ship code that lasts."
              features={[
                "Native iOS & Android development",
                "Cross-platform React Native & Flutter",
                "UI/UX design & prototyping",
                "API integration & backend engineering",
                "Post-launch support & iteration"
              ]}
              color="blue"
              onClick={() => navigate("/app-development")}
            />
            <ServiceCard 
              icon="🚀" 
              title="App Marketing" 
              description="Building the app is step one. We drive real, sustainable growth through ASO, paid acquisition, and retention strategies that turn downloads into loyal users."
              features={[
                "App Store Optimization (ASO)",
                "Paid user acquisition campaigns",
                "Conversion rate optimization",
                "Retention & lifecycle marketing",
                "Analytics & performance reporting"
              ]}
              color="violet"
              onClick={() => navigate("/app-marketing")}
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-bg py-25 px-6 md:px-12 relative">
        <div className="absolute top-[20%] left-[-100px] w-[420px] h-[420px] bg-blue/20 rounded-full blur-[120px] pointer-events-none opacity-20" />
        <div className="max-w-[1160px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-15"
          >
            <div className="hud-label mb-5">
              Product Portfolio
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-4">
              Apps We've<br /><span className="grad-text">Built & Shipped</span>
            </h2>
            <p className="text-[1rem] text-text-secondary leading-relaxed max-w-[520px] font-light">
              Beyond client work, we build <span className="text-editorial">proprietary platforms</span>. Here's our flagship product, crafted with the same obsessive care we bring to every project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex justify-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-violet/35 rounded-full blur-[70px] pointer-events-none" />
              <IPhoneFrame className="h-[550px]">
                <div className="w-full h-full bg-surface p-4 pt-11 flex flex-col gap-3.5">
                  <div className="font-display text-[1rem] font-bold text-tint mb-0.5">Pocketuse To-Do</div>
                  <div className="text-[0.62rem] text-text-secondary mb-3.5">3 tasks remaining today</div>

                  <div className="bg-tint/5 border border-tint/7 rounded-xl p-3 mb-3.5">
                    <div className="flex justify-between text-[0.62rem] text-text-secondary mb-2">
                      <span>Daily Progress</span>
                      <span className="text-violet">65%</span>
                    </div>
                    <div className="h-1 bg-tint/8 rounded-sm overflow-hidden">
                      <div className="h-full w-[65%] bg-linear-to-r from-blue to-violet rounded-sm" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <ProductTask label="Morning workout" done delay={0.1} />
                    <ProductTask label="Read 20 pages" done delay={0.2} />
                    <ProductTask label="Plan weekly goals" done delay={0.3} />
                    <ProductTask label="Prepare presentation" delay={0.1} />
                    <ProductTask label="Call with client" delay={0.2} />
                    <ProductTask label="Ship app update" delay={0.3} />
                  </div>
                </div>
              </IPhoneFrame>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-1.5 bg-violet/12 border border-violet/30 rounded-full px-3 py-1 text-[0.72rem] font-semibold text-[#a78bfa] uppercase tracking-widest">
                <Star size={12} fill="currentColor" /> Flagship App
              </div>
              <h3 className="text-[2rem] font-display font-extrabold tracking-tight text-tint mb-2">Pocketuse To-Do List</h3>
              <p className="text-[0.95rem] text-text-secondary leading-relaxed font-light mb-8">
                A beautifully crafted productivity app designed to help you capture, organize, and accomplish everything that matters. Simple enough to start in seconds, powerful enough to run your day.
              </p>

              <ul className="space-y-3.5 mb-10">
                <FeatureItem icon="✅" text="Smart task organization with priority levels, tags, and due dates that adapt to how you work." />
                <FeatureItem icon="📊" text="Daily progress tracking with streaks and insights to keep your momentum going." />
                <FeatureItem icon="🔔" text="Intelligent reminders that surface the right task at the right time — without the noise." />
                <FeatureItem icon="☁️" text="Seamless sync across all your devices so your tasks are always where you are." />
              </ul>

              <div className="flex flex-wrap gap-3.5">
                <StoreBadge icon="🍎" platform="App Store" />
                <StoreBadge icon="▶" platform="Google Play" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-30 px-6 md:px-12 text-center relative overflow-hidden bg-bg" id="contact">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue/20 rounded-full blur-[120px] pointer-events-none opacity-20" />
        <div className="relative z-2 max-w-[480px] mx-auto">
          <div className="inline-flex items-center gap-2 text-[0.75rem] font-bold uppercase tracking-widest text-blue mb-4.5 justify-center">
            Let's Build
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-display font-extrabold tracking-tight text-tint mb-5">
            Ready to Launch<br /><span className="grad-text">Something Great?</span>
          </h2>
          <p className="text-[1rem] text-text-secondary leading-relaxed mb-11 font-light">
            Tell us about your idea. We'll handle the rest — design, development, launch, and growth.
          </p>
          <div className="flex flex-wrap gap-3.5 justify-center">
            <a href="mailto:hello@pocketuse.com" className="inline-flex items-center gap-2 bg-linear-to-br from-blue to-violet text-white font-display font-semibold text-[0.9rem] px-6.5 py-3 rounded-xl hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(59,130,255,0.35)] transition-all">
              <Mail size={16} strokeWidth={2.5} />
              Start Your Project
            </a>
            <a href="#products" className="inline-flex items-center gap-2 bg-transparent border border-tint/7 backdrop-blur-lg text-white font-display font-semibold text-[0.9rem] px-6.5 py-3 rounded-xl hover:border-blue/50 hover:bg-blue/6 hover:translate-y-[-2px] transition-all">
              Explore Our Apps
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
