import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  ArrowUpRight, 
  ShoppingBag, 
  X, 
  CheckCircle2, 
  Smartphone,
  Layout,
  ExternalLink,
  ChevronRight,
  Zap,
  Star,
  Filter,
  Search as SearchIcon,
  Leaf,
  Sparkles,
  Activity,
  MessageSquare,
  Moon,
  Truck
} from "lucide-react";

interface AppTemplate {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  longDescription: string;
  image: string;
  previewUrl: string;
  purchaseUrl: string;
  features: string[];
  techStack: string[];
  screenshots: string[];
  accentColor: string; // Tailwind color class or hex
  icon: React.ReactNode;
}

const APPS: AppTemplate[] = [
  {
    id: "ritual",
    title: "Ritual",
    category: "Productivity / Lifestyle",
    price: "$59",
    description: "A beautifully crafted personal growth companion for habits, tasks, and mood tracking.",
    longDescription: "Ritual is more than just a habit tracker—it's a beautifully crafted personal growth companion designed to help you harmonize your daily routines, tasks, and emotional well-being. Built with an elegant, nature-inspired aesthetic, Ritual transforms self-improvement from a chore into a rewarding daily practice.",
    image: "https://picsum.photos/seed/ritual_app/1200/800",
    previewUrl: "/ritual", // This is an internal page we already have
    purchaseUrl: "https://codecanyon.net/item/ritual-habit-tracker-flutter-app/12345678",
    features: [
      "Intelligent Habit Tracking with flexible scheduling",
      "Integrated To-Do lists for daily tasks",
      "Daily Mood Journaling with sentiment analytics",
      "Visual Streaks and detailed progress charts",
      "Dark Mode & Custom Themes",
      "Cloud Sync via Firebase"
    ],
    techStack: ["Flutter", "Dart", "Firebase", "SQLite", "Riverpod"],
    screenshots: [
      "https://picsum.photos/seed/rit1/600/1200",
      "https://picsum.photos/seed/rit2/600/1200",
      "https://picsum.photos/seed/rit3/600/1200"
    ],
    accentColor: "#3B82F6", // blue-500
    icon: <Leaf size={24} />
  },
  {
    id: "glow-commerce",
    title: "Glow Commerce",
    category: "E-commerce / Shopping",
    price: "$49",
    description: "Premium UI kit for high-end fashion and lifestyle shopping experiences.",
    longDescription: "Glow Commerce is a high-performance, pixel-perfect e-commerce template designed for premium brands. It features a complete shopping flow from product discovery to checkout, optimized for mobile conversion and visual storytelling.",
    image: "https://picsum.photos/seed/glow_shop/1200/800",
    previewUrl: "https://preview.pocketuse.com/glow",
    purchaseUrl: "https://codecanyon.net/item/glow-ecommerce-flutter-app/12345679",
    features: [
      "Elegant Product Catalogs and Category Views",
      "Dynamic Product Details with Variations",
      "Wishlist & Advanced Cart Management",
      "Multiple Payment Gateway Integration (Stripe, PayPal)",
      "Order Tracking & History",
      "Admin Panel for Inventory Management"
    ],
    techStack: ["Flutter", "Laravel API", "MySQL", "Stripe SDK", "GetX"],
    screenshots: [
      "https://picsum.photos/seed/glow1/600/1200",
      "https://picsum.photos/seed/glow2/600/1200",
      "https://picsum.photos/seed/glow3/600/1200"
    ],
    accentColor: "#8B5CF6", // violet-500
    icon: <Sparkles size={24} />
  },
  {
    id: "pulse-fitness",
    title: "Pulse Fitness",
    category: "Health / Workout",
    price: "$69",
    description: "A comprehensive fitness tracking app with workout plans and AI coaching.",
    longDescription: "Pulse Fitness empowers users to reach their fitness goals with personalized workout plans, real-time exercise tracking, and AI-driven coaching insights. It's built for performance and data accuracy.",
    image: "https://picsum.photos/seed/fitness_app/1200/800",
    previewUrl: "https://preview.pocketuse.com/pulse",
    purchaseUrl: "https://codecanyon.net/item/pulse-fitness-tracker-app/12345680",
    features: [
      "Customizable Workout Plans (Strength, Cardio, Yoga)",
      "Real-time GPS tracking for outdoor runs",
      "Calorie & Macro Tracking with barcode scanner",
      "Social Challenges & Leaderboards",
      "Apple Health & Google Fit Sync",
      "AI Form Correction Assistant"
    ],
    techStack: ["Flutter", "TensorFlow Lite", "HealthKit / Google Fit", "Node.js", "MongoDB"],
    screenshots: [
      "https://picsum.photos/seed/pul1/600/1200",
      "https://picsum.photos/seed/pul2/600/1200",
      "https://picsum.photos/seed/pul3/600/1200"
    ],
    accentColor: "#F97316", // orange-500
    icon: <Activity size={24} />
  },
  {
    id: "nexus-chat",
    title: "Nexus Chat",
    category: "Communication / Social",
    price: "$55",
    description: "End-to-end encrypted messaging app with real-time video calls.",
    longDescription: "Nexus Chat is a secure, fast, and feature-rich messaging platform. It offers real-time one-to-one and group chats, high-quality audio/video calls, and complete privacy through E2EE.",
    image: "https://picsum.photos/seed/chat_app/1200/800",
    previewUrl: "https://preview.pocketuse.com/nexus",
    purchaseUrl: "https://codecanyon.net/item/nexus-chat-realtime-messaging/12345681",
    features: [
      "Real-time Instant Messaging (XMPP/WebSockets)",
      "Encrypted Audio & Video Calls (WebRTC)",
      "Group Chats & Public Channels",
      "Media Sharing (Images, Videos, Documents)",
      "Typing Indicators & Read Receipts",
      "Online/Offline Presence Management"
    ],
    techStack: ["Flutter", "Socket.io", "WebRTC", "Express", "Redis"],
    screenshots: [
      "https://picsum.photos/seed/nex1/600/1200",
      "https://picsum.photos/seed/nex2/600/1200",
      "https://picsum.photos/seed/nex3/600/1200"
    ],
    accentColor: "#10B981", // emerald-500
    icon: <MessageSquare size={24} />
  }
];

const COMING_SOON_APPS = [
  {
    id: "zen-meditate",
    title: "Zen Meditate",
    category: "Health & Wellness",
    description: "Immersive meditation and soundscape experience with biometric feedback.",
    image: "https://picsum.photos/seed/meditation/1200/800",
    accentColor: "#A78BFA",
    icon: <Moon size={24} />
  },
  {
    id: "swift-delivery",
    title: "Swift Delivery",
    category: "Logistics / Delivery",
    description: "Hyper-local delivery platform with real-time tracking and automated dispatch.",
    image: "https://picsum.photos/seed/delivery/1200/800",
    accentColor: "#F87171",
    icon: <Truck size={24} />
  }
];

export default function PremiumApps() {
  const [selectedApp, setSelectedApp] = useState<AppTemplate | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTech, setActiveTech] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("Default");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const categories = ["All", "Productivity", "E-commerce", "Health", "Communication"];
  const techStacks = ["All", "Flutter", "Firebase", "Laravel", "Stripe", "AI"];
  const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];

  const filteredApps = APPS
    .filter(app => {
      const categoryMatch = activeCategory === "All" || app.category.includes(activeCategory);
      const techMatch = activeTech === "All" || 
        (activeTech === "AI" ? app.techStack.some(t => t.toLowerCase().includes("ai") || t.toLowerCase().includes("tensorflow")) : 
         app.techStack.some(t => t.includes(activeTech) || t.includes(activeTech === "Laravel" ? "Laravel" : activeTech)));
      
      return categoryMatch && techMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "Price: Low to High") {
        return parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", ""));
      }
      if (sortOrder === "Price: High to Low") {
        return parseInt(b.price.replace("$", "")) - parseInt(a.price.replace("$", ""));
      }
      return 0; // Default
    });

  const openAppDetails = (app: AppTemplate) => {
    setSelectedApp(app);
    document.body.style.overflow = "hidden";
  };

  const closeAppDetails = () => {
    setSelectedApp(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="Premium App Templates | CodeCanyon Shop" 
        description="Browse our high-quality Flutter app templates available on CodeCanyon. Professional designs, clean code, and full backend integration." 
        url="https://pocketuse.com/premium-apps" 
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-[200px] pb-24 px-6 md:px-12 overflow-hidden grid-bg border-b border-tint/5">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/25 rounded-full px-4 py-1.5 text-[0.75rem] font-bold text-blue uppercase tracking-widest mb-8">
              <ShoppingBag size={14} />
              CodeCanyon Premium Templates
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-8">
              Premium <span className="grad-text">Digital Assets</span><br />
              for Developers.
            </h1>
            <p className="text-[1.2rem] text-text-secondary leading-relaxed max-w-[700px] mx-auto font-light">
              Accelerate your development with our production-ready Flutter app templates. Clean architecture, stunning UI, and seamless backend integration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERS & SORTING TOGGLE */}
      <section className="py-8 px-6 md:px-12 bg-bg border-b border-tint/5 sticky top-20 z-40 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border font-bold transition-all ${isFilterOpen ? 'bg-invert text-bg border-invert scale-105' : 'bg-tint/5 border-tint/10 text-tint hover:border-tint/20'}`}
              >
                <Filter size={18} />
                {isFilterOpen ? "Close Filters" : "Filters & Sorting"}
              </button>
              
              <div className="hidden sm:flex items-center gap-3 text-text-tertiary text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                Showing <b>{filteredApps.length}</b> result{filteredApps.length !== 1 ? 's' : ''}
              </div>
            </div>

            <div className="flex items-center gap-4">
              { (activeCategory !== "All" || activeTech !== "All" || sortOrder !== "Default") && (
                <button 
                  onClick={() => { setActiveCategory("All"); setActiveTech("All"); setSortOrder("Default"); }}
                  className="text-blue hover:text-blue/80 font-bold text-sm tracking-tight flex items-center gap-2 group transition-all"
                >
                  <span className="w-5 h-5 rounded-full bg-blue/10 flex items-center justify-center group-hover:bg-blue/20">
                    <X size={12} />
                  </span>
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-10 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-t border-tint/5 mt-8">
                  <div className="space-y-4">
                    <span className="text-[0.65rem] font-bold text-text-tertiary uppercase tracking-widest block">App Category</span>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeCategory === cat ? 'bg-blue border-blue text-white' : 'bg-tint/5 border-tint/10 text-text-secondary hover:bg-tint/10'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <span className="text-[0.65rem] font-bold text-text-tertiary uppercase tracking-widest block">Tech Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {techStacks.map(tech => (
                        <button
                          key={tech}
                          onClick={() => setActiveTech(tech)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeTech === tech ? 'bg-violet border-violet text-white' : 'bg-tint/5 border-tint/10 text-text-secondary hover:bg-tint/10'}`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[0.65rem] font-bold text-text-tertiary uppercase tracking-widest block">Sort Orders</span>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map(option => (
                        <button
                          key={option}
                          onClick={() => setSortOrder(option)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${sortOrder === option ? 'bg-invert text-bg border-invert' : 'bg-tint/5 border-tint/10 text-text-secondary hover:bg-tint/10'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* APPS GRID */}
      <section className="py-24 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-[1200px] mx-auto">
          <AnimatePresence mode="wait">
            {filteredApps.length > 0 ? (
              <motion.div 
                key={`${activeCategory}-${activeTech}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                {filteredApps.map((app) => (
                  <motion.div 
                    key={app.id} 
                    layout
                    className="group relative cursor-pointer bg-surface/50 p-6 rounded-[48px] border border-tint/7 transition-colors hover:bg-surface"
                    onClick={() => openAppDetails(app)}
                    whileHover="hover"
                    variants={{
                      hover: {
                        scale: 1.02,
                        borderColor: app.accentColor,
                      }
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      // @ts-ignore
                      "--accent-color": app.accentColor 
                    }}
                  >
                    <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-8 border border-tint/7">
                      <img 
                        src={app.image} 
                        alt={app.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                        <div className="bg-invert text-bg px-7 py-3 rounded-full font-bold flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          View Details & Preview <ChevronRight size={18} />
                        </div>
                      </div>
                      <div className="absolute top-6 right-6 backdrop-blur-md text-tint font-display font-bold px-4 py-2 rounded-2xl border border-tint/20" style={{ backgroundColor: `${app.accentColor}E6` }}>
                        {app.price}
                      </div>
                    </div>
                    <div className="px-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-xs uppercase tracking-widest" style={{ color: app.accentColor }}>{app.category}</span>
                      </div>
                      <motion.h3 
                        variants={{
                          hover: { 
                            color: app.accentColor,
                            scale: 1.05,
                            transition: { 
                              duration: 0.8,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }
                        }}
                        className="text-3xl font-display font-bold text-tint mb-3 transition-colors flex items-center gap-3"
                      >
                        <span className="p-2 rounded-xl bg-tint/5 border border-tint/10 group-hover:border-tint/20 transition-colors">
                          {app.icon}
                        </span>
                        {app.title}
                      </motion.h3>
                      <p className="text-text-secondary font-light leading-relaxed">{app.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <div className="w-20 h-20 bg-tint/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-tint/10 text-text-tertiary">
                  <SearchIcon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-tint mb-2">No templates found</h3>
                <p className="text-text-secondary mb-8">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => { setActiveCategory("All"); setActiveTech("All"); setSortOrder("Default"); }}
                  className="px-8 py-3 bg-invert text-bg font-bold rounded-full hover:scale-105 transition-all"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* COMING SOON SECTION */}
      <section className="py-24 px-6 md:px-12 bg-bg border-t border-tint/5 relative overflow-hidden">
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-violet/10 rounded-full blur-[120px] pointer-events-none opacity-30" />
        
        <div className="max-w-[1200px] mx-auto relative z-2">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-display font-black text-tint mb-4">
              Coming <span className="grad-text">Soon</span>
            </h2>
            <p className="text-text-secondary max-w-[600px]">
              We are constantly working on new, high-quality templates to help you build faster. Here's a sneak peek at what's in the pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {COMING_SOON_APPS.map((app) => (
              <motion.div 
                key={app.id}
                className="group relative bg-tint/[0.02] border border-tint/5 p-8 rounded-[48px] overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="relative aspect-video rounded-[32px] overflow-hidden mb-8 border border-tint/5 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-60">
                  <img 
                    src={app.image} 
                    alt={app.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-bg/80 backdrop-blur-md px-6 py-2 rounded-full border border-tint/10 text-tint font-bold text-sm tracking-widest uppercase">
                      Under Development
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: app.accentColor }}>{app.category}</span>
                    <div className="flex items-center gap-1 text-text-tertiary text-xs font-bold">
                      <Zap size={14} className="text-violet" /> Reveals Soon
                    </div>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-tint mb-4 flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-tint/5 border border-tint/10">
                      {app.icon}
                    </span>
                    {app.title}
                  </h3>
                  <p className="text-text-tertiary text-sm leading-relaxed mb-6">
                    {app.description} Full feature set, tech stack details, and live previews will be announced shortly. Stay tuned!
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-violet font-bold text-sm leading-none opacity-60">
                    Not yet available for purchase <Smartphone size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL / POPUP */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAppDetails}
              className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-[1100px] h-[90vh] bg-[#0E0E1C] border border-tint/10 rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            >
              <button 
                onClick={closeAppDetails}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-tint/5 border border-tint/10 flex items-center justify-center text-tint hover:bg-tint/10 transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>

              {/* LEFT SIDE: PREVIEW/MEDIA */}
              <div className="w-full md:w-[45%] h-[400px] md:h-full bg-bg border-r border-tint/5 flex flex-col">
                <div className="p-8 pb-0">
                  <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-3 py-1 text-[0.65rem] font-bold text-blue uppercase tracking-widest mb-4">
                    App Preview
                  </div>
                  <h2 className="text-3xl font-display font-extrabold text-tint mb-6">Interactive Demo</h2>
                </div>
                
                <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
                  <div className="space-y-6">
                    <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-tint/10">
                      <img src={selectedApp.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-linear-to-t from-bg/60 to-transparent" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {selectedApp.screenshots.map((shot, idx) => (
                        <div key={idx} className="aspect-[9/16] rounded-2xl overflow-hidden border border-tint/10">
                          <img src={shot} alt={`Screenshot ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: DETAILS */}
              <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
                <div className="p-10 pt-16 md:pt-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <div className="text-blue font-bold text-xs uppercase tracking-widest mb-2">{selectedApp.category}</div>
                      <h3 className="text-5xl font-display font-extrabold text-tint">{selectedApp.title}</h3>
                    </div>
                    <div className="bg-tint/5 border border-tint/10 rounded-3xl p-4 text-center">
                      <div className="text-[0.65rem] font-bold text-text-tertiary uppercase mb-1">Price</div>
                      <div className="text-2xl font-display font-black text-tint">{selectedApp.price}</div>
                    </div>
                  </div>

                  <p className="text-lg text-text-secondary leading-relaxed font-light mb-10">
                    {selectedApp.longDescription}
                  </p>

                  {/* TECH STACK */}
                  <div className="mb-10">
                    <h4 className="text-tint font-bold mb-4 flex items-center gap-2">
                       <Zap size={18} className="text-blue" /> Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApp.techStack.map(tech => (
                        <span key={tech} className="px-4 py-1.5 rounded-full bg-tint/5 border border-tint/10 text-xs font-medium text-text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* FEATURES */}
                  <div className="mb-12">
                    <h4 className="text-tint font-bold mb-6 flex items-center gap-2">
                      <Star size={18} className="text-blue" /> Key Features
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {selectedApp.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-blue shrink-0 mt-0.5" />
                          <span className="text-sm text-text-secondary leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-tint/5 sticky bottom-0 bg-[#0E0E1C] pb-4">
                    <a 
                      href={selectedApp.purchaseUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-invert text-bg font-display font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all text-lg"
                    >
                      Buy on CodeCanyon <ArrowUpRight size={22} />
                    </a>
                    <a 
                      href={selectedApp.previewUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-tint/5 border border-tint/10 text-tint font-display font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-tint/10 transition-all text-lg"
                    >
                      Live Preview <ExternalLink size={20} />
                    </a>
                  </div>

                  {/* NOTICE */}
                  <div className="mt-12 p-6 rounded-2xl bg-blue/5 border border-blue/10">
                    <div className="flex gap-4">
                      <ShieldCheck size={24} className="text-blue shrink-0" />
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Purchasing this template includes 6 months of support, regular updates, and complete source code. Need help setting it up? Check out our <span className="text-blue underline cursor-pointer">Template Setup Service</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}

function ShieldCheck({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
