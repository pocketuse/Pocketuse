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
  Mail,
  Activity,
  Layers
} from "lucide-react";
import { 
  TaskItem, 
  StatItem, 
  ServiceCard
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

  const apps = [
    {
      name: "Showcase",
      category: "Agency / Portfolio",
      platform: "Web",
      status: "Live",
      summary: "A curated gallery of product experiences, design language, and launch-ready mobile concepts.",
      accent: "#4A8DFF",
      wallClass: "md:col-span-12 xl:col-span-6",
    },
    {
      name: "Ritual",
      category: "Lifestyle / Productivity",
      platform: "Android",
      status: "Live",
      summary: "Habit, task, and mood tracking in a calm all-in-one daily companion.",
      accent: "#7C9A6D",
      wallClass: "md:col-span-12 xl:col-span-6",
    },
  ];

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
        <div className="absolute bottom-[10%] right-[-80px] w-[380px] h-[380px] bg-violet/20 rounded-full blur-[120px] pointer-events-none opacity-20" />
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
              Our App<br /><span className="grad-text">Built & Shipped</span>
            </h2>
            <p className="text-[1rem] text-text-secondary leading-relaxed max-w-[520px] font-light">
              A snapshot of <span className="text-editorial">Ritual</span>, our habit, todo, and mood companion for daily mindful growth.
            </p>
          </motion.div>

          <div className="rounded-[30px] border border-tint/10 bg-surface/60 backdrop-blur-lg p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="text-[0.7rem] uppercase tracking-widest text-text-tertiary">Gallery Wall</div>
              <div className="h-[1px] w-14 bg-blue/35" />
              <div className="text-[0.7rem] uppercase tracking-widest text-text-tertiary">{apps.length} App Entries</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
              {apps.map((app, index) => (
                <motion.article
                  key={app.name}
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-[24px] border border-tint/10 bg-bg/70 p-5 md:p-6 min-h-[220px] ${app.wallClass}`}
                  style={{
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), 0 20px 45px -35px ${app.accent}`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-80 pointer-events-none"
                    style={{
                      background: `radial-gradient(120% 100% at 100% 0%, ${app.accent}33 0%, transparent 55%), radial-gradient(80% 120% at 0% 100%, ${app.accent}22 0%, transparent 58%)`,
                    }}
                  />
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_35%,transparent_55%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[16%] -translate-x-[16%] transition-all duration-700" />

                  <div className="relative z-2 h-full flex flex-col">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span
                        className="text-[0.62rem] uppercase tracking-widest px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: `${app.accent}66`,
                          color: app.accent,
                          backgroundColor: `${app.accent}1A`,
                        }}
                      >
                        {app.status}
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-widest text-text-tertiary">{String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <h3 className="text-[1.2rem] md:text-[1.35rem] font-display font-extrabold tracking-tight text-tint leading-[1.15] mb-2">
                      {app.name}
                    </h3>
                    <div className="text-[0.7rem] uppercase tracking-widest text-text-tertiary mb-4">{app.category}</div>

                    <p className="text-[0.92rem] text-text-secondary leading-relaxed font-light mb-6 max-w-[46ch]">
                      {app.summary}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-tint/10 pt-3.5">
                      <span className="text-[0.68rem] uppercase tracking-widest text-text-tertiary">{app.platform}</span>
                      <span className="text-[0.68rem] uppercase tracking-widest text-text-tertiary group-hover:text-tint transition-colors">
                        App Snapshot
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
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
