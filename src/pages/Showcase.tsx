import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  ArrowUpRight, 
  Zap, 
  Shield, 
  Smartphone, 
  Rocket, 
  Layers, 
  Cpu, 
  Globe,
  CheckCircle2,
  X,
  ExternalLink,
  Star,
  Activity,
  Search
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  stats: { label: string; value: string }[];
  accentColor: string;
}

const PROJECTS: CaseStudy[] = [
  {
    id: "ritual-case",
    title: "Ritual",
    category: "Productivity / iOS & Android",
    description: "Our flagship habit tracking app. Build better routines, track your progress, and achieve your goals.",
    image: "/ritual-logo.png",
    challenge: "Traditional habit trackers often feel like a chore, leading to high abandonment rates. The challenge was to create an experience that felt rewarding and aesthetically pleasing enough to become a habit itself.",
    solution: "We implemented a 'nature-inspired' glassmorphism design with slow-burn animations. The architecture uses a reactive state management system (Riverpod) for instant feedback and a local-first SQLite database with Firebase sync.",
    results: [
      "4.8/5 Star average rating on App Store",
      "500k+ Active monthly users",
      "Featured by Apple in New Apps We Love"
    ],
    techStack: ["Flutter", "Firebase", "Riverpod", "SQLite", "Node.js"],
    stats: [
      { label: "Retention", value: "65%" },
      { label: "Daily Sessions", value: "4.2" },
      { label: "Performance", value: "99.9%" }
    ],
    accentColor: "#3B82F6"
  }
];

export default function Showcase() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  const scrollToShowcase = () => {
    const element = document.getElementById("selected-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeProject = () => setSelectedProject(null);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Our Work & Case Studies" 
        description="Explore our portfolio of successful mobile applications. See how we've helped startups and enterprises achieve their digital goals." 
        url="https://pocketuse.com/showcase" 
      />
      <Navbar />

      {/* HERO SECTION - GICNOVA STYLE */}
      <section className="relative pt-[220px] pb-32 px-6 md:px-12 overflow-hidden">
        {/* Animated Background Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet/15 rounded-full blur-[140px] pointer-events-none animate-pulse delay-1000" />
        
        <div className="max-w-[1200px] mx-auto relative z-2 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-tint/5 border border-tint/10 rounded-full px-4 py-1.5 text-[0.75rem] font-bold text-text-secondary uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-blue animate-ping" />
              Next-Gen Mobile Agency
            </div>
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-display font-extrabold leading-[0.95] tracking-tighter text-tint mb-8">
              We Build <span className="grad-text">Digital</span><br />
              Masterpieces.
            </h1>
            <p className="text-[1.25rem] text-text-secondary leading-relaxed max-w-[650px] mx-auto font-light mb-12">
              Transforming complex ideas into seamless mobile experiences. We blend high-end design with cutting-edge engineering.
            </p>
            
            <div className="flex flex-wrap justify-center gap-5">
              <button 
                onClick={() => navigate("/contact")}
                className="bg-invert text-bg font-display font-bold px-9 py-4.5 rounded-full hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
              >
                Start a Project
                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToShowcase}
                className="bg-tint/5 border border-tint/10 text-tint font-display font-bold px-9 py-4.5 rounded-full hover:bg-tint/10 active:scale-95 transition-all cursor-pointer"
              >
                View Showcase
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENTO GRID SECTION */}
      <section className="py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-20">
            <h2 className="text-[3rem] font-display font-extrabold tracking-tight text-tint mb-4">Core Capabilities</h2>
            <p className="text-text-secondary text-lg max-w-[500px]">Specialized in every layer of the modern mobile stack.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* LARGE BENTO CARD */}
            <BentoCard 
              className="md:col-span-8 h-[400px]"
              icon={<Smartphone size={32} />}
              title="Native Performance"
              description="We build high-performance native apps for iOS and Android that feel buttery smooth and leverage the full power of the hardware."
              tag="Engineering"
              bg="bg-linear-to-br from-blue/20 to-transparent"
            />
            
            {/* SMALL BENTO CARD */}
            <BentoCard 
              className="md:col-span-4 h-[400px]"
              icon={<Layers size={32} />}
              title="UI/UX Mastery"
              description="Pixel-perfect interfaces designed for the modern user."
              tag="Design"
              bg="bg-linear-to-br from-violet/20 to-transparent"
            />

            {/* SMALL BENTO CARD */}
            <BentoCard 
              className="md:col-span-4 h-[400px]"
              icon={<Cpu size={32} />}
              title="AI Integration"
              description="Leveraging LLMs and machine learning to build smarter apps."
              tag="Innovation"
              bg="bg-linear-to-br from-emerald-500/10 to-transparent"
            />

            {/* LARGE BENTO CARD */}
            <BentoCard 
              className="md:col-span-8 h-[400px]"
              icon={<Globe size={32} />}
              title="Global Scale"
              description="Architecture designed to handle millions of users across the globe with zero downtime and low latency."
              tag="Cloud"
              bg="bg-linear-to-br from-orange-500/10 to-transparent"
            />
          </div>
        </div>
      </section>

      {/* PROCESS SECTION - VERTICAL STEPS */}
      <section className="py-32 px-6 md:px-12 bg-bg relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div className="sticky top-32">
                <h2 className="text-[3.5rem] font-display font-extrabold tracking-tight text-tint leading-[1.1] mb-8">
                  Our Proven<br />
                  <span className="grad-text">Process.</span>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed font-light mb-12">
                  We don't just build apps; we engineer success. Our systematic approach ensures every project is delivered on time and exceeds expectations.
                </p>
                <div className="flex items-center gap-4 text-tint font-bold text-xl">
                  <div className="w-12 h-12 rounded-full bg-blue/20 flex items-center justify-center text-blue">
                    <CheckCircle2 size={24} />
                  </div>
                  Trusted by 50+ Startups
                </div>
              </div>
            </div>

            <div className="space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-linear-to-b from-blue/50 via-violet/50 to-transparent" />
              
              <ProcessStep 
                number="01"
                title="Discovery & Strategy"
                description="We dive deep into your business goals, target audience, and market landscape to define a winning roadmap."
              />
              <ProcessStep 
                number="02"
                title="Design & Prototyping"
                description="Our designers create high-fidelity prototypes that allow you to feel the app before a single line of code is written."
              />
              <ProcessStep 
                number="03"
                title="Agile Development"
                description="We build in two-week sprints, providing you with regular updates and a transparent view of the progress."
              />
              <ProcessStep 
                number="04"
                title="Testing & QA"
                description="Rigorous testing across multiple devices and edge cases to ensure a bug-free launch."
              />
              <ProcessStep 
                number="05"
                title="Launch & Growth"
                description="We help you navigate the app stores and implement growth strategies to drive initial traction."
              />
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section id="selected-works" className="py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-[3rem] font-display font-extrabold tracking-tight text-tint mb-4">Selected Works</h2>
              <p className="text-text-secondary text-lg">A glimpse into the products we've brought to life.</p>
            </div>
            <button className="text-tint font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Projects <ArrowUpRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project) => (
              <ProjectCard 
                key={project.id}
                image={project.image}
                title={project.title}
                category={project.category}
                description={project.description}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProject}
              className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="case-study-modal relative w-full max-w-[1200px] h-[90vh] bg-surface border border-tint/10 rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-[0_35px_80px_rgba(0,0,0,0.2)]"
            >
              <button 
                onClick={closeProject}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-tint/5 border border-tint/10 flex items-center justify-center text-tint hover:bg-tint/10 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              {/* LEFT SIDE: PROJECT PREVIEW */}
              <div className="w-full md:w-[45%] h-[350px] md:h-full relative overflow-hidden bg-bg/50 border-r border-tint/5">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="case-study-preview-overlay absolute inset-0 bg-linear-to-t from-surface/95 via-transparent to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex gap-4">
                    {selectedProject.stats.map((stat, idx) => (
                      <div key={idx} className="flex-1 bg-tint/5 backdrop-blur-md border border-tint/10 rounded-2xl p-4">
                        <div className="text-[0.6rem] uppercase tracking-widest text-text-secondary mb-1 font-bold">{stat.label}</div>
                        <div className="text-xl font-display font-black text-tint">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: CASE STUDY CONTENT */}
              <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
                <div className="p-10 md:p-14">
                  <div className="mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-3 py-1 text-[0.65rem] font-bold text-blue uppercase tracking-widest mb-4">
                      Case Study
                    </div>
                    <h2 className="text-5xl md:text-6xl font-display font-extrabold text-tint mb-4">
                      {selectedProject.title}
                    </h2>
                    <p className="text-text-secondary text-lg font-light leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-12">
                    {/* CHALLENGE */}
                    <div>
                      <h4 className="text-tint font-bold mb-4 flex items-center gap-2 text-xl">
                        <Search size={20} className="text-blue" /> The Challenge
                      </h4>
                      <p className="text-text-secondary leading-relaxed font-light bg-tint/3 border border-tint/5 rounded-2xl p-6">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    {/* SOLUTION */}
                    <div>
                      <h4 className="text-tint font-bold mb-4 flex items-center gap-2 text-xl">
                        <Cpu size={20} className="text-violet" /> The Solution
                      </h4>
                      <p className="text-text-secondary leading-relaxed font-light bg-tint/3 border border-tint/5 rounded-2xl p-6">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* RESULTS */}
                    <div>
                      <h4 className="text-tint font-bold mb-6 flex items-center gap-2 text-xl">
                        <CheckCircle2 size={20} className="text-emerald-500" /> Results & Impact
                      </h4>
                      <div className="grid gap-4">
                        {selectedProject.results.map((result, idx) => (
                          <div key={idx} className="flex items-center gap-4 bg-tint/2 rounded-xl p-4 border border-tint/5">
                            <Star size={18} className="text-blue shrink-0" />
                            <span className="text-tint font-medium">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* TECH STACK */}
                    <div>
                      <h4 className="text-tint font-bold mb-4 flex items-center gap-2 text-xl">
                        <Layers size={20} className="text-blue" /> Core Tech
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map(tech => (
                          <span key={tech} className="px-5 py-2 rounded-full bg-blue/10 border border-blue/20 text-xs font-bold text-blue uppercase tracking-wider">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ACTION */}
                  <div className="mt-16 pt-10 border-t border-tint/10 flex justify-between items-center">
                    <p className="text-text-tertiary text-sm italic">Confidentiality: Project details generalized for public display.</p>
                    <button 
                      onClick={() => navigate("/contact")}
                      className="bg-invert text-bg font-display font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all flex items-center gap-2"
                    >
                      Build Similar App <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .case-study-modal {
          background: var(--color-surface);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.2);
        }
        .dark .case-study-modal {
          background: #0E0E1C;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8);
        }
        .dark .case-study-preview-overlay {
          background: linear-gradient(to top, #0E0E1C 0%, transparent 60%);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />

      {/* CTA SECTION */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue/10 to-violet/10 pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[3.5rem] md:text-[5rem] font-display font-extrabold tracking-tighter text-tint leading-[1] mb-10">
              Ready to build the<br />
              <span className="grad-text">Next Big Thing?</span>
            </h2>
            <p className="text-[1.25rem] text-text-secondary mb-12 max-w-[600px] mx-auto font-light">
              Let's turn your vision into a world-class mobile product. Our team is ready to start when you are.
            </p>
            <button 
              onClick={() => navigate("/contact")}
              className="bg-invert text-bg font-display font-bold px-12 py-5 rounded-full text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)] cursor-pointer"
            >
              Book a Strategy Call
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function BentoCard({ className, icon, title, description, tag, bg }: { className?: string, icon: React.ReactNode, title: string, description: string, tag: string, bg: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden bg-surface border border-tint/7 rounded-[32px] p-10 group transition-all ${className}`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${bg}`} />
      <div className="relative z-2 h-full flex flex-col">
        <div className="mb-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-tint/5 border border-tint/10 text-[0.65rem] font-bold text-text-secondary uppercase tracking-widest mb-6">
            {tag}
          </div>
          <div className="text-blue mb-6 group-hover:scale-110 transition-transform origin-left duration-500">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-tint mb-4">{title}</h3>
          <p className="text-text-secondary leading-relaxed font-light">{description}</p>
        </div>
        <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
          <span className="text-tint font-bold flex items-center gap-2 text-sm">
            Learn More <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative pl-16 group"
    >
      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-surface border border-tint/10 flex items-center justify-center font-display font-bold text-white z-2 group-hover:border-blue/50 group-hover:bg-blue/10 transition-all duration-500">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-tint mb-3 group-hover:text-blue transition-colors duration-500">{title}</h3>
      <p className="text-text-secondary leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function ProjectCard({ image, title, category, description, onClick }: { image: string, title: string, category: string, description: string, onClick: () => void, key?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden mb-8 border border-tint/7">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
          <div className="bg-invert text-bg px-6 py-3 rounded-full font-bold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Case Study <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="text-blue font-bold text-sm uppercase tracking-widest mb-2">{category}</div>
        <h3 className="text-3xl font-bold text-tint mb-3">{title}</h3>
        <p className="text-text-secondary font-light">{description}</p>
      </div>
    </motion.div>
  );
}
