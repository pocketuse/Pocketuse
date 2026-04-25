import { ReactNode } from "react";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-tint/7 py-12 px-6 md:px-12">
      <div className="max-w-[1160px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Link to="/" className="text-[1.1rem] font-display font-extrabold tracking-tight text-tint">
            Pocket<span className="text-blue">use</span>
          </Link>
          <p className="text-[0.8rem] text-text-secondary">© 2026 Pocketuse.com · All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 list-none justify-center md:justify-start mt-2">
            <Link to="/privacy-policy" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Cookie Policy</Link>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 list-none">
            <Link to="/app-development" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Development</Link>
            <Link to="/app-marketing" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Marketing</Link>
            <Link to="/premium-apps" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Premium Apps</Link>
            <Link to="/showcase" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Showcase</Link>
            <Link to="/tools" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Tools</Link>
          </div>
          <div className="flex gap-3">
            <SocialBtn icon={<Twitter size={16} />} title="X / Twitter" />
            <SocialBtn icon={<Instagram size={16} />} title="Instagram" />
            <SocialBtn icon={<Linkedin size={16} />} title="LinkedIn" />
            <SocialBtn icon={<Github size={16} />} title="GitHub" />
          </div>
          <div className="flex gap-6">
            <Link to="/about" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">About</Link>
            <Link to="/ritual" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Ritual</Link>
            <Link to="/contact" className="text-[0.8rem] text-text-secondary hover:text-tint transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ icon, title }: { icon: ReactNode, title: string }) {
  return (
    <a href="#" title={title} className="w-9.5 h-9.5 rounded-xl bg-tint/5 border border-tint/7 flex items-center justify-center text-text-secondary hover:bg-blue/12 hover:border-blue/35 hover:text-blue transition-all">
      {icon}
    </a>
  );
}
