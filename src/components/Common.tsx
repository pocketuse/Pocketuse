import { motion } from "motion/react";
import { Check } from "lucide-react";

export function TaskItem({ label, tag, tagColor, done = false, delay = 0 }: { label: string, tag: string, tagColor: string, done?: boolean, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
      className="flex items-center gap-2.5 bg-tint/4 border border-tint/7 rounded-xl p-2.5 cursor-pointer transition-colors"
    >
      <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${done ? "bg-linear-to-br from-blue to-violet border-transparent" : "border-blue/40"}`}>
        {done && <Check size={10} strokeWidth={4} className="text-tint" />}
      </div>
      <span className={`text-[0.72rem] flex-1 ${done ? "text-text-secondary" : "text-tint"}`}>{label}</span>
      <span className={`text-[0.58rem] px-1.5 py-0.5 rounded-full font-semibold ${tagColor === "blue" ? "bg-blue/20 text-blue" : tagColor === "violet" ? "bg-violet/20 text-[#a78bfa]" : "bg-red-500/15 text-red-400"}`}>
        {tag}
      </span>
    </motion.div>
  );
}

export function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-5 border-r border-tint/7 last:border-r-0"
    >
      <span className="block font-display text-[2.5rem] font-extrabold tracking-tight grad-text">{number}</span>
      <span className="block text-[0.8rem] text-text-secondary tracking-widest mt-1">{label}</span>
    </motion.div>
  );
}

export function ServiceCard({ icon, title, description, features, color, onClick }: { icon: string, title: string, description: string, features: string[], color: "blue" | "violet", onClick?: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`bg-surface2 border border-tint/7 rounded-[20px] p-11 relative overflow-hidden group transition-all ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className={`absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${color === "blue" ? "bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,255,0.35),transparent_60%)]" : "bg-[radial-gradient(circle_at_100%_0%,rgba(139,92,246,0.35),transparent_60%)]"}`} />
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-7 relative z-2 border ${color === "blue" ? "bg-blue/15 border-blue/30" : "bg-violet/15 border-violet/30"}`}>
        {icon}
      </div>
      <h3 className="text-[1.4rem] font-bold text-tint tracking-tight mb-3.5 relative z-2">{title}</h3>
      <p className="text-text-secondary text-[0.925rem] leading-relaxed font-light mb-7 relative z-2">{description}</p>
      <ul className="flex flex-col gap-2.5 relative z-2 mb-8">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-[0.875rem] text-text-secondary">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${color === "blue" ? "bg-blue" : "bg-violet"}`} />
            {f}
          </li>
        ))}
      </ul>
      {onClick && (
        <div className="relative z-2">
          <button 
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all border ${
              color === "blue" 
                ? "bg-blue/10 border-blue/30 text-blue hover:bg-blue hover:text-white" 
                : "bg-violet/10 border-violet/30 text-violet hover:bg-violet hover:text-white"
            }`}
          >
            Learn More
            <span className="text-lg">→</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function ProductTask({ label, done = false, delay = 0 }: { label: string, done?: boolean, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 bg-tint/3 border border-tint/5 rounded-lg p-2.5"
    >
      <div className={`w-4 h-4 rounded-full flex-shrink-0 ${done ? "bg-linear-to-br from-blue to-violet" : "border-2 border-violet/40"}`} />
      <span className={`text-[0.67rem] ${done ? "text-text-secondary" : "text-tint"}`}>{label}</span>
    </motion.div>
  );
}

export function FeatureItem({ icon, text }: { icon: string, text: string }) {
  return (
    <li className="flex items-start gap-3 text-[0.9rem] text-text-secondary leading-relaxed">
      <div className="w-7 h-7 rounded-lg bg-violet/12 border border-violet/25 flex items-center justify-center text-[0.8rem] flex-shrink-0">
        {icon}
      </div>
      <span>{text}</span>
    </li>
  );
}

export function StoreBadge({ icon, platform }: { icon: string, platform: string }) {
  return (
    <a href="#" className="flex items-center gap-2.5 bg-tint/5 border border-tint/12 rounded-xl px-4.5 py-2.5 hover:bg-tint/9 hover:border-tint/22 hover:translate-y-[-2px] transition-all">
      <span className="text-[1.4rem]">{icon}</span>
      <div className="flex flex-col">
        <span className="text-[0.6rem] text-text-secondary">Download on the</span>
        <span className="font-display text-[0.88rem] font-bold text-tint">{platform}</span>
      </div>
    </a>
  );
}
