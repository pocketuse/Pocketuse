import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isMobileMenuOpen ? "h-screen" : "h-auto"}`}>
      {/* Top Bar */}
      <div className={`relative z-[110] flex items-center justify-between transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "py-3.5 px-6 md:px-12 bg-bg/80 backdrop-blur-3xl border-b border-tint/7" : "py-5 px-6 md:px-12 bg-transparent"}`}>
        <Link to="/" className="text-[1.35rem] font-display font-extrabold tracking-tight text-tint">
          Pocket<span className="text-blue">use</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-9 list-none items-center">
          <li 
            className="relative group"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-tint transition-colors cursor-pointer py-2">
              Services
              <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${isServicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}>
              <div className="bg-surface border border-tint/10 rounded-2xl p-2 w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Link 
                  to="/app-development" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tint/5 transition-colors text-sm font-medium text-text-secondary hover:text-tint"
                  onClick={() => setIsServicesOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue text-sm">📱</div>
                  <div className="flex flex-col">
                    <span>App Development</span>
                    <span className="text-[0.65rem] text-text-tertiary">Native & Cross-platform</span>
                  </div>
                </Link>
                <Link 
                  to="/app-marketing" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tint/5 transition-colors text-sm font-medium text-text-secondary hover:text-tint"
                  onClick={() => setIsServicesOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-violet/10 flex items-center justify-center text-violet text-sm">🚀</div>
                  <div className="flex flex-col">
                    <span>App Marketing</span>
                    <span className="text-[0.65rem] text-text-tertiary">Growth & ASO</span>
                  </div>
                </Link>
                <Link 
                  to="/template-setup" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tint/5 transition-colors text-sm font-medium text-text-secondary hover:text-tint"
                  onClick={() => setIsServicesOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 text-sm">🛠️</div>
                  <div className="flex flex-col">
                    <span>Template Setup</span>
                    <span className="text-[0.65rem] text-text-tertiary">CodeCanyon Reskin</span>
                  </div>
                </Link>
                <Link 
                  to="/store-submission" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tint/5 transition-colors text-sm font-medium text-text-secondary hover:text-tint"
                  onClick={() => setIsServicesOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-sm">🏪</div>
                  <div className="flex flex-col">
                    <span>Store Submission</span>
                    <span className="text-[0.65rem] text-text-tertiary">App Store & Play Store</span>
                  </div>
                </Link>
              </div>
            </div>
          </li>
          <li><Link to="/showcase" className="text-sm font-semibold text-text-secondary hover:text-tint transition-colors">Showcase</Link></li>
          <li 
            className="relative group"
            onMouseEnter={() => setIsAppsOpen(true)}
            onMouseLeave={() => setIsAppsOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-tint transition-colors cursor-pointer py-2">
              Our Apps
              <ChevronDown size={14} className={`transition-transform duration-300 ${isAppsOpen ? "rotate-180" : ""}`} />
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${isAppsOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}>
              <div className="bg-surface border border-tint/10 rounded-2xl p-2 w-[240px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <Link 
                  to="/ritual" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tint/5 transition-colors text-sm font-medium text-text-secondary hover:text-tint"
                  onClick={() => setIsAppsOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-sm">🌿</div>
                  <div className="flex flex-col">
                    <span>Ritual</span>
                    <span className="text-[0.65rem] text-text-tertiary">Mindful Growth Companion</span>
                  </div>
                </Link>
                <Link 
                  to="/premium-apps" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tint/5 transition-colors text-sm font-medium text-text-secondary hover:text-tint"
                  onClick={() => setIsAppsOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue text-sm">✨</div>
                  <div className="flex flex-col">
                    <span>Premium Templates</span>
                    <span className="text-[0.65rem] text-text-tertiary">View full catalog</span>
                  </div>
                </Link>
                <Link 
                  to="/#products" 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-tint/5 transition-colors text-sm font-medium text-text-secondary hover:text-tint"
                  onClick={() => setIsAppsOpen(false)}
                >
                  <div className="w-8 h-8 rounded-lg bg-tint/5 flex items-center justify-center text-tint text-sm">📁</div>
                  <div className="flex flex-col">
                    <span>Selected Works</span>
                    <span className="text-[0.65rem] text-text-tertiary">Portfolio highlights</span>
                  </div>
                </Link>
              </div>
            </div>
          </li>
          <li><Link to="/about" className="text-sm font-semibold text-text-secondary hover:text-tint transition-colors">About</Link></li>
          <li><Link to="/tools" className="text-sm font-semibold text-text-secondary hover:text-tint transition-colors">Tools</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-tint/10 text-text-secondary hover:text-tint transition-colors mr-2 cursor-pointer"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/contact" className="hidden sm:inline-flex items-center gap-2 bg-linear-to-br from-blue to-violet text-invert font-display font-semibold text-[0.9rem] px-6.5 py-3 rounded-xl hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(59,130,255,0.35)] transition-all">
            Get in Touch
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-tint p-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-bg z-[105] transition-all duration-500 md:hidden overflow-y-auto ${isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-10 pointer-events-none"}`}>
        <div className="flex flex-col min-h-full pt-32 pb-12 px-8">
          <div className="mb-10">
            <span className="text-[0.65rem] font-bold text-text-tertiary uppercase tracking-widest mb-6 block">Services</span>
            <div className="flex flex-col gap-6">
              <Link to="/app-development" className="flex items-center gap-4 text-xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue">📱</span>
                App Development
              </Link>
              <Link to="/app-marketing" className="flex items-center gap-4 text-xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="w-10 h-10 rounded-xl bg-violet/10 flex items-center justify-center text-violet">🚀</span>
                App Marketing
              </Link>
              <Link to="/template-setup" className="flex items-center gap-4 text-xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">🛠️</span>
                Template Setup
              </Link>
              <Link to="/store-submission" className="flex items-center gap-4 text-xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">🏪</span>
                Store Submission
              </Link>
            </div>
          </div>
          
          <div className="h-[1px] bg-tint/5 w-full mb-10" />
          
          <ul className="flex flex-col gap-8 list-none p-0 mb-12">
            <li><Link to="/showcase" className="text-2xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>Showcase</Link></li>
            <li>
              <div className="flex flex-col gap-6">
                <span className="text-[0.65rem] font-bold text-text-tertiary uppercase tracking-widest block">Our Apps</span>
                <Link to="/ritual" className="flex items-center gap-4 text-xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">🌿</span>
                  Ritual
                </Link>
                <Link to="/premium-apps" className="flex items-center gap-4 text-xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue">✨</span>
                  Premium Templates
                </Link>
                <Link to="/#products" className="flex items-center gap-4 text-xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="w-10 h-10 rounded-xl bg-tint/5 flex items-center justify-center text-tint">📁</span>
                  Selected Works
                </Link>
              </div>
            </li>
            <li><Link to="/about" className="text-2xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
            <li><Link to="/tools" className="text-2xl font-bold text-tint" onClick={() => setIsMobileMenuOpen(false)}>Tools</Link></li>
          </ul>

          <div className="mt-auto">
            <Link to="/contact" className="flex items-center justify-center gap-2 bg-linear-to-br from-blue to-violet text-white font-display font-semibold text-lg py-5 rounded-2xl w-full" onClick={() => setIsMobileMenuOpen(false)}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
