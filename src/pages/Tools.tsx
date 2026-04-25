import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  ArrowLeft,
  Search,
  Calculator,
  Compass,
  Zap,
  TrendingUp,
  Shield,
  Activity,
  ChevronRight,
  Star,
  Layers,
  Wrench,
  X,
  Copy,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Globe,
  DollarSign,
  Users,
  Target,
  Rocket,
  TrendingDown,
  ExternalLink,
  Mail,
  Cpu,
  BarChart3,
  MousePointer2,
  Layout,
  Clock,
  List,
  PieChart,
  ShieldCheck,
  RefreshCw,
  Gift,
  FileText,
  MessageSquare,
  Sparkles,
  Heart,
  Award,
  ChevronDown,
  Info,
  Calendar,
  Wallet,
  CreditCard,
  Map,
  Lock,
  Tag as TagIcon
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   THEME & HELPERS
   ────────────────────────────────────────────────────────────────────────── */

const T = {
  bg: "#06060F",
  bgCard: "#0E0E1C",
  bgSurface: "#16162D",
  border: "#1F1F3D",
  borderLight: "rgba(255, 255, 255, 0.08)",
  ink: "#E8E8F0",
  inkM: "#A0A0B8",
  muted: "#7B7B9A",
  mutedL: "#5A5A7A",
  pos: "#10B981",
  neg: "#EF4444",
  warn: "#F59E0B",
  blue: "#3B82F6",
  violet: "#8B5CF6",
  amber: "#F59E0B",
  forest: "#10B981",
  slate: "#64748B",
  rose: "#F43F5E",
  navy: "#1E293B",
  teal: "#14B8A6",
  gold: "#EAB308",
  plum: "#D946EF",
  sage: "#84CC16",
  terra: "#EA580C",
  brick: "#991B1B",
  moss: "#3F6212",
  sienna: "#A0522D"
};

const fc = (v: number) => {
  if (!isFinite(v) || isNaN(v)) return "$0";
  const abs = Math.abs(v), sign = v < 0 ? "−$" : "$";
  if (abs >= 1e9) return `${sign}${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toFixed(1)}K`;
  return `${sign}${abs.toFixed(2)}`;
};

const fn = (v: number) => {
  if (!isFinite(v) || isNaN(v)) return "0";
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return Math.round(v).toLocaleString();
};

const fp = (v: number) => `${(+v || 0).toFixed(1)}%`;

/* ──────────────────────────────────────────────────────────────────────────
   STATE PERSISTENCE
   ────────────────────────────────────────────────────────────────────────── */

const ToolStateContext = React.createContext<{ toolId: string } | null>(null);

function ToolStateProvider({ children, toolId }: { children: React.ReactNode, toolId: string }) {
  return (
    <ToolStateContext.Provider value={{ toolId }}>
      {children}
    </ToolStateContext.Provider>
  );
}

function usePersistentToolState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const context = React.useContext(ToolStateContext);
  const toolId = context?.toolId || "misc";
  const storageKey = `pocket_tool_${toolId}_${key}`;

  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        // Basic type validation: if default is object, parsed should be object
        if (typeof defaultValue === 'object' && defaultValue !== null && (typeof parsed !== 'object' || parsed === null)) {
          return defaultValue;
        }
        return parsed;
      } catch {
        return saved as any;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  return [state, setState];
}

/* ──────────────────────────────────────────────────────────────────────────
   HELPER UI COMPONENTS
   ────────────────────────────────────────────────────────────────────────── */

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.6rem] font-black text-mutedL uppercase tracking-[0.2em] mb-4 mt-8 pb-2 border-b border-tint/5 flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-blue/40" />
      {children}
    </div>
  );
}

function MiniChart({ data, accent = T.blue }: { data: { v: number }[], accent?: string }) {
  const max = Math.max(...data.map(d => d.v), 1);
  return (
    <div className="mt-6 bg-tint/3 rounded-2xl p-6 border border-tint/5">
      <div className="text-[0.6rem] font-bold text-muted uppercase tracking-widest mb-6">12-Month Projected Growth</div>
      <div className="flex items-end gap-1.5 h-20">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div 
              className="w-full rounded-t-sm transition-all duration-500 group-hover:brightness-125" 
              style={{ 
                height: `${Math.max(4, (d.v / max) * 100)}%`, 
                backgroundColor: i === data.length - 1 ? accent : `${accent}40` 
              }} 
            />
            { (i === 0 || i === 5 || i === 11) && (
              <span className="text-[0.5rem] font-mono text-mutedL uppercase">M{i+1}</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-tint/5 flex justify-between items-center">
        <span className="text-[0.65rem] text-muted font-medium">Year 1 End:</span>
        <span className="text-sm font-mono font-black" style={{ color: accent }}>{fc(data[11]?.v || 0)}</span>
      </div>
    </div>
  );
}

function AIInsightStatic({ calcId, results }: { calcId: string, results: Record<string, string> }) {
  return (
    <div className="mt-6 bg-blue/5 border border-blue/20 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-blue font-black text-[0.65rem] uppercase tracking-widest mb-4">
        <Sparkles size={14} /> AI Perspective
      </div>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
          <p className="text-xs text-inkM leading-relaxed">
            Based on {calcId} data, your primary lever is the efficiency of high-tier conversions.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
          <p className="text-xs text-inkM leading-relaxed">
            The {Object.keys(results)[0]} of {Object.values(results)[0]} suggests a strong path to profitability if scaling costs remain linear.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SHARED UI COMPONENTS
   ────────────────────────────────────────────────────────────────────────── */

function ToolSlider({ label, value, min, max, step = 1, fmt, onChange, accent = T.blue }: any) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(value.toString());

  useEffect(() => {
    if (!isEditing) setTempVal(value.toString());
  }, [value, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    let parsed = parseFloat(tempVal);
    if (!isNaN(parsed)) {
      parsed = Math.max(min, Math.min(max, parsed));
      onChange(parsed);
      setTempVal(parsed.toString());
    } else {
      setTempVal(value.toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleBlur();
  };

  return (
    <div className="mb-6 group">
      <div className="flex justify-between items-end mb-2">
        <label 
          className="text-[0.65rem] font-bold text-muted uppercase tracking-widest flex items-center gap-1 group-hover:text-tint transition-colors cursor-pointer select-none" 
          onClick={() => setIsEditing(true)}
        >
          {label}
        </label>
        <div 
          className={`relative flex items-center justify-end bg-bg border transition-all rounded-lg px-2.5 py-1 cursor-text min-w-[70px] ${isEditing ? 'border-blue/40 bg-blue/5' : 'border-tint/5 bg-tint/5 hover:border-tint/20'}`}
          style={{ color: accent }}
          onClick={() => setIsEditing(true)}
        >
          {isEditing ? (
            <input
              autoFocus
              type="number"
              step={step}
              value={tempVal}
              onChange={(e) => setTempVal(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-right font-mono text-sm w-full min-w-[60px] p-0 m-0 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none"
              style={{ color: accent }}
            />
          ) : (
            <span className="text-sm font-mono font-bold select-none">{fmt(value)}</span>
          )}
        </div>
      </div>
      <div className="relative h-1.5 bg-tint/5 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 h-full rounded-full transition-all duration-300" 
          style={{ width: `${pct}%`, backgroundColor: accent }} 
        />
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value} 
          onChange={e => onChange(+e.target.value)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>
  );
}

function ToolRow({ label, value, bold, pos, neg, color = T.ink }: any) {
  const col = pos ? T.pos : neg ? T.neg : color;
  return (
    <div className="flex justify-between items-center py-3 border-b border-tint/5">
      <span className="text-xs text-muted font-medium">{label}</span>
      <span className={`text-sm font-mono ${bold ? 'font-black text-base' : 'font-bold'}`} style={{ color: col }}>{value}</span>
    </div>
  );
}

function ToolPills({ options, value, onChange, accent = T.blue }: any) {
  return (
    <div className="flex flex-wrap bg-tint/5 rounded-xl p-1 gap-1 mb-6">
      {options.map(([v, l]: any) => (
        <button 
          key={v} 
          onClick={() => onChange(v)} 
          className={`flex-1 min-w-[80px] py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            value === v ? "bg-tint/10 text-tint" : "text-muted hover:text-tint"
          }`}
          style={value === v ? { color: accent, boxShadow: `0 0 15px ${accent}20` } : {}}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function ToolInput({ label, value, onChange, placeholder, type = "text", multiline, rows = 3, hint }: any) {
  return (
    <div className="mb-5">
      {label && <div className="text-[0.65rem] font-bold text-muted uppercase tracking-widest mb-2">{label}</div>}
      {hint && <div className="text-[0.65rem] text-mutedL italic mb-2">{hint}</div>}
      {multiline ? (
        <textarea 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          placeholder={placeholder} 
          rows={rows} 
          className="w-full bg-tint/5 border border-tint/10 rounded-xl px-4 py-3 text-sm text-tint focus:border-blue/50 focus:bg-tint/10 transition-all outline-none resize-none"
        />
      ) : (
        <input 
          type={type} 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          placeholder={placeholder} 
          className="w-full bg-tint/5 border border-tint/10 rounded-xl px-4 py-3 text-sm text-tint focus:border-blue/50 focus:bg-tint/10 transition-all outline-none"
        />
      )}
    </div>
  );
}

function ToolSelect({ label, value, onChange, options }: any) {
  return (
    <div className="mb-5">
      {label && <div className="text-[0.65rem] font-bold text-muted uppercase tracking-widest mb-2">{label}</div>}
      <div className="relative">
        <select 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          className="w-full bg-tint/5 border border-tint/10 rounded-xl px-4 py-3 text-sm text-tint appearance-none focus:border-blue/50 focus:bg-tint/10 transition-all outline-none"
        >
          {options.map(([v, l]: any) => <option key={v} value={v} className="bg-bgCard">{l}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
          <ChevronRight size={16} className="rotate-90" />
        </div>
      </div>
    </div>
  );
}

function ToolBenchmark({ label, value, median, unit = "", accent = T.blue }: any) {
  const good = value >= median;
  const pct = median > 0 ? Math.min(100, (value / (median * 2)) * 100) : 0;
  return (
    <div className="bg-tint/5 border border-tint/5 rounded-2xl p-5 mb-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[0.7rem] font-bold text-muted uppercase tracking-wider">{label}</span>
        <span className={`text-[0.65rem] font-black uppercase px-2 py-0.5 rounded-sm ${good ? 'bg-pos/20 text-pos' : 'bg-neg/20 text-neg'}`}>
          {good ? "↑ Above Median" : "↓ Below Median"}
        </span>
      </div>
      <div className="relative h-1 bg-tint/10 rounded-full">
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-muted/30 z-1" />
        <div 
          className="absolute h-full rounded-full transition-all duration-500" 
          style={{ width: `${pct}%`, backgroundColor: good ? T.pos : T.neg }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[0.6rem] text-mutedL">Low</span>
        <span className="text-[0.6rem] text-muted font-bold">Industry Average: {median}{unit}</span>
        <span className="text-[0.6rem] text-mutedL">High</span>
      </div>
    </div>
  );
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${
        copied ? "bg-pos/20 border-pos text-pos" : "bg-tint/5 border-tint/10 text-tint hover:bg-tint/10"
      }`}
    >
      <Copy size={14} />
      {copied ? "Copied!" : "Copy Results"}
    </button>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   REVENUE & FINANCE CALCULATORS (FROM SNIPPET 1)
   ────────────────────────────────────────────────────────────────────────── */

/* IAP Calc */
function IAPCalc({ accent = T.amber }: any) {
  const [mau, setMau] = usePersistentToolState("mau", 50000);
  const [conv, setConv] = usePersistentToolState("conv", 4);
  const [spend, setSpend] = usePersistentToolState("spend", 9.99);
  const [churn, setChurn] = usePersistentToolState("churn", 5);
  const [store, setStore] = usePersistentToolState("store", "both");
  const fee: any = { apple: 0.30, google: 0.15, both: 0.225 }[store];
  const payers = mau * (conv / 100), gross = payers * spend, net = gross * (1 - fee), ltv = spend / (churn / 100);
  const proj = Array.from({ length: 12 }, (_, i) => ({ v: net * Math.pow(1 + 0.05, i) }));
  
  return (
    <div>
      <ToolPills options={[["apple", "🍎 App Store"], ["google", "🤖 Play Store"], ["both", "⚡ Both"]]} value={store} onChange={setStore} accent={accent} />
      <ToolSlider label="Monthly Active Users" value={mau} min={1000} max={1000000} step={1000} fmt={fn} onChange={setMau} accent={accent} />
      <ToolSlider label="Payer Conversion" value={conv} min={0.1} max={20} step={0.1} fmt={fp} onChange={setConv} accent={accent} />
      <ToolSlider label="Avg Spend / Payer" value={spend} min={0.99} max={99.99} step={0.5} fmt={v => `$${v.toFixed(2)}`} onChange={setSpend} accent={accent} />
      <ToolSlider label="Monthly Churn" value={churn} min={0.5} max={30} step={0.5} fmt={fp} onChange={setChurn} accent={accent} />
      
      <SLabel>Financial Projections</SLabel>
      <ToolRow label="Estimated Paying Users" value={fn(payers)} />
      <ToolRow label="Gross Monthly Revenue" value={fc(gross)} />
      <ToolRow label={`Platform Fees (${(fee * 100).toFixed(1)}%)`} value={`−${fc(gross * fee)}`} neg />
      <ToolRow label="Net Monthly Profit" value={fc(net)} bold color={T.pos} />
      <ToolRow label="Annualized Net" value={fc(net * 12)} bold color={T.pos} />
      <ToolRow label="Average LTV per Payer" value={fc(ltv)} color={T.blue} />

      <SLabel>Performance Benchmarks</SLabel>
      <ToolBenchmark label="Conversion Rate" value={conv} median={3} unit="%" />
      <ToolBenchmark label="User Retention" value={100 - churn} median={85} unit="%" />

      <MiniChart data={proj} accent={accent} />
      <AIInsightStatic calcId="In-App Purchase" results={{"Net Monthly": fc(net)}} />
    </div>
  );
}

function ASOFeatureCard({ icon, title, desc, accent }: any) {
  return (
    <div className="flex gap-4 p-4 rounded-[20px] bg-tint/5 border border-tint/5 mb-3">
      <div className="shrink-0 mt-1" style={{color: accent}}>{icon}</div>
      <div>
        <div className="font-bold text-tint text-[13px] mb-1">{title}</div>
        <div className="text-[11px] text-muted leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

/* ASO Calc */
function ASOCalc({ accent = T.slate }: any) {
  const [platform, setPlatform] = usePersistentToolState("platform", "App Store");
  const [budget, setBudget] = usePersistentToolState("budget", 2000);
  const [searchVolume, setSearchVolume] = usePersistentToolState("searchVolume", 50000);
  const [currentRank, setCurrentRank] = usePersistentToolState("currentRank", 25);
  const [targetRank, setTargetRank] = usePersistentToolState("targetRank", 3);
  const [baseConv, setBaseConv] = usePersistentToolState("baseConv", 4.0);
  const [cvrLift, setCvrLift] = usePersistentToolState("cvrLift", 20);
  const [revenue, setRevenue] = usePersistentToolState("revenue", 2.50);

  const getCTR = (rank: number, plat: string) => {
    const iosCTR = [0.30, 0.15, 0.10, 0.07, 0.05, 0.03, 0.02, 0.015, 0.01, 0.01];
    const gpCTR = [0.25, 0.12, 0.08, 0.06, 0.04, 0.03, 0.02, 0.015, 0.01, 0.01];
    const base = plat === "App Store" ? iosCTR : gpCTR;
    if (rank <= 10 && rank >= 1) return base[rank - 1];
    if (rank <= 20) return 0.005;
    if (rank <= 50) return 0.002;
    return 0.0005; 
  };

  const baseCTR = getCTR(currentRank, platform);
  const newCTR = getCTR(targetRank, platform);
  
  const baseTaps = searchVolume * baseCTR;
  const newTaps = searchVolume * newCTR;
  
  const targetConv = baseConv * (1 + (cvrLift / 100));
  
  const baseInstalls = baseTaps * (baseConv / 100);
  const newInstalls = newTaps * (targetConv / 100);
  
  const additionalInstalls = newInstalls - baseInstalls;
  const additionalRev = additionalInstalls * revenue;
  
  const roi = budget > 0 ? ((additionalRev - budget) / budget) * 100 : 0;

  return (
    <div>
      <ToolPills options={["App Store", "Google Play"]} value={platform} onChange={setPlatform} accent={accent} />
      <ToolSlider label="ASO Total Investment / Budget" value={budget} min={0} max={20000} step={100} fmt={fc} onChange={setBudget} accent={accent} />
      <ToolSlider label="Keyword Search Volume (Monthly)" value={searchVolume} min={1000} max={500000} step={1000} fmt={fn} onChange={setSearchVolume} accent={accent} />
      <ToolSlider label="Current Keyword Rank" value={currentRank} min={1} max={100} step={1} fmt={v => `#${v}`} onChange={setCurrentRank} accent={accent} />
      <ToolSlider label="Target Keyword Rank" value={targetRank} min={1} max={100} step={1} fmt={v => `#${v}`} onChange={setTargetRank} accent={accent} />
      <ToolSlider label="Current Conversion Rate" value={baseConv} min={0.5} max={25} step={0.1} fmt={fp} onChange={setBaseConv} accent={accent} />
      <ToolSlider label="Conversion Rate Lift" value={cvrLift} min={0} max={100} step={1} fmt={v => `+${v}%`} onChange={setCvrLift} accent={accent} />
      <ToolSlider label="Est. Revenue per Install (ARPU)" value={revenue} min={0.1} max={20} step={0.1} fmt={fc} onChange={setRevenue} accent={accent} />
      
      <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
        <div className="bg-tint/5 rounded-2xl p-4">
          <div className="text-[10px] uppercase font-bold text-muted mb-2 tracking-wider">Base (Rank #{currentRank})</div>
          <div className="text-xl font-bold text-tint mb-3">{fn(Math.round(baseInstalls))} <span className="text-xs font-normal text-muted">Installs</span></div>
          <div className="flex justify-between items-center border-t border-tint/5 pt-2 mb-1">
            <span className="text-[10px] text-muted">Est. CTR</span>
            <span className="text-xs font-bold text-tint">{fp(baseCTR * 100)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted">Base CVR</span>
            <span className="text-xs font-bold text-tint">{fp(baseConv)}</span>
          </div>
        </div>
        <div className="bg-tint/5 border border-tint/10 rounded-2xl p-4 shadow-lg shadow-black/50">
          <div className="text-[10px] uppercase font-bold text-muted mb-2 tracking-wider">Target (Rank #{targetRank})</div>
          <div className="text-xl font-bold text-tint mb-3">{fn(Math.round(newInstalls))} <span className="text-xs font-normal text-muted">Installs</span></div>
          <div className="flex justify-between items-center border-t border-tint/5 pt-2 mb-1">
            <span className="text-[10px] text-muted">New CTR</span>
            <span className="text-xs font-bold text-tint">{fp(newCTR * 100)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted">Target CVR</span>
            <span className="text-xs font-bold" style={{color: accent}}>{fp(targetConv)}</span>
          </div>
        </div>
      </div>

      <SLabel>Projected Monthly Impact</SLabel>
      <ToolRow label="Additional Installs" value={`+${fn(Math.round(Math.max(0, additionalInstalls)))}`} color={T.pos} />
      <ToolRow label="Additional Revenue" value={`+${fc(Math.max(0, additionalRev))}`} color={T.pos} />
      <ToolRow label="Estimated ROI" value={`${roi.toFixed(0)}%`} bold pos={roi > 0} neg={roi < 0} />
      
      <div className="mt-12">
        <SLabel>ASO Best Practices & Checklist</SLabel>
        {platform === "App Store" ? (
          <div>
            <ASOFeatureCard accent={accent} icon={<CheckCircle2 size={16} />} title="Keyword Field Maximization" desc="Use all 100 characters in the iOS Keyword field, separated by commas, no spaces. Avoid repeating words used in your Title or Subtitle." />
            <ASOFeatureCard accent={accent} icon={<Search size={16} />} title="Title & Subtitle Weight" desc="The Title holds the heaviest keyword weight. Put your most crucial keywords here. Subtitle is the second most important." />
            <ASOFeatureCard accent={accent} icon={<Layers size={16} />} title="First 3 Screenshots" desc="Users rarely scroll past the first 3. Ensure your core value proposition and most compelling UI is visible immediately without scrolling." />
            <ASOFeatureCard accent={accent} icon={<MessageSquare size={16} />} title="In-App Ratings Prompt" desc="Trigger the native rating prompt only after a positive moment in the user journey (e.g. level complete, value delivered) to maximize 5-star ratings." />
          </div>
        ) : (
          <div>
            <ASOFeatureCard accent={accent} icon={<CheckCircle2 size={16} />} title="Density in Description" desc="Google Play crawls your long description. Aim for a 2-3% keyword density for your top 5 target keywords across the 4000 characters." />
            <ASOFeatureCard accent={accent} icon={<Search size={16} />} title="Title & Short Description" desc="Title (30 chars) and Short Description (80 chars) are the strongest ranking signals. Don't waste them on generic branding." />
            <ASOFeatureCard accent={accent} icon={<Layers size={16} />} title="Feature Graphic Tests" desc="The Feature Graphic is huge on Android. Run A/B tests natively in the Google Play Console to optimize your store conversion rate." />
            <ASOFeatureCard accent={accent} icon={<Activity size={16} />} title="Android User Vitals" desc="Google heavily penalizes apps with high crash rates. Keep crashes below the 1.09% bad behavior threshold to retain ranking visibility." />
          </div>
        )}
      </div>

      <AIInsightStatic calcId="ASO Tracker" results={{"ROI": `${roi.toFixed(0)}%`, "Total Lift Installs": fn(Math.round(Math.max(0, additionalInstalls)))}} />
    </div>
  );
}

/* Subscription Calc */
function SubCalc({ accent = T.forest }: any) {
  const [users, setUsers] = usePersistentToolState("users", 10000);
  const [monthly, setMonthly] = usePersistentToolState("monthly", 9.99);
  const [annual, setAnnual] = usePersistentToolState("annual", 79.99);
  const [annualShare, setAnnualShare] = usePersistentToolState("annualShare", 35);
  const [churn, setChurn] = usePersistentToolState("churn", 4);
  const mP = users * ((100 - annualShare) / 100), aP = users * (annualShare / 100);
  const mrr = mP * monthly + (aP * annual) / 12;
  const arr = mrr * 12;
  const ltv = (mrr / users) / (churn / 100);
  const discount = annual > 0 ? ((monthly * 12 - annual) / (monthly * 12) * 100) : 0;
  const proj = Array.from({ length: 12 }, (_, i) => ({ v: mrr * Math.pow(1.05, i) }));
  
  return (
    <div>
      <ToolSlider label="Total Active Subscribers" value={users} min={100} max={100000} step={100} fmt={fn} onChange={setUsers} accent={accent} />
      <ToolSlider label="Monthly Plan Price" value={monthly} min={1} max={200} step={0.5} fmt={v => `$${v.toFixed(2)}`} onChange={setMonthly} accent={accent} />
      <ToolSlider label="Annual Plan Price" value={annual} min={1} max={1000} step={1} fmt={v => `$${v.toFixed(2)}`} onChange={setAnnual} accent={accent} />
      <ToolSlider label="Annual Plan Adoption %" value={annualShare} min={0} max={90} step={1} fmt={fp} onChange={setAnnualShare} accent={accent} />
      <ToolSlider label="Monthly Churn Rate" value={churn} min={0.5} max={25} step={0.5} fmt={fp} onChange={setChurn} accent={accent} />
      
      <SLabel>Recurring Revenue</SLabel>
      <ToolRow label="Annual Discount Offered" value={`${discount.toFixed(0)}% off`} />
      <ToolRow label="Monthly Recurring Revenue" value={fc(mrr)} bold color={T.pos} />
      <ToolRow label="Annual Run Rate (ARR)" value={fc(arr)} bold color={T.pos} />
      <ToolRow label="Average Subscriber LTV" value={fc(ltv)} color={T.blue} />

      <SLabel>Projected Scale</SLabel>
      <ToolBenchmark label="Monthly Churn" value={20 - churn} median={16} unit="%" />
      <MiniChart data={proj} accent={accent} />
    </div>
  );
}

/* Viral Coefficient Calc */
function ViralCalc({ accent = T.teal }: any) {
  const [seed, setSeed] = usePersistentToolState("seed", 1000);
  const [inv, setInv] = usePersistentToolState("inv", 3);
  const [ci, setCi] = usePersistentToolState("ci", 20);
  const [cycle, setCycle] = usePersistentToolState("cycle", 7);
  const k = inv * (ci / 100);
  
  let u = seed;
  const monthly = [];
  const cycleCountPerMonth = 30 / cycle;
  for (let i = 0; i < 12; i++) {
    for (let c = 0; c < cycleCountPerMonth; c++) {
      u = u * (1 + k);
    }
    monthly.push({ v: Math.round(u) });
  }

  return (
    <div>
      <ToolSlider label="Initial Seed Users" value={seed} min={100} max={10000} step={100} fmt={fn} onChange={setSeed} accent={accent} />
      <ToolSlider label="Invites Sent per User" value={inv} min={0.5} max={10} step={0.1} fmt={v => v.toFixed(1)} onChange={setInv} accent={accent} />
      <ToolSlider label="Invite Acceptance %" value={ci} min={1} max={50} step={1} fmt={fp} onChange={setCi} accent={accent} />
      <ToolSlider label="Viral Cycle (Days)" value={cycle} min={1} max={30} step={1} fmt={v => `${v}d`} onChange={setCycle} accent={accent} />
      
      <SLabel>Growth Dynamics</SLabel>
      <ToolRow label="K-Factor" value={k.toFixed(2)} bold color={k >= 1 ? T.pos : T.warn} />
      <ToolRow label="Growth Status" value={k >= 1 ? "🚀 Viral" : k >= 0.15 ? "📈 Growing" : "📉 Stagnant"} />
      <ToolRow label="Proj. Users (12mo)" value={fn(monthly[11].v)} bold color={T.pos} />
      <MiniChart data={monthly} accent={accent} />
    </div>
  );
}

/* Ad Spend ROI Calc */
function AdSpendCalc({ accent = T.plum }: any) {
  const [spend, setSpend] = usePersistentToolState("spend", 10000);
  const [revenue, setRevenue] = usePersistentToolState("revenue", 40000);
  const [cust, setCust] = usePersistentToolState("cust", 500);
  const [ltv, setLtv] = usePersistentToolState("ltv", 120);
  const roas = spend > 0 ? revenue / spend : 0;
  const cac = cust > 0 ? spend / cust : 0;
  const ltvCac = cac > 0 ? ltv / cac : 0;

  return (
    <div>
      <ToolSlider label="Monthly Ad Spend" value={spend} min={500} max={100000} step={500} fmt={fc} onChange={setSpend} accent={accent} />
      <ToolSlider label="Revenue Generated" value={revenue} min={1000} max={500000} step={1000} fmt={fc} onChange={setRevenue} accent={accent} />
      <ToolSlider label="New Customers Acquired" value={cust} min={10} max={5000} step={10} fmt={fn} onChange={setCust} accent={accent} />
      <ToolSlider label="Customer Lifetime Value" value={ltv} min={10} max={1000} step={10} fmt={fc} onChange={setLtv} accent={accent} />
      
      <SLabel>Performance Metrics</SLabel>
      <ToolRow label="ROAS (Return on Ad Spend)" value={`${roas.toFixed(2)}x`} bold color={roas >= 3 ? T.pos : T.neg} />
      <ToolRow label="Customer Acquisition Cost" value={fc(cac)} neg />
      <ToolRow label="LTV : CAC Ratio" value={`${ltvCac.toFixed(1)}x`} bold color={ltvCac >= 3 ? T.pos : T.neg} />
      <ToolRow label="Net Marketing Profit" value={fc(revenue - spend)} pos={revenue > spend} neg={revenue < spend} />
    </div>
  );
}

/* Email Monetization Calc */
function EmailCalc({ accent = T.violet }: any) {
  const [list, setList] = usePersistentToolState("list", 25000);
  const [open, setOpen] = usePersistentToolState("open", 22);
  const [click, setClick] = usePersistentToolState("click", 3);
  const [conv, setConv] = usePersistentToolState("conv", 2);
  const [aov, setAov] = usePersistentToolState("aov", 59);
  const opens = list * (open / 100), clicks = opens * (click / 100), sales = clicks * (conv / 100);
  const rev = sales * aov;

  return (
    <div>
      <ToolSlider label="Total Email Subscribers" value={list} min={500} max={500000} step={500} fmt={fn} onChange={setList} accent={accent} />
      <ToolSlider label="Average Open Rate %" value={open} min={5} max={60} step={0.5} fmt={fp} onChange={setOpen} accent={accent} />
      <ToolSlider label="Click-to-Open Rate %" value={click} min={0.5} max={25} step={0.1} fmt={fp} onChange={setClick} accent={accent} />
      <ToolSlider label="Sales Conv. Rate %" value={conv} min={0.1} max={15} step={0.1} fmt={fp} onChange={setConv} accent={accent} />
      <ToolSlider label="Avg Order Value" value={aov} min={10} max={1000} step={5} fmt={fc} onChange={setAov} accent={accent} />
      
      <SLabel>Channel Performance</SLabel>
      <ToolRow label="Estimated Opens per Send" value={fn(opens)} />
      <ToolRow label="Estimated Clicks per Send" value={fn(clicks)} />
      <ToolRow label="Estimated Revenue per Send" value={fc(rev)} bold color={T.pos} />
      <ToolRow label="Value per Subscriber" value={`$${(rev / list).toFixed(2)}`} color={T.blue} />
    </div>
  );
}

/* Re-engagement vs New UA Calc */
function ReengagementCalc({ accent = T.sienna }: any) {
  const [lapsed, setLapsed] = usePersistentToolState("lapsed", 50000);
  const [reCost, setReCost] = usePersistentToolState("reCost", 0.40);
  const [reRate, setReRate] = usePersistentToolState("reRate", 8);
  const [reLtv, setReLtv] = usePersistentToolState("reLtv", 4.50);
  const [newCpi, setNewCpi] = usePersistentToolState("newCpi", 1.80);
  const [newLtv, setNewLtv] = usePersistentToolState("newLtv", 6.00);

  const reBudget = lapsed * reCost;
  const reCount = lapsed * (reRate / 100);
  const reRev = reCount * reLtv;
  const newCount = reBudget / newCpi;
  const newRevTotal = newCount * newLtv;

  return (
    <div>
      <ToolSlider label="Lapsed User Audience" value={lapsed} min={1000} max={1000000} step={1000} fmt={fn} onChange={setLapsed} accent={accent} />
      <ToolSlider label="Cost per Re-reached User" value={reCost} min={0.05} max={5} step={0.05} fmt={fc} onChange={setReCost} accent={accent} />
      <ToolSlider label="Re-activation Rate %" value={reRate} min={1} max={30} step={0.5} fmt={fp} onChange={setReRate} accent={accent} />
      <ToolSlider label="Re-activated User LTV" value={reLtv} min={0.5} max={30} step={0.5} fmt={fc} onChange={setReLtv} accent={accent} />
      <ToolSlider label="New User CPI ($)" value={newCpi} min={0.5} max={10} step={0.1} fmt={fc} onChange={setNewCpi} accent={accent} />
      
      <SLabel>Strategic Comparison</SLabel>
      <ToolRow label="Re-engagement ROI" value={fc(reRev - reBudget)} pos={reRev > reBudget} neg={reRev < reBudget} />
      <ToolRow label="Total Re-activated Rev" value={fc(reRev)} color={T.pos} />
      <ToolRow label="Equivalent New User Rev" value={fc(newRevTotal)} color={T.amber} />
      <div className={`mt-6 p-4 rounded-xl border text-center font-bold text-sm ${reRev > newRevTotal ? 'bg-pos/10 border-pos/30 text-pos' : 'bg-amber/10 border-amber/30 text-amber'}`}>
        Optimal Strategy: {reRev > newRevTotal ? "Re-engagement 🔁" : "Market Acquisition 🎯"}
      </div>
    </div>
  );
}

/* Localization ROI Calc */
function LocalizationROICalc({ accent = T.teal }: any) {
  const [cost, setCost] = usePersistentToolState("cost", 2500);
  const [langs, setLangs] = usePersistentToolState("langs", 5);
  const [installs, setInstalls] = usePersistentToolState("installs", 50000);
  const [lift, setLift] = usePersistentToolState("lift", 8);
  const [rev, setRev] = usePersistentToolState("rev", 1.20);

  const totalCost = cost * langs;
  const extraInstalls = installs * (lift * langs / 100);
  const extraRev = extraInstalls * rev;
  const roi = ((extraRev * 12 - totalCost) / totalCost) * 100;

  return (
    <div>
      <ToolSlider label="Price per Main Language" value={cost} min={500} max={10000} step={500} fmt={fc} onChange={setCost} accent={accent} />
      <ToolSlider label="Number of Regions" value={langs} min={1} max={20} step={1} fmt={v => v} onChange={setLangs} accent={accent} />
      <ToolSlider label="Current Reach (Installs/mo)" value={installs} min={1000} max={1000000} step={1000} fmt={fn} onChange={setInstalls} accent={accent} />
      <ToolSlider label="Expected Lift per Lang %" value={lift} min={1} max={25} step={0.5} fmt={fp} onChange={setLift} accent={accent} />
      
      <SLabel>Return on Expansion</SLabel>
      <ToolRow label="Total Project Cost" value={fc(totalCost)} neg />
      <ToolRow label="Additional Installs/mo" value={fn(extraInstalls)} />
      <ToolRow label="Monthly Revenue Lift" value={fc(extraRev)} color={T.pos} />
      <ToolRow label="Annualized ROI" value={`${roi.toFixed(0)}%`} bold pos={roi > 0} neg={roi < 0} />
    </div>
  );
}

/* Retention Curve Calc */
function RetentionCurveCalc({ accent = T.forest }: any) {
  const [d1, setD1] = usePersistentToolState("d1", 40);
  const [d7, setD7] = usePersistentToolState("d7", 20);
  const [d30, setD30] = usePersistentToolState("d30", 10);
  const [installs, setInstalls] = usePersistentToolState("installs", 10000);

  const dayPoints = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let ret = 0;
    if (day === 1) ret = d1;
    else if (day < 7) ret = d1 - ((d1 - d7) / 6) * (day - 1);
    else ret = d7 - ((d7 - d30) / 23) * (day - 7);
    return { v: Math.max(0, ret * installs / 100) };
  });

  return (
    <div>
      <ToolSlider label="Day 1 Retention %" value={d1} min={5} max={80} step={1} fmt={fp} onChange={setD1} accent={accent} />
      <ToolSlider label="Day 7 Retention %" value={d7} min={2} max={60} step={1} fmt={fp} onChange={setD7} accent={accent} />
      <ToolSlider label="Day 30 Retention %" value={d30} min={1} max={40} step={1} fmt={fp} onChange={setD30} accent={accent} />
      <ToolSlider label="Monthly New Installs" value={installs} min={100} max={100000} step={100} fmt={fn} onChange={setInstalls} accent={accent} />
      
      <SLabel>Engagement Decay</SLabel>
      <ToolRow label="Day 30 Active Cohort" value={fn(dayPoints[29].v)} bold color={T.blue} />
      <ToolRow label="Retention Efficiency" value={`${(d30 / d1 * 100).toFixed(1)}% (D30/D1)`} />
      <MiniChart data={dayPoints} accent={accent} />
    </div>
  );
}

/* Session Engagement Calc */
function SessionEngagementCalc({ accent = T.teal }: any) {
  const [dau, setDau] = usePersistentToolState("dau", 50000);
  const [len, setLen] = usePersistentToolState("len", 4.5);
  const [freq, setFreq] = usePersistentToolState("freq", 3);
  const [monet, setMonet] = usePersistentToolState("monet", 5);
  const totalMins = dau * freq * len;

  return (
    <div>
      <ToolSlider label="Daily Active Users" value={dau} min={1000} max={1000000} step={1000} fmt={fn} onChange={setDau} accent={accent} />
      <ToolSlider label="Average Session (Mins)" value={len} min={0.5} max={30} step={0.5} fmt={v => `${v}m`} onChange={setLen} accent={accent} />
      <ToolSlider label="Sessions per Day" value={freq} min={1} max={15} step={0.5} fmt={v => v.toFixed(1)} onChange={setFreq} accent={accent} />
      <ToolSlider label="Engagement High-Score %" value={monet} min={0.1} max={25} step={0.1} fmt={fp} onChange={setMonet} accent={accent} />
      
      <SLabel>Immersion Metrics</SLabel>
      <ToolRow label="Total Minutes Played/Day" value={fn(totalMins)} />
      <ToolRow label="Engagement Index" value={`${(len * freq).toFixed(1)}m/day`} bold color={T.pos} />
      <ToolRow label="High-Engagement DAU" value={fn(dau * (monet / 100))} color={T.blue} />
    </div>
  );
}

/* Unit Economics Dashboard */
function UnitEconCalc({ accent = T.violet }: any) {
  const [cac, setCac] = usePersistentToolState("cac", 120);
  const [ltv, setLtv] = usePersistentToolState("ltv", 480);
  const [margin, setMargin] = usePersistentToolState("margin", 70);
  const [payback, setPayback] = usePersistentToolState("payback", 8);
  const ltvCac = cac > 0 ? ltv / cac : 0;
  const health = ltvCac >= 3 && payback <= 12 ? "Healthy 🟢" : ltvCac >= 2 ? "Caution 🟡" : "At Risk 🔴";

  return (
    <div>
      <ToolSlider label="Customer Acquisition Cost (CAC)" value={cac} min={1} max={1000} step={1} fmt={fc} onChange={setCac} accent={accent} />
      <ToolSlider label="Lifetime Value (LTV)" value={ltv} min={1} max={10000} step={10} fmt={fc} onChange={setLtv} accent={accent} />
      <ToolSlider label="Gross Margin %" value={margin} min={10} max={100} step={1} fmt={fp} onChange={setMargin} accent={accent} />
      <ToolSlider label="Payback Period (Months)" value={payback} min={1} max={36} step={1} fmt={v => `${v}m`} onChange={setPayback} accent={accent} />
      
      <SLabel>Business Sustainability</SLabel>
      <ToolRow label="LTV : CAC Ratio" value={`${ltvCac.toFixed(2)}x`} bold color={ltvCac >= 3 ? T.pos : T.neg} />
      <ToolRow label="Gross Profit per User" value={fc(ltv * (margin / 100))} />
      <ToolRow label="Economic Health" value={health} />
      <ToolBenchmark label="LTV:CAC Goal" value={ltvCac} median={3} />
    </div>
  );
}

/* Dev Cost ROI Calc */
function DevCostROICalc({ accent = T.brick }: any) {
  const [cost, setCost] = usePersistentToolState("cost", 80000);
  const [mRev, setMRev] = usePersistentToolState("mRev", 5000);
  const [growth, setGrowth] = usePersistentToolState("growth", 10);
  
  const months = Array.from({ length: 24 }, (_, i) => {
    const rev = mRev * Math.pow(1 + growth / 100, i);
    return { v: rev };
  });
  const totalRev24 = months.reduce((s, m) => s + m.v, 0);
  const roi = ((totalRev24 * 0.7 - cost) / cost) * 100;

  return (
    <div>
      <ToolSlider label="Initial Build Cost" value={cost} min={5000} max={500000} step={5000} fmt={fc} onChange={setCost} accent={accent} />
      <ToolSlider label="Launch Month Revenue" value={mRev} min={100} max={50000} step={100} fmt={fc} onChange={setMRev} accent={accent} />
      <ToolSlider label="Monthly Growth Rate %" value={growth} min={0} max={50} step={0.5} fmt={fp} onChange={setGrowth} accent={accent} />
      
      <SLabel>24-Month Return</SLabel>
      <ToolRow label="Projected 2Y Total Rev" value={fc(totalRev24)} />
      <ToolRow label="Net Profit (minus fees/cost)" value={fc(totalRev24 * 0.7 - cost)} pos={totalRev24 * 0.7 > cost} />
      <ToolRow label="Build ROI" value={`${roi.toFixed(0)}%`} bold color={roi > 0 ? T.pos : T.neg} />
      <MiniChart data={months} accent={accent} />
    </div>
  );
}

/* Team Scaling Plan */
function TeamScalingCalc({ accent = T.amber }: any) {
  const [rev, setRev] = usePersistentToolState("rev", 500000);
  const [salary, setSalary] = usePersistentToolState("salary", 8000);
  const [rpe, setRpe] = usePersistentToolState("rpe", 15000);
  
  const team = Math.ceil(rev / rpe);
  const payroll = team * salary * 12;

  return (
    <div>
      <ToolSlider label="Target Annual Revenue" value={rev} min={100000} max={10000000} step={100000} fmt={fc} onChange={setRev} accent={accent} />
      <ToolSlider label="Avg Monthly Salary/Seat" value={salary} min={2000} max={20000} step={500} fmt={fc} onChange={setSalary} accent={accent} />
      <ToolSlider label="Revenue per Employee/mo" value={rpe} min={1000} max={100000} step={1000} fmt={fc} onChange={setRpe} accent={accent} />
      
      <SLabel>Operational Structure</SLabel>
      <ToolRow label="Required Team Size" value={`${team} People`} bold color={T.blue} />
      <ToolRow label="Annual Payroll Overhead" value={fc(payroll)} neg />
      <ToolRow label="Payroll % of Revenue" value={`${(payroll / rev * 100).toFixed(1)}%`} color={payroll / rev > 0.5 ? T.neg : T.pos} />
    </div>
  );
}

/* Competitor Revenue Estimator */
function CompetitorRevenueCalc({ accent = T.moss }: any) {
  const [rank, setRank] = usePersistentToolState("rank", 250);
  const [cat, setCat] = usePersistentToolState("cat", "games");
  const mults: any = { games: 1.8, health: 1.2, utility: 0.9, social: 1.5 };
  
  const daily = rank <= 10 ? 50000 / rank : rank <= 50 ? 8000 / rank : 500 / (rank / 50);
  const rev = daily * mults[cat] * 30 * 0.03 * 8; // simplified model

  return (
    <div>
      <ToolSelect label="Competitor Category" value={cat} onChange={setCat} options={[["games","🎮 Games"],["health","💪 Health"],["utility","⚡ Utility"],["social","👥 Social"]]}/>
      <ToolSlider label="Current Store Rank" value={rank} min={1} max={1000} step={1} fmt={v => `#${v}`} onChange={setRank} accent={accent} />
      
      <SLabel>Market Intelligence</SLabel>
      <ToolRow label="Est. Daily Downloads" value={fn(daily * mults[cat])} />
      <ToolRow label="Est. Monthly Revenue" value={fc(rev)} bold color={T.pos} />
      <p className="mt-4 text-[0.6rem] text-muted leading-relaxed">Note: Estimates based on generic ranking-to-download curves. Actuals vary by seasonal trends.</p>
    </div>
  );
}

/* Whale Segmentation Aid */
function WhaleSegmentation({ accent = T.navy }: any) {
  const [total, setTotal] = usePersistentToolState("total", 1000);
  const [whalePct, setWhalePct] = usePersistentToolState("whalePct", 5);
  const [wSpend, setWSpend] = usePersistentToolState("wSpend", 120);

  return (
    <div>
      <ToolSlider label="Total Paying Users" value={total} min={100} max={10000} step={100} fmt={fn} onChange={setTotal} accent={accent} />
      <ToolSlider label="Whale Segment %" value={whalePct} min={1} max={15} step={0.5} fmt={fp} onChange={setWhalePct} accent={accent} />
      <ToolSlider label="Avg Whale Spend ($)" value={wSpend} min={20} max={1000} step={10} fmt={fc} onChange={setWSpend} accent={accent} />
      
      <SLabel>Monetization Split</SLabel>
      <ToolRow label="Whale Count" value={fn(total * (whalePct / 100))} color={T.rose} />
      <ToolRow label="Whale Total Revenue" value={fc(total * (whalePct / 100) * wSpend)} bold color={T.pos} />
      <ToolRow label="Concentration Risk" value={whalePct < 5 ? "High (Whale Dependent)" : "Balanced"} color={whalePct < 5 ? T.neg : T.pos} />
    </div>
  );
}

/* Rating Impact Calc */
function RatingImpactCalc({ accent = T.gold }: any) {
  const [current, setCurrent] = usePersistentToolState("current", 3.8);
  const [target, setTarget] = usePersistentToolState("target", 4.5);
  const [installs, setInstalls] = usePersistentToolState("installs", 10000);
  
  const baseConv = 0.25 + (current - 1) * 0.12;
  const targetConv = 0.25 + (target - 1) * 0.12;
  const lift = targetConv / baseConv;

  return (
    <div>
      <ToolSlider label="Current Rating" value={current} min={1} max={5} step={0.1} fmt={v => `${v.toFixed(1)} ★`} onChange={setCurrent} accent={accent} />
      <ToolSlider label="Target Rating" value={target} min={1} max={5} step={0.1} fmt={v => `${v.toFixed(1)} ★`} onChange={setTarget} accent={accent} />
      <ToolSlider label="Current Monthly Downloads" value={installs} min={100} max={100000} step={100} fmt={fn} onChange={setInstalls} accent={accent} />
      
      <SLabel>Invisibility to Visibility</SLabel>
      <ToolRow label="Store Page CVR (Current)" value={fp(baseConv * 100)} />
      <ToolRow label="Store Page CVR (Target)" value={fp(targetConv * 100)} color={T.pos} />
      <ToolRow label="Projected Monthly Downloads" value={fn(installs * lift)} bold color={T.pos} />
      <ToolRow label="Conversion Lift" value={`+${((lift - 1) * 100).toFixed(0)}%`} bold color={T.blue} />
    </div>
  );
}

/* Push Notification ROI */
function PushNotifCalc({ accent = T.amber }: any) {
  const [mau, setMau] = usePersistentToolState("mau", 100000);
  const [optIn, setOptIn] = usePersistentToolState("optIn", 45);
  const [open, setOpen] = usePersistentToolState("open", 8);
  const [revPerConv, setRevPerConv] = usePersistentToolState("revPerConv", 3.50);
  
  const sends = mau * (optIn / 100);
  const convs = sends * (open / 100) * 0.04;
  const rev = convs * revPerConv;

  return (
    <div>
      <ToolSlider label="Monthly Active Users" value={mau} min={1000} max={1000000} step={1000} fmt={fn} onChange={setMau} accent={accent} />
      <ToolSlider label="Push Opt-in Rate %" value={optIn} min={5} max={90} step={1} fmt={fp} onChange={setOptIn} accent={accent} />
      <ToolSlider label="Avg Open Rate %" value={open} min={1} max={25} step={0.5} fmt={fp} onChange={setOpen} accent={accent} />
      <ToolSlider label="Revenue per Conversion" value={revPerConv} min={0.5} max={50} step={0.5} fmt={fc} onChange={setRevPerConv} accent={accent} />
      
      <SLabel>Retention Value</SLabel>
      <ToolRow label="Addressable Reach" value={fn(sends)} />
      <ToolRow label="Monthly Conversions" value={fn(convs)} />
      <ToolRow label="Net Monthly Revenue" value={fc(rev)} bold color={T.pos} />
      <ToolRow label="ROI on CRM Investment" value="High (Organic)" color={T.blue} />
    </div>
  );
}

/* Geo Revenue Split Calc */
function GeoRevenueCalc({ accent = T.navy }: any) {
  const [total, setTotal] = usePersistentToolState("total", 100000);
  const [t1, setT1] = usePersistentToolState("t1", 20);
  const [t2, setT2] = usePersistentToolState("t2", 35);
  
  const revT1 = total * (t1 / 100) * 0.12 * 30;
  const revT2 = total * (t2 / 100) * 0.05 * 30;
  const revT3 = total * ((100 - t1 - t2) / 100) * 0.01 * 30;

  return (
    <div>
      <ToolSlider label="Global DAU" value={total} min={1000} max={1000000} step={1000} fmt={fn} onChange={setTotal} accent={accent} />
      <ToolSlider label="Tier 1 (US/UK/AU) %" value={t1} min={0} max={80} step={1} fmt={fp} onChange={setT1} accent={accent} />
      <ToolSlider label="Tier 2 (EU/JP/KR) %" value={t2} min={0} max={80} step={1} fmt={fp} onChange={setT2} accent={accent} />
      
      <SLabel>Geographic Yield</SLabel>
      <ToolRow label="Tier 1 Rev/mo" value={fc(revT1)} color={T.blue} />
      <ToolRow label="Tier 2 Rev/mo" value={fc(revT2)} color={T.amber} />
      <ToolRow label="Tier 3 Rev/mo" value={fc(revT3)} color={T.muted} />
      <ToolRow label="Total Estimated Monthly" value={fc(revT1 + revT2 + revT3)} bold color={T.pos} />
    </div>
  );
}

/* eCPM by Country Calc */
function EcpmByCountryCalc({ accent = T.slate }: any) {
  const [imps, setImps] = usePersistentToolState("imps", 1000000);
  const countries = [["🇺🇸 US", 12.50], ["🇬🇧 UK", 10.00], ["🇧🇷 BR", 2.50], ["🇮🇳 IN", 0.80]];
  
  return (
    <div>
      <ToolSlider label="Monthly Impressions" value={imps} min={10000} max={10000000} step={10000} fmt={fn} onChange={setImps} accent={accent} />
      <SLabel>Yield Comparison</SLabel>
      <div className="space-y-2">
        {countries.map(([c, e]: any) => (
          <div key={c} className="flex justify-between py-2 border-b border-tint/5">
            <span className="text-xs text-muted">{c}</span>
            <span className="text-xs font-mono font-bold text-tint">{fc((imps * e) / 1000)} <span className="text-[0.6rem] text-mutedL ml-2">(${e} eCPM)</span></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ASO Keyword Traffic Calc */
function KeywordTrafficCalc({ accent = T.sage }: any) {
  const [vol, setVol] = usePersistentToolState("vol", 50000);
  const [rank, setRank] = usePersistentToolState("rank", 8);
  const ctrs = [0, 0.30, 0.22, 0.16, 0.12, 0.09, 0.07, 0.05, 0.04, 0.03, 0.02];
  const ctr = rank <= 10 ? ctrs[rank] : 0.01;

  return (
    <div>
      <ToolSlider label="Keyword Search Volume" value={vol} min={1000} max={500000} step={1000} fmt={fn} onChange={setVol} accent={accent} />
      <ToolSlider label="Projected Rank" value={rank} min={1} max={30} step={1} fmt={v => `#${v}`} onChange={setRank} accent={accent} />
      
      <SLabel>Visibility Logic</SLabel>
      <ToolRow label="Estimated CTR" value={fp(ctr * 100)} color={T.blue} />
      <ToolRow label="Monthly Downloads" value={fn(vol * ctr)} bold color={T.pos} />
      <ToolBenchmark label="Organic Volume" value={vol * ctr} median={500} />
    </div>
  );
}

/* CVR Optimizer ROI */
function ConvRateOptimizerCalc({ accent = T.amber }: any) {
  const [cvr, setCvr] = usePersistentToolState("cvr", 28);
  const [lift, setLift] = usePersistentToolState("lift", 15);
  const [imps, setImps] = usePersistentToolState("imps", 200000);
  
  const current = imps * (cvr / 100);
  const target = current * (1 + lift / 100);

  return (
    <div>
      <ToolSlider label="Current Store CVR %" value={cvr} min={5} max={60} step={0.5} fmt={fp} onChange={setCvr} accent={accent} />
      <ToolSlider label="Expected A/B Test Lift %" value={lift} min={1} max={50} step={1} fmt={fp} onChange={setLift} accent={accent} />
      <ToolSlider label="Monthly Impressions" value={imps} min={10000} max={1000000} step={10000} fmt={fn} onChange={setImps} accent={accent} />
      
      <SLabel>Optimized Output</SLabel>
      <ToolRow label="Current Monthly Installs" value={fn(current)} />
      <ToolRow label="Projected Monthly Installs" value={fn(target)} bold color={T.pos} />
      <ToolRow label="Additional Installs/mo" value={fn(target - current)} color={T.blue} />
    </div>
  );
}

/* Review Velocity Calc */
function ReviewVelocityCalc({ accent = T.rose }: any) {
  const [rating, setRating] = usePersistentToolState("rating", 3.9);
  const [target, setTarget] = usePersistentToolState("target", 4.5);
  const [counts, setCounts] = usePersistentToolState("counts", 2000);
  
  const needed = Math.ceil((target * (counts + 500) - rating * counts) / (5 - target));

  return (
    <div>
      <ToolSlider label="Current Rating" value={rating} min={1} max={5} step={0.1} fmt={v => `${v.toFixed(1)} ★`} onChange={setRating} accent={accent} />
      <ToolSlider label="Target Rating" value={target} min={rating} max={5} step={0.1} fmt={v => `${v.toFixed(1)} ★`} onChange={setTarget} accent={accent} />
      <ToolSlider label="Current Number of Reviews" value={counts} min={10} max={10000} step={10} fmt={fn} onChange={setCounts} accent={accent} />
      
      <SLabel>Momentum Plan</SLabel>
      <ToolRow label="5★ Reviews Needed" value={fn(needed > 0 ? needed : 0)} bold color={T.pos} />
      <ToolRow label="Projected Time (10/day)" value={`${Math.ceil((needed > 0 ? needed : 0) / 10)} Days`} />
    </div>
  );
}

/* User Lifecycle Calc */
function UserLifecycleCalc({ accent = T.moss }: any) {
  const [total, setTotal] = usePersistentToolState("total", 100000);
  const [newPct, setNewPct] = usePersistentToolState("newPct", 15);
  const [activePct, setActivePct] = usePersistentToolState("activePct", 40);
  
  const newU = total * (newPct / 100);
  const activeU = total * (activePct / 100);
  const riskU = total * (25 / 100);
  const churnedU = total - newU - activeU - riskU;

  return (
    <div>
      <ToolSlider label="Total Addressable Users" value={total} min={1000} max={1000000} step={1000} fmt={fn} onChange={setTotal} accent={accent} />
      <ToolSlider label="New Users (Acquisition) %" value={newPct} min={1} max={50} step={1} fmt={fp} onChange={setNewPct} accent={accent} />
      <ToolSlider label="Engaged (Loyal) Users %" value={activePct} min={5} max={70} step={1} fmt={fp} onChange={setActivePct} accent={accent} />
      
      <SLabel>Population Health</SLabel>
      <ToolRow label="New Cohort Population" value={fn(newU)} color={T.blue} />
      <ToolRow label="Core Active Population" value={fn(activeU)} color={T.pos} />
      <ToolRow label="At-Risk Population (25%)" value={fn(riskU)} color={T.warn} />
      <ToolRow label="Churned Population" value={fn(churnedU)} color={T.neg} />
    </div>
  );
}

/* Waterfall vs Bidding Calc */
function WaterfallVsBiddingCalc({ accent = T.sienna }: any) {
  const [ecpm, setEcpm] = usePersistentToolState("ecpm", 4.50);
  const [lift, setLift] = usePersistentToolState("lift", 20);
  const imps = 50000 * 30; // standard benchmark

  return (
    <div>
      <ToolSlider label="Current Waterfall eCPM" value={ecpm} min={0.5} max={25} step={0.5} fmt={v => `$${v.toFixed(2)}`} onChange={setEcpm} accent={accent} />
      <ToolSlider label="Expected Bidding Lift %" value={lift} min={5} max={60} step={1} fmt={fp} onChange={setLift} accent={accent} />
      
      <SLabel>Unified vs Linear Auctions</SLabel>
      <ToolRow label="Waterfall Revenue/mo" value={fc(imps * (ecpm / 1000))} />
      <ToolRow label="Projected Bidding Rev/mo" value={fc(imps * (ecpm * (1 + lift / 100) / 1000))} bold color={T.pos} />
      <ToolRow label="Net Revenue Lift/mo" value={fc(imps * (ecpm * (lift / 100) / 1000))} color={T.blue} />
    </div>
  );
}

/* Ad Frequency Optimizer */
function AdFrequencyCalc({ accent = T.terra }: any) {
  const [freq, setFreq] = usePersistentToolState("freq", 3);
  const [risk, setRisk] = usePersistentToolState("risk", 2);
  const [ltv, setLtv] = usePersistentToolState("ltv", 0.80);
  
  const rev = freq * 0.02;
  const churn = freq * (risk / 100);
  const lostLtv = churn * ltv;

  return (
    <div>
      <ToolSlider label="Ads per Session" value={freq} min={1} max={10} step={1} fmt={v => v} onChange={setFreq} accent={accent} />
      <ToolSlider label="Churn Risk per Ad %" value={risk} min={0.1} max={5} step={0.1} fmt={fp} onChange={setRisk} accent={accent} />
      <ToolSlider label="User LTV ($)" value={ltv} min={0.1} max={10} step={0.1} fmt={fc} onChange={setLtv} accent={accent} />
      
      <SLabel>Monetization SWEET SPOT</SLabel>
      <ToolRow label="Ad Revenue per Session" value={`$${rev.toFixed(3)}`} />
      <ToolRow label="LTV Impact per Session" value={`−$${lostLtv.toFixed(3)}`} neg />
      <ToolRow label="Net Profit per Session" value={`$${(rev - lostLtv).toFixed(3)}`} bold color={rev > lostLtv ? T.pos : T.neg} />
    </div>
  );
}

/* Screenshot Planner */
function ScreenshotPlanner() {
  const [cat, setCat] = usePersistentToolState("cat", "games");
  
  const FLOWS: any = {
    games: [
      { t: "1. The Hook", d: "High-action gameplay moment showcasing the core mechanic." },
      { t: "2. The Progression", d: "Show levelling up or discovering rare loot." },
      { t: "3. The Social Aspect", d: "Leaderboards, guilds, or multiplayer combat." },
      { t: "4. Customization", d: "Skins, skill trees, or base building variants." },
      { t: "5. Massive Scale", d: "Boss fight or huge sweeping environment." }
    ],
    utility: [
      { t: "1. Core Unfair Advantage", d: "The #1 problem this app solves instantly." },
      { t: "2. Ease of Use", d: "Clean UI showing how fast the task is completed." },
      { t: "3. Social Proof", d: "Include a real user review or 'App of the Day' badge." },
      { t: "4. Powerful Feature", d: "The advanced 'Pro' feature that drives upgrades." },
      { t: "5. Integrations", d: "Show widgets, Apple Watch, or sync features." }
    ],
    social: [
      { t: "1. The Community", d: "Vibrant profile or feed filled with activity." },
      { t: "2. The Connection", d: "Direct messaging, video calls, or groups." },
      { t: "3. The Creator Tools", d: "Filters, camera features, or text overlays." },
      { t: "4. Discovery", d: "Explore page showing personalized content." },
      { t: "5. Safety/Privacy", d: "Show blocking, reporting, or privacy toggles." }
    ]
  };

  return (
    <div className="space-y-6">
      <ToolSelect label="App Category" value={cat} onChange={setCat} options={[["games","🎮 Games"],["utility","⚡ Utility"],["social","👥 Social"]]}/>
      <SLabel>Visual Pipeline</SLabel>
      <div className="space-y-3">
        {FLOWS[cat].map((s: any) => (
          <div key={s.t} className="p-4 bg-tint/5 border border-tint/5 rounded-xl group hover:bg-tint/10 transition-all">
            <div className="text-sm font-bold text-tint mb-1 group-hover:text-blue transition-colors">{s.t}</div>
            <div className="text-xs text-muted leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>
      <AIInsightStatic calcId="Screenshots" results={{ "Category": cat.toUpperCase(), "Screens": FLOWS[cat].length.toString() }} />
    </div>
  );
}

/* Press Kit Generator */
function PressKitGenerator() {
  const [name, setName] = usePersistentToolState("name", "");
  return (
    <div className="space-y-4">
      <ToolInput label="App Name" value={name} onChange={setName} placeholder="Your app name..." />
      <div className="p-5 bg-tint/5 border border-tint/10 rounded-2xl">
        <div className="text-[0.6rem] text-mutedL font-black uppercase tracking-widest mb-3">Draft Template</div>
        <p className="text-xs text-muted leading-relaxed">
          FOR IMMEDIATE RELEASE: {name || "[APP NAME]"} officially launches today to help users solve [Problem]. Founded by [Your Company], the app offers a unique [Key Benefit]...
        </p>
      </div>
      <CopyButton text={`Press Release for ${name}`} />
    </div>
  );
}

/* Beta Tester Planner */
function BetaTesterPlanner() {
  const [n, setN] = usePersistentToolState("n", 50);
  return (
    <div>
      <ToolSlider label="Desired Beta Pool" value={n} min={10} max={1000} step={10} fmt={v => v} onChange={setN} accent={T.blue} />
      <SLabel>Execution Roadmap</SLabel>
      <ToolRow label="Recruitment Channels" value="TestFlight, Reddit, PH" />
      <ToolRow label="Testing Duration" value="14-21 Days" />
      <ToolRow label="Est. Feedback Volume" value={fn(n * 0.4)} />
    </div>
  );
}

/* Competitor Analysis Scorecard */
function CompetitorAnalysis() {
  const [n, setN] = usePersistentToolState("n", 3);
  return (
    <div>
      <ToolSlider label="Number of Competitors" value={n} min={1} max={5} step={1} fmt={v => v} onChange={setN} accent={T.blue} />
      <SLabel>Market Dimensions</SLabel>
      <div className="space-y-2">
        {["ASO Intensity", "Monetization Quality", "Product Polish", "Ads Presence"].map(d => (
          <div key={d} className="flex justify-between items-center py-2 border-b border-tint/5">
            <span className="text-xs text-muted">{d}</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-blue/40" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* OKR Generator */
function OKRGenerator() {
  const [goal, setGoal] = usePersistentToolState("goal", "growth");
  return (
    <div className="space-y-4">
      <ToolSelect label="Strategic Focus" value={goal} onChange={setGoal} options={[["growth","🚀 Growth"], ["retention","🔄 Retention"], ["monetization","💰 Monetization"]]}/>
      <div className="p-5 bg-tint/5 border border-tint/10 rounded-2xl">
        <div className="text-[0.65rem] text-blue font-black uppercase tracking-widest mb-3">Suggested OKRs</div>
        <div className="space-y-3">
          <div className="text-xs text-tint font-bold">Obj: Scale UA to sustainable units.</div>
          <div className="text-xs text-muted pl-4 border-l border-tint/10">• KR1: Reach 10K DAU.</div>
          <div className="text-xs text-muted pl-4 border-l border-tint/10">• KR2: LTV:CAC {">"} 3.0x.</div>
        </div>
      </div>
    </div>
  );
}

/* UA Channel Playbook Builder */
function UAChannelPlaybook() {
  const [cat, setCat] = usePersistentToolState("cat", "games");
  const [budget, setBudget] = usePersistentToolState("budget", "mid");
  const [audience, setAudience] = usePersistentToolState("audience", "broad");
  
  const CHANNELS = [
    { name: "Meta Ads", icon: "📘", cost: "Mid", reach: "Highest", fit: cat === 'games' ? 95 : 85, phase: "Phase 1: Broad Acquisition & Lookalikes" },
    { name: "Google UAC", icon: "🔴", cost: "High", reach: "High", fit: budget === 'large' ? 95 : 70, phase: "Phase 2: Intent & Scale" },
    { name: "TikTok Ads", icon: "🎵", cost: "Low", reach: "Growing", fit: audience === 'genz' ? 98 : 75, phase: "Phase 1: Viral Creative Testing" },
    { name: "Apple Search", icon: "🍎", cost: "High", reach: "Intent-Based", fit: 98, phase: "Phase 1: Brand Protection & High Intent" },
  ].sort((a, b) => b.fit - a.fit);

  return (
    <div>
      <ToolSelect label="App Category" value={cat} onChange={setCat} options={[["games","🎮 Games"],["health","💪 Health"],["utility","⚡ Utility"],["social","👥 Social"]]}/>
      <ToolSelect label="Target Audience" value={audience} onChange={setAudience} options={[["broad","🌍 Broad Appeal"],["genz","📱 Gen-Z / Younger"],["niche","🎯 Niche B2B/Pro"]]}/>
      <ToolPills options={[["small","$1K-5K"], ["mid","$5K-50K"], ["large","$50K+"]]} value={budget} onChange={setBudget} accent={T.blue} />
      
      <SLabel>Custom Channel Playbook</SLabel>
      <div className="space-y-4">
        {CHANNELS.map((ch, i) => (
          <div key={ch.name} className="relative p-5 bg-tint/5 border border-tint/5 rounded-2xl flex flex-col gap-3 group hover:border-tint/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ch.icon}</span>
                <div>
                  <div className="text-sm font-bold text-tint">{ch.name}</div>
                  <div className="text-[0.6rem] text-muted font-bold tracking-widest uppercase">{ch.cost} Cost · {ch.reach} Reach</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-black ${i === 0 ? 'text-pos' : i === 1 ? 'text-blue' : 'text-muted'}`}>{ch.fit}%</div>
                <div className="text-[0.5rem] text-muted font-bold uppercase tracking-tighter">FIT SCORE</div>
              </div>
            </div>
            {i < 2 && (
              <div className="pt-3 border-t border-tint/5 mt-1">
                <div className="text-[0.65rem] font-black text-tint uppercase tracking-widest mb-1">{ch.phase}</div>
                <p className="text-xs text-muted leading-relaxed">
                  {i === 0 ? `Allocate 60% of your ${budget} budget here to establish baseline CPI and identify winning creatives.` : `Use remaining 40% to capture high-intent searches and retargeting.`}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Influencer Outreach Tool */
function InfluencerOutreach() {
  const [type, setType] = usePersistentToolState("type", "micro");
  const [n, setN] = usePersistentToolState("n", 10);
  const rates: any = { nano: 150, micro: 800, mid: 3500, macro: 15000 };
  
  return (
    <div>
      <ToolPills options={[["nano", "Nano"], ["micro", "Micro"], ["mid", "Mid"], ["macro", "Macro"]]} value={type} onChange={setType} accent={T.blue} />
      <ToolSlider label="Number of Creators" value={n} min={1} max={50} step={1} fmt={v => v} onChange={setN} accent={T.blue} />
      
      <SLabel>Deployment Logistics</SLabel>
      <ToolRow label="Est. Total Reach" value={fn(n * (type === 'micro' ? 45000 : 150000))} />
      <ToolRow label="Estimated Budget" value={fc(n * rates[type])} bold color={T.pos} />
      <ToolRow label="Cost per Mille (CPM)" value={fc(rates[type] / (type === 'micro' ? 45 : 150))} />
      
      <div className="mt-8">
        <CopyButton text={`Campaign with ${n} ${type} influencers starting Q2.`} />
      </div>
    </div>
  );
}

/* Creator Calc */
function CreatorCalc({ accent = T.terra }: any) {
  const [views, setViews] = usePersistentToolState("views", 1000000);
  const [cpm, setCpm] = usePersistentToolState("cpm", 4);
  const [deals, setDeals] = usePersistentToolState("deals", 2);
  const [rate, setRate] = usePersistentToolState("rate", 3000);
  const ad = (views / 1000) * cpm, spon = deals * rate;
  const total = ad + spon;

  return (
    <div>
      <ToolSlider label="Monthly Content Views" value={views} min={10000} max={10000000} step={10000} fmt={fn} onChange={setViews} accent={accent} />
      <ToolSlider label="Average Ad CPM ($)" value={cpm} min={0.5} max={20} step={0.1} fmt={v => `$${v.toFixed(2)}`} onChange={setCpm} accent={accent} />
      <ToolSlider label="Monthly Sponsor Deals" value={deals} min={0} max={10} step={1} fmt={v => v} onChange={setDeals} accent={accent} />
      <ToolSlider label="Average Deal Value" value={rate} min={100} max={50000} step={100} fmt={fc} onChange={setRate} accent={accent} />
      
      <SLabel>Monthly Revenue Breakdown</SLabel>
      <ToolRow label="AdSense / Programmatic" value={fc(ad)} />
      <ToolRow label="Brand Sponsorships" value={fc(spon)} />
      <ToolRow label="Total Estimated Monthly" value={fc(total)} bold color={T.pos} />
      <ToolRow label="Blended RPM" value={`$${((total / views) * 1000).toFixed(2)}`} color={T.blue} />
    </div>
  );
}

/* SaaS Calc */
function SaaSCalc({ accent = T.navy }: any) {
  const [free, setFree] = usePersistentToolState("free", 50000);
  const [fconv, setFconv] = usePersistentToolState("fconv", 3);
  const [pro, setPro] = usePersistentToolState("pro", 29);
  const [ent, setEnt] = usePersistentToolState("ent", 299);
  const [pe, setPe] = usePersistentToolState("pe", 8);
  const proU = free * (fconv / 100), entA = proU * (pe / 100);
  const mrr = proU * pro + entA * ent;

  return (
    <div>
      <ToolSlider label="Free Trial / Tier Users" value={free} min={1000} max={1000000} step={1000} fmt={fn} onChange={setFree} accent={accent} />
      <ToolSlider label="Free to Pro Conversion" value={fconv} min={0.1} max={15} step={0.1} fmt={fp} onChange={setFconv} accent={accent} />
      <ToolSlider label="Pro Plan Price/mo" value={pro} min={5} max={500} step={5} fmt={fc} onChange={setPro} accent={accent} />
      <ToolSlider label="Pro to Enterprise Upsell" value={pe} min={0.5} max={20} step={0.5} fmt={fp} onChange={setPe} accent={accent} />
      <ToolSlider label="Enterprise Base Price" value={ent} min={50} max={5000} step={50} fmt={fc} onChange={setEnt} accent={accent} />
      
      <SLabel>Market Segmentation</SLabel>
      <ToolRow label="Pro Tier Users" value={fn(proU)} />
      <ToolRow label="Enterprise Accounts" value={fn(entA)} />
      <ToolRow label="Total Monthly Revenue" value={fc(mrr)} bold color={T.pos} />
      <ToolRow label="Annual Recurring Revenue" value={fc(mrr * 12)} bold color={T.pos} />
    </div>
  );
}

/* Affiliate Calc */
function AffiliateCalc({ accent = T.sage }: any) {
  const [traffic, setTraffic] = usePersistentToolState("traffic", 100000);
  const [ctr, setCtr] = usePersistentToolState("ctr", 3);
  const [conv, setConv] = usePersistentToolState("conv", 2.5);
  const [aov, setAov] = usePersistentToolState("aov", 80);
  const [comm, setComm] = usePersistentToolState("comm", 8);
  const clicks = traffic * (ctr / 100), sales = clicks * (conv / 100);
  const monthly = sales * aov * (comm / 100);

  return (
    <div>
      <ToolSlider label="Monthly Web Traffic" value={traffic} min={1000} max={1000000} step={1000} fmt={fn} onChange={setTraffic} accent={accent} />
      <ToolSlider label="Affiliate Link CTR" value={ctr} min={0.1} max={20} step={0.1} fmt={fp} onChange={setCtr} accent={accent} />
      <ToolSlider label="Sales Conv. Rate" value={conv} min={0.1} max={15} step={0.1} fmt={fp} onChange={setConv} accent={accent} />
      <ToolSlider label="Average Order Value" value={aov} min={5} max={1000} step={5} fmt={fc} onChange={setAov} accent={accent} />
      <ToolSlider label="Commission Rate" value={comm} min={1} max={50} step={0.5} fmt={fp} onChange={setComm} accent={accent} />
      
      <SLabel>Projected Earnings</SLabel>
      <ToolRow label="Referral Clicks/mo" value={fn(clicks)} />
      <ToolRow label="Successful Sales" value={fn(sales)} />
      <ToolRow label="Monthly Commissions" value={fc(monthly)} bold color={T.pos} />
      <ToolRow label="Annualized Commissions" value={fc(monthly * 12)} bold color={T.pos} />
    </div>
  );
}

/* Freemium Calc */
function FreemiumCalc({ accent = T.moss }: any) {
  const [free, setFree] = usePersistentToolState("free", 100000);
  const [cost, setCost] = usePersistentToolState("cost", 0.50);
  const [conv, setConv] = usePersistentToolState("conv", 3);
  const [price, setPrice] = usePersistentToolState("price", 12);
  const paying = free * (conv / 100), freeCost = free * cost, rev = paying * price;
  const profit = rev - freeCost;

  return (
    <div>
      <ToolSlider label="Total Free Users" value={free} min={1000} max={5000000} step={1000} fmt={fn} onChange={setFree} accent={accent} />
      <ToolSlider label="Storage/Server Cost per User" value={cost} min={0.01} max={5} step={0.01} fmt={v => `$${v.toFixed(2)}`} onChange={setCost} accent={accent} />
      <ToolSlider label="Conversion to Paid" value={conv} min={0.1} max={15} step={0.1} fmt={fp} onChange={setConv} accent={accent} />
      <ToolSlider label="Monthly Paid Price" value={price} min={1} max={100} step={1} fmt={fc} onChange={setPrice} accent={accent} />
      
      <SLabel>Unit Economics</SLabel>
      <ToolRow label="Total Infrastructure Cost" value={fc(freeCost)} neg />
      <ToolRow label="Gross Revenue" value={fc(rev)} />
      <ToolRow label="Net Operating Profit" value={fc(profit)} bold color={T.pos} />
      <ToolRow label="Payback Ratio" value={`${(rev / freeCost).toFixed(2)}×`} color={T.blue} />
    </div>
  );
}

/* API Pricing Calc */
function APICalc({ accent = T.gold }: any) {
  const [calls, setCalls] = usePersistentToolState("calls", 5000000);
  const [p1, setP1] = usePersistentToolState("p1", 0.003);
  const [t1, setT1] = usePersistentToolState("t1", 1000000);
  const [p2, setP2] = usePersistentToolState("p2", 0.002);
  const t1c = Math.min(calls, t1), t2c = Math.max(0, calls - t1);
  const rev = t1c * p1 + t2c * p2;

  return (
    <div>
      <ToolSlider label="Monthly API Requests" value={calls} min={100000} max={100000000} step={100000} fmt={fn} onChange={setCalls} accent={accent} />
      <ToolSlider label="Tier 1 Request Price" value={p1} min={0.0001} max={0.05} step={0.0001} fmt={v => `$${v.toFixed(4)}`} onChange={setP1} accent={accent} />
      <ToolSlider label="Tier 1 Volume Limit" value={t1} min={100000} max={10000000} step={100000} fmt={fn} onChange={setT1} accent={accent} />
      <ToolSlider label="Tier 2 Request Price" value={p2} min={0.0001} max={0.05} step={0.0001} fmt={v => `$${v.toFixed(4)}`} onChange={setP2} accent={accent} />
      
      <SLabel>Monetization Strategy</SLabel>
      <ToolRow label="Tier 1 Revenue" value={fc(t1c * p1)} />
      <ToolRow label="Tier 2 Revenue" value={fc(t2c * p2)} />
      <ToolRow label="Total Monthly Revenue" value={fc(rev)} bold color={T.pos} />
      <ToolRow label="Effective Price per 1K" value={`$${((rev / calls) * 1000).toFixed(2)}`} color={T.blue} />
    </div>
  );
}

/* Monetization Mix Optimizer */
function MonetizationMixCalc({ accent = T.sienna }: any) {
  const [mau, setMau] = usePersistentToolState("mau", 100000);
  const [adRev, setAdRev] = usePersistentToolState("adRev", 2);
  const [iapConv, setIapConv] = usePersistentToolState("iapConv", 3);
  const [iapSpend, setIapSpend] = usePersistentToolState("iapSpend", 8);
  const [subConv, setSubConv] = usePersistentToolState("subConv", 1.5);
  const [subPrice, setSubPrice] = usePersistentToolState("subPrice", 9.99);
  const ads = mau * adRev / 1000, iap = mau * (iapConv / 100) * iapSpend, sub = mau * (subConv / 100) * subPrice;
  const total = ads + iap + sub;

  return (
    <div>
      <ToolSlider label="Monthly Active Users" value={mau} min={1000} max={1000000} step={1000} fmt={fn} onChange={setMau} accent={accent} />
      <SLabel>Advertising Lever</SLabel>
      <ToolSlider label="Ad ARPMAU ($)" value={adRev} min={0} max={10} step={0.1} fmt={v => `$${v.toFixed(2)}`} onChange={setAdRev} accent={T.blue} />
      <SLabel>IAP Lever</SLabel>
      <ToolSlider label="IAP Conversion %" value={iapConv} min={0} max={15} step={0.1} fmt={fp} onChange={setIapConv} accent={T.amber} />
      <ToolSlider label="Average IAP Ticket" value={iapSpend} min={0.99} max={50} step={0.5} fmt={fc} onChange={setIapSpend} accent={T.amber} />
      <SLabel>Subscription Lever</SLabel>
      <ToolSlider label="Subscription Conv. %" value={subConv} min={0} max={10} step={0.1} fmt={fp} onChange={setSubConv} accent={T.forest} />
      <ToolSlider label="Monthly Sub Price" value={subPrice} min={0.99} max={99} step={0.5} fmt={fc} onChange={setSubPrice} accent={T.forest} />
      
      <SLabel>Revenue Optimization Mix</SLabel>
      <ToolRow label="Estimated Ad Revenue" value={fc(ads)} color={T.blue} />
      <ToolRow label="Estimated IAP Revenue" value={fc(iap)} color={T.amber} />
      <ToolRow label="Estimated Sub Revenue" value={fc(sub)} color={T.forest} />
      <ToolRow label="Blended Monthly Total" value={fc(total)} bold color={T.pos} />
      <ToolRow label="Optimized ARPU" value={`$${(total / mau).toFixed(2)}`} color={T.blue} />
    </div>
  );
}

/* App Store Payout Calc */
function AppStorePayoutCalc({ accent = T.gold }: any) {
  const [gross, setGross] = usePersistentToolState("gross", 10000);
  const [platform, setPlatform] = usePersistentToolState("platform", "apple");
  const [bracket, setBracket] = usePersistentToolState("bracket", "under1m");
  const fee = bracket === "under1m" ? 0.15 : 0.30;
  const storeCut = gross * fee;
  const net = gross - storeCut;

  return (
    <div>
      <ToolPills options={[["apple", "🍎 Apple"], ["google", "🤖 Google"]]} value={platform} onChange={setPlatform} accent={accent} />
      <ToolPills options={[["under1m", "< $1M Revenue"], ["over1m", "> $1M Revenue"]]} value={bracket} onChange={setBracket} accent={accent} />
      <ToolSlider label="Gross App Store Revenue" value={gross} min={100} max={1000000} step={100} fmt={fc} onChange={setGross} accent={accent} />
      
      <SLabel>The Math of the Stores</SLabel>
      <ToolRow label="Gross Sales" value={fc(gross)} />
      <ToolRow label={`Platform Commission (${fee * 100}%)`} value={`−${fc(storeCut)}`} neg />
      <ToolRow label="Estimated Developer Payout" value={fc(net)} bold color={T.pos} />
      <ToolRow label="Annual Net (Projected)" value={fc(net * 12)} color={T.blue} />
    </div>
  );
}

/* User Acquisition (UAC) Calc */
function UACCalc({ accent = T.rose }: any) {
  const [spend, setSpend] = usePersistentToolState("spend", 5000);
  const [cpc, setCpc] = usePersistentToolState("cpc", 0.80);
  const [instConv, setInstConv] = usePersistentToolState("instConv", 25);
  const [revPerUser, setRevPerUser] = usePersistentToolState("revPerUser", 4.50);
  const clicks = spend / cpc, installs = clicks * (instConv / 100);
  const cpi = spend / installs, totalRev = installs * revPerUser;
  const roi = ((totalRev - spend) / spend) * 100;
  
  return (
    <div>
      <ToolSlider label="Ad Spend Budget" value={spend} min={500} max={100000} step={500} fmt={fc} onChange={setSpend} accent={accent} />
      <ToolSlider label="Cost per Click (CPC)" value={cpc} min={0.05} max={10} step={0.05} fmt={v => `$${v.toFixed(2)}`} onChange={setCpc} accent={accent} />
      <ToolSlider label="Install Conv. Rate" value={instConv} min={1} max={70} step={1} fmt={fp} onChange={setInstConv} accent={accent} />
      <ToolSlider label="Revenue per user (30d LTV)" value={revPerUser} min={0.5} max={50} step={0.5} fmt={v => `$${v.toFixed(2)}`} onChange={setRevPerUser} accent={accent} />
      
      <div className="mt-8 space-y-1">
        <div className="text-[0.65rem] font-bold text-blue uppercase tracking-widest mb-4">Campaign Results</div>
        <ToolRow label="Estimated Installs" value={fn(installs)} />
        <ToolRow label="Cost per Install (CPI)" value={fc(cpi)} />
        <ToolRow label="Expected Revenue" value={fc(totalRev)} />
        <ToolRow label="Campaign ROI" value={`${roi.toFixed(1)}%`} bold pos={roi > 0} neg={roi < 0} />
      </div>
    </div>
  );
}

/* Runway Calc */
function RunwayCalc({ accent = T.rose }: any) {
  const [cash, setCash] = usePersistentToolState("cash", 250000);
  const [mrr, setMrr] = usePersistentToolState("mrr", 12000);
  const [burn, setBurn] = usePersistentToolState("burn", 35000);
  const netBurn = Math.max(0, burn - mrr);
  const runway = netBurn > 0 ? (cash / netBurn).toFixed(1) : "∞";
  
  return (
    <div>
      <ToolSlider label="Cash in Bank" value={cash} min={1000} max={2000000} step={5000} fmt={fc} onChange={setCash} accent={accent} />
      <ToolSlider label="Monthly Revenue (MRR)" value={mrr} min={0} max={200000} step={1000} fmt={fc} onChange={setMrr} accent={accent} />
      <ToolSlider label="Monthly Expenses (Burn)" value={burn} min={500} max={200000} step={1000} fmt={fc} onChange={setBurn} accent={accent} />
      
      <div className="mt-8 space-y-1">
        <div className="text-[0.65rem] font-bold text-blue uppercase tracking-widest mb-4">Survival Metrics</div>
        <ToolRow label="Net Monthly Burn" value={fc(netBurn)} neg />
        <ToolRow label="Remaining Runway" value={`${runway} Months`} bold color={parseFloat(runway) < 6 ? T.neg : T.pos} />
        <ToolRow label="Break-even Gap" value={fc(netBurn)} color={T.amber} />
      </div>
    </div>
  );
}

/* Ad Revenue Calc (Mobile Ads) */
function MobileAdsCalc({ accent = T.teal }: any) {
  const [dau, setDau] = usePersistentToolState("dau", 50000);
  const [sessions, setSessions] = usePersistentToolState("sessions", 3.5);
  const [bannerCpm, setBannerCpm] = usePersistentToolState("bannerCpm", 0.80);
  const [interCpm, setInterCpm] = usePersistentToolState("interCpm", 8.50);
  const [rewardCpm, setRewardCpm] = usePersistentToolState("rewardCpm", 14.00);
  
  const totalSessions = dau * sessions;
  const bannerRev = (totalSessions * 4 * 0.85 * bannerCpm) / 1000;
  const interRev = (totalSessions * 0.3 * 0.70 * interCpm) / 1000;
  const rewardRev = (totalSessions * 0.4 * 0.60 * rewardCpm) / 1000;
  const totalDaily = bannerRev + interRev + rewardRev;

  return (
    <div>
      <ToolSlider label="Daily Active Users (DAU)" value={dau} min={1000} max={1000000} step={1000} fmt={fn} onChange={setDau} accent={accent} />
      <ToolSlider label="Sessions per User/Day" value={sessions} min={1} max={20} step={0.5} fmt={v => `${v.toFixed(1)}`} onChange={setSessions} accent={accent} />
      <ToolSlider label="Banner eCPM ($)" value={bannerCpm} min={0.1} max={5} step={0.1} fmt={v => `$${v.toFixed(2)}`} onChange={setBannerCpm} accent={accent} />
      <ToolSlider label="Interstitial eCPM ($)" value={interCpm} min={1} max={30} step={0.5} fmt={v => `$${v.toFixed(2)}`} onChange={setInterCpm} accent={accent} />
      <ToolSlider label="Rewarded Video eCPM ($)" value={rewardCpm} min={2} max={60} step={1} fmt={v => `$${v.toFixed(2)}`} onChange={setRewardCpm} accent={accent} />
      
      <div className="mt-8 space-y-1">
        <div className="text-[0.65rem] font-bold text-blue uppercase tracking-widest mb-4">Ad Revenue Breakdown (Daily)</div>
        <ToolRow label="Banner Ad Revenue" value={fc(bannerRev)} />
        <ToolRow label="Interstitial Revenue" value={fc(interRev)} />
        <ToolRow label="Rewarded Video Revenue" value={fc(rewardRev)} />
        <ToolRow label="Total Estimated Daily Rev" value={fc(totalDaily)} bold color={T.pos} />
        <ToolRow label="Estimated Monthly Ads Rev" value={fc(totalDaily * 30)} bold color={T.pos} />
        <ToolRow label="Net ARPDAU (Daily)" value={`$${(totalDaily / dau).toFixed(4)}`} color={T.blue} />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   LAUNCH & GROWTH TOOLS (FROM SNIPPET 3)
   ────────────────────────────────────────────────────────────────────────── */

/* Soft Launch Market Selector */
const MARKETS = [
  {name:"Canada",flag:"🇨🇦",tier:1,cips:{games:1.20,utility:2.10,social:1.50,health:1.80},similar:"US/UK",enSpeaking:true,risk:"low",note:"Best overall proxy for US market. Very similar behavior and monetization."},
  {name:"Australia",flag:"🇦🇺",tier:1,cips:{games:1.10,utility:1.90,social:1.40,health:1.70},similar:"US/UK",enSpeaking:true,risk:"low",note:"High LTV, English-speaking. Excellent App Store proxy. Popular choice."},
  {name:"New Zealand",flag:"🇳🇿",tier:1,cips:{games:0.90,utility:1.70,social:1.30,health:1.60},similar:"UK/AU",enSpeaking:true,risk:"low",note:"Small market, quick feedback loops. Low risk for soft launch experiments."},
  {name:"Philippines",flag:"🇵🇭",tier:2,cips:{games:0.25,utility:0.50,social:0.30,health:0.40},similar:"SEA",enSpeaking:true,risk:"medium",note:"Very low CPI, English-speaking. Great for games. Lower monetization than T1."},
  {name:"Malaysia",flag:"🇲🇾",tier:2,cips:{games:0.30,utility:0.55,social:0.35,health:0.45},similar:"SEA",enSpeaking:false,risk:"medium",note:"Mobile-first, growing middle class. Good for testing virality mechanics."},
  {name:"Mexico",flag:"🇲🇽",tier:2,cips:{games:0.40,utility:0.70,social:0.50,health:0.60},similar:"LATAM",enSpeaking:false,risk:"medium",note:"Large Spanish-speaking market. Good LATAM proxy. Growing IAP rates."},
];

/* Soft Launch Market Selector */
function SoftLaunchSelector() {
  const [cat, setCat] = usePersistentToolState("cat", "games");
  const [goal, setGoal] = usePersistentToolState("goal", "unit-econ");
  const [budget, setBudget] = usePersistentToolState("budget", "low");
  const [targetMkt, setTargetMkt] = usePersistentToolState("targetMkt", "us");

  const score = (m: any) => {
    let s = 0;
    const marketCpi = m.cips[cat] || 1;
    if (goal === "unit-econ" && m.tier === 1) s += 40;
    if (goal === "volume" && m.tier === 2) s += 40;
    if (goal === "creative" && marketCpi < 0.5) s += 30;
    if (budget === "low" && marketCpi < 0.5) s += 20;
    if (budget === "high" && m.tier === 1) s += 20;
    if (m.enSpeaking) s += 15;
    if (m.risk === "low") s += 15;
    return Math.min(100, s);
  };

  const ranked = [...MARKETS].map(m => ({ ...m, score: score(m) })).sort((a, b) => b.score - a.score);

  return (
    <div>
      <ToolSelect label="App Category" value={cat} onChange={setCat} options={[["games","🎮 Games"],["utility","⚡ Utility / Productivity"],["social","👥 Social"],["health","💪 Health & Fitness"]]}/>
      <ToolSelect label="Primary Soft Launch Goal" value={goal} onChange={setGoal} options={[["unit-econ","📊 Validate unit economics (LTV:CPI)"],["volume","📈 High-volume stress test"],["creative","🎨 Creative / UA testing at low CPI"],["retention","🔄 Retention & core loop validation"]]}/>
      <ToolSelect label="Primary Target Market" value={targetMkt} onChange={setTargetMkt} options={[["us","🇺🇸 United States"],["uk","🇬🇧 United Kingdom"],["eu","🇪🇺 European Union"],["asia","🌏 Asia-Pacific"]]}/>
      
      <div className="mt-8 space-y-4">
        <div className="text-[0.65rem] font-bold text-blue uppercase tracking-widest mb-4">Strategic Recommendations</div>
        {ranked.slice(0, 3).map((m, i) => (
          <div key={m.name} className="p-5 bg-tint/5 border border-tint/5 rounded-2xl relative overflow-hidden group">
            {i === 0 && <div className="absolute top-0 right-0 bg-blue/20 text-blue text-[0.6rem] font-black px-3 py-1 rounded-bl-xl tracking-tighter">RECOMMENDED</div>}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{m.flag}</span>
                <div>
                  <h4 className="font-display font-bold text-tint text-lg leading-tight">{m.name}</h4>
                  <div className="text-[0.65rem] text-muted font-bold tracking-widest uppercase">Tier {m.tier} · {m.similar} PROXY</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-mono font-black text-blue">{m.score}</div>
                <div className="text-[0.5rem] text-muted tracking-widest font-black uppercase">MATCH SCORE</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-tint/5 p-3 rounded-xl border border-tint/5">
                <div className="text-[0.5rem] text-mutedL font-black uppercase tracking-widest mb-1">EST. CPI ({cat})</div>
                <div className="text-lg font-mono font-black text-tint">${m.cips[cat].toFixed(2)}</div>
              </div>
              <div className="bg-tint/5 p-3 rounded-xl border border-tint/5">
                <div className="text-[0.5rem] text-mutedL font-black uppercase tracking-widest mb-1">RISK PROFILE</div>
                <div className="text-lg font-mono font-black uppercase" style={{ color: m.risk === 'low' ? T.pos : T.warn }}>{m.risk}</div>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed italic">“{m.note}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Roadmap Prioritizer (RICE) */
function RoadmapPrioritizer() {
  const [framework, setFramework] = usePersistentToolState("framework", "rice");
  const [features, setFeatures] = usePersistentToolState("features", [
    { id: 1, name: "Push notification improvements", reach: 1000, impact: 3, confidence: 80, effort: 2, must: false, should: true, could: false },
    { id: 2, name: "Social sharing feature", reach: 500, impact: 2, confidence: 60, effort: 3, must: false, should: false, could: true },
    { id: 3, name: "Offline mode", reach: 800, impact: 4, confidence: 70, effort: 5, must: false, should: true, could: false },
  ]);
  const [newFeat, setNewFeat] = usePersistentToolState("newFeat", "");

  const addFeature = () => {
    if (!newFeat.trim()) return;
    setFeatures(p => [...p, { id: Date.now(), name: newFeat, reach: 500, impact: 3, confidence: 70, effort: 3, must: false, should: true, could: false }]);
    setNewFeat("");
  };
  const remove = (id: number) => setFeatures(p => p.filter(f => f.id !== id));
  const update = (id: number, field: string, val: any) => setFeatures(p => p.map(f => f.id === id ? { ...f, [field]: val } : f));

  const riceScore = (f: any) => (f.reach * f.impact * (f.confidence / 100)) / f.effort;
  const moscowCat = (f: any) => f.must ? "Must" : f.should ? "Should" : f.could ? "Could" : "Won't";

  const sorted = framework === "rice"
    ? [...features].sort((a, b) => riceScore(b) - riceScore(a))
    : [...features];

  return (
    <div>
      <ToolPills options={[["rice", "⚡ RICE Score"], ["moscow", "📅 MoSCoW"]]} value={framework} onChange={setFramework} accent={T.blue} />
      
      <div className="flex gap-2 mb-8">
        <input 
          value={newFeat} 
          onChange={e => setNewFeat(e.target.value)} 
          onKeyDown={e => e.key === "Enter" && addFeature()} 
          placeholder="New feature idea..." 
          className="flex-1 bg-tint/5 border border-tint/10 rounded-xl px-4 py-3 text-sm text-tint focus:border-blue/50 outline-none"
        />
        <button onClick={addFeature} className="bg-blue text-white px-6 rounded-xl font-bold text-sm hover:scale-105 transition-all">Add</button>
      </div>

      <div className="space-y-4">
        {sorted.map((f, i) => (
          <div key={f.id} className="p-5 bg-tint/5 border border-tint/10 rounded-2xl">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-tint/10 flex items-center justify-center text-[0.6rem] font-black text-muted">{i + 1}</div>
                <h4 className="font-bold text-tint text-base">{f.name}</h4>
              </div>
              <div className="flex items-center gap-4">
                {framework === "rice" ? (
                  <span className="text-sm font-mono font-black text-blue">{riceScore(f).toFixed(0)} PTS</span>
                ) : (
                  <span className="text-[0.6rem] font-black uppercase px-2 py-0.5 rounded-sm bg-tint/10 text-muted">{moscowCat(f)}</span>
                )}
                <button onClick={() => remove(f.id)} className="text-muted hover:text-neg transition-colors"><X size={16} /></button>
              </div>
            </div>

            {framework === "rice" ? (
              <div className="grid grid-cols-4 gap-4">
                {[["Reach", "reach"], ["Impact", "impact"], ["Confidence", "confidence"], ["Effort", "effort"]].map(([l, field]) => (
                  <div key={field}>
                    <div className="text-[0.5rem] text-mutedL font-black uppercase tracking-widest mb-2">{l}</div>
                    <input 
                      type="number" 
                      value={f[field as keyof typeof f]} 
                      onChange={e => update(f.id, field, parseInt(e.target.value) || 0)}
                      className="w-full bg-tint/5 border border-tint/5 rounded-lg px-2 py-1 text-xs text-tint font-mono outline-none"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-2">
                {[["must", "Must"], ["should", "Should"], ["could", "Could"]].map(([field, label]) => (
                  <button 
                    key={field}
                    onClick={() => {
                      const upd = { must: false, should: false, could: false };
                      (upd as any)[field] = true;
                      Object.entries(upd).forEach(([k, v]) => update(f.id, k, v));
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-[0.6rem] font-black uppercase tracking-widest border transition-all ${
                      (f as any)[field] ? "bg-blue/20 border-blue/40 text-blue" : "bg-tint/3 border-transparent text-muted hover:border-tint/10"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STRATEGY & PLANNING (FROM SNIPPET 3)
   ────────────────────────────────────────────────────────────────────────── */

/* ══════════════════════════════════════════
   STRATEGY: APP LAUNCH CHECKLIST
══════════════════════════════════════════ */

const CHECKLIST_DATA: any = {
  "Pre-Launch": {
    color: T.slate,
    icon: "🔬",
    subtitle: "Before you write a single line of production code",
    phases: [
      {
        title: "Market & Concept Validation",
        items: [
          { id: "mv1", text: "Define target audience with specific demographics & pain points", detail: "Create at least 1 user persona. Know their age, income, apps they already use." },
          { id: "mv2", text: "Research top 10 competitors — downloads, ratings, reviews, pricing", detail: "Use AppFollow, Sensor Tower, or App Annie. Note their weaknesses in 1-star reviews." },
          { id: "mv3", text: "Validate core value proposition with 20+ potential users", detail: "User interviews, surveys, or landing page with waitlist. Do NOT skip this." },
          { id: "mv4", text: "Determine monetization model (ads, IAP, subscription, paid)", detail: "Hybrid models (IAP + ads) work well for casual games. Subscriptions for utilities." },
          { id: "mv5", text: "Define success metrics for launch (DAU, D7 retention, revenue)", detail: "SMART goals: '10K downloads in first 30 days with D7 retention ≥20%'" },
        ],
      },
      {
        title: "Product & Tech",
        items: [
          { id: "pt1", text: "Set up analytics (Firebase, Amplitude, or Mixpanel)", detail: "Instrument every screen and key action BEFORE launch. Retroactive analytics = guesswork." },
          { id: "pt2", text: "Implement crash reporting (Crashlytics, Sentry)", detail: "You need to know about crashes before your users leave 1-star reviews." },
          { id: "pt3", text: "Set up A/B testing infrastructure (Firebase Remote Config)", detail: "Plan your first 3 A/B tests: onboarding, monetization prompt, notification opt-in." },
          { id: "pt4", text: "Build onboarding flow — max 3 screens, clear value prop", detail: "Every extra onboarding screen loses ~20% of users. Be ruthless." },
          { id: "pt5", text: "Implement push notification opt-in with clear value exchange", detail: "iOS prompt timing matters. Show it after a user has a 'wow' moment, not on first open." },
          { id: "pt6", text: "Set up attribution tracking (AppsFlyer, Adjust, or Branch)", detail: "Critical if you plan any paid UA. Without attribution you can't optimize channels." },
          { id: "pt7", text: "Build review prompt using StoreKit/Play In-App Review API", detail: "Trigger after positive user action, not after 3 days of usage." },
        ],
      },
      {
        title: "App Store Presence",
        items: [
          { id: "as1", text: "Research and select primary & secondary keywords (ASO)", detail: "Use AppFollow, AppTweak, or Sensor Tower. Target medium-difficulty, high-volume keywords." },
          { id: "as2", text: "Write optimized app title (30 chars) with primary keyword", detail: "Title has highest weight in App Store search algorithm." },
          { id: "as3", text: "Write subtitle (30 chars) and description with keyword density", detail: "First 3 lines of description visible without 'more'. Make them count." },
          { id: "as4", text: "Create high-converting screenshots (test landscape vs portrait)", detail: "Screenshots drive 60%+ of install decisions. Use captions. Show the best feature first." },
          { id: "as5", text: "Produce app preview video (15-30 seconds, no sound required)", detail: "Videos auto-play in search results. Show the core loop in the first 3 seconds." },
          { id: "as6", text: "Design icon with A/B test variants ready (Google Play supports this)", detail: "Your icon competes in a sea of results. Test bold color vs complex art." },
          { id: "as7", text: "Localize store listing for at least English UK, AU alongside US", detail: "Same effort, immediate access to 50M+ English speakers with different spelling expectations." },
        ],
      },
    ],
  },
  "Soft Launch": {
    color: T.amber,
    icon: "🌱",
    subtitle: "Test in limited markets before full investment in UA",
    phases: [
      {
        title: "Market Selection",
        items: [
          { id: "sl1", text: "Select 2-3 soft launch markets (CA, AU, NZ recommended)", detail: "Similar to US/UK but smaller. A bad launch here won't hurt your global rankings." },
          { id: "sl2", text: "Avoid soft launching in your primary target market", detail: "A botched launch can tank your keyword rankings and review score permanently." },
          { id: "sl4", text: "Set up geo-targeted UA campaigns with small budgets ($500-2K)", detail: "Test at least 3 channels: Meta, Google UAC, and one network-specific to your category." },
        ],
      },
      {
        title: "Metric Benchmarks",
        items: [
          { id: "cm1", text: "D1 Retention ≥ 30% (casual) / ≥ 50% (utility)", detail: "This is the single most important metric. A low D1 makes everything else irrelevant." },
          { id: "cm2", text: "D7 Retention ≥ 12% (casual) / ≥ 30% (utility)", detail: "If D7 is <10%, you have a retention problem that no UA budget can fix." },
          { id: "cm4", text: "Store CVR ≥ 25% from search impressions to installs", detail: "Below 20% means your icon, screenshots, or first reviews are underperforming." },
          { id: "cm5", text: "LTV > CPI with ≥ 30% margin", detail: "You need headroom for UA cost volatility. 1.5:1 is breakeven. 3:1 is scalable." },
        ],
      },
    ],
  },
  "Global Launch": {
    color: T.forest,
    icon: "🚀",
    subtitle: "Go wide — scale, visibility, and Day 1 chart positioning",
    phases: [
      {
        title: "Launch Day Execution",
        items: [
          { id: "gl1", text: "Submit app 7-10 days early for App Review to avoid delays", detail: "Average review time is 1-3 days but can spike. Never plan a specific launch date without buffer." },
          { id: "gl2", text: "Coordinate launch date with PR, influencers, and UA ramp-up", detail: "A concentrated burst of downloads on Day 1 improves chart visibility." },
          { id: "gl5", text: "Set up real-time monitoring dashboard (Crashlytics + Analytics)", detail: "Assign someone to watch it for the first 72 hours. Be ready to hotfix." },
        ],
      },
      {
        title: "PR & Visibility",
        items: [
          { id: "pr1", text: "Submit for Apple editorial review 6-8 weeks before launch", detail: "Apply early at appstore.apple.com/editorial." },
          { id: "pr3", text: "Identify 10-20 micro-influencers in your category", detail: "Micro (10K-100K followers) have better engagement rates than mega-influencers." },
        ],
      },
    ],
  },
};

function AppLaunchChecklist() {
  const [activePhase, setActivePhase] = usePersistentToolState("activePhase", "Pre-Launch");
  const [checked, setChecked] = usePersistentToolState("checked", {});
  const [expanded, setExpanded] = usePersistentToolState("expanded", {});

  const toggle = (id: string) => setChecked((prev: any) => ({ ...prev, [id]: !prev[id] }));
  const toggleExpand = (id: string) => setExpanded((prev: any) => ({ ...prev, [id]: !prev[id] }));

  const phaseData = CHECKLIST_DATA[activePhase];
  const allItems = phaseData.phases.flatMap((p: any) => p.items);
  const doneCount = allItems.filter((i: any) => checked[i.id]).length;
  const totalCount = allItems.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div>
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {Object.entries(CHECKLIST_DATA).map(([phase, data]: any) => {
          const items = data.phases.flatMap((p: any) => p.items);
          const done = items.filter((i: any) => checked[i.id]).length;
          const active = activePhase === phase;
          return (
            <button key={phase} onClick={() => setActivePhase(phase)} className={`flex-1 min-w-[140px] p-4 rounded-2xl border transition-all ${
              active ? "bg-tint/10 border-tint/20" : "bg-tint/3 border-transparent"
            }`} style={{ borderColor: active ? data.color : 'transparent' }}>
              <div className="text-xl mb-2">{data.icon}</div>
              <div className={`text-xs font-black uppercase tracking-widest ${active ? 'text-tint' : 'text-muted'}`}>{phase}</div>
              <div className="text-[0.6rem] text-mutedL mt-1 font-mono uppercase">{done}/{items.length} Tasks</div>
            </button>
          );
        })}
      </div>

      <div className="mb-10 p-8 rounded-3xl bg-tint/3 border border-tint/5 relative overflow-hidden" style={{ borderLeft: `6px solid ${phaseData.color}` }}>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-display font-black text-tint leading-tight">{activePhase}</h3>
              <p className="text-muted text-sm mt-1">{phaseData.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-display font-black text-tint" style={{ color: phaseData.color }}>{pct}%</div>
              <div className="text-[0.6rem] text-mutedL font-black uppercase tracking-widest">Phase progress</div>
            </div>
          </div>
          <div className="h-2 bg-tint/5 rounded-full overflow-hidden">
            <div className="h-full transition-all duration-700 ease-out" style={{ width: `${pct}%`, backgroundColor: phaseData.color }} />
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {phaseData.phases.map((section: any, si: number) => (
          <div key={si}>
            <div className="text-[0.65rem] font-black text-mutedL uppercase tracking-[0.2em] mb-6 pb-2 border-b border-tint/5 flex justify-between items-center">
              <span>{section.title}</span>
              <span className="font-mono text-blue">{section.items.filter((i: any) => checked[i.id]).length}/{section.items.length}</span>
            </div>

            <div className="space-y-3">
              {section.items.map((item: any) => {
                const done = !!checked[item.id];
                const isExpanded = !!expanded[item.id];
                return (
                  <div key={item.id} className={`rounded-2xl border transition-all ${
                    done ? "bg-pos/5 border-pos/20 opacity-60" : "bg-tint/3 border-tint/5 hover:border-tint/10"
                  }`}>
                    <div className="flex items-start gap-4 p-5 cursor-pointer" onClick={() => toggle(item.id)}>
                      <div className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        done ? "bg-pos border-pos text-tint" : "border-tint/20 text-transparent"
                      }`}>
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-bold leading-tight ${done ? "text-muted line-through" : "text-tint"}`}>{item.text}</div>
                        {isExpanded && <div className="text-xs text-muted leading-relaxed mt-4 pt-4 border-t border-tint/5 italic">💡 {item.detail}</div>}
                      </div>
                      <button onClick={e => { e.stopPropagation(); toggleExpand(item.id); }} className="text-muted hover:text-tint transition-colors">
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   STRATEGY: KPI DASHBOARD TEMPLATE
══════════════════════════════════════════ */

const KPI_STAGES: any = {
  "Early Traction": {
    color: T.slate, icon: "🔬", range: "0→1K DAU",
    tagline: "Prove the core loop works. Nothing else matters yet.",
    categories: [
      {
        name: "Retention",
        kpis: [
          { name: "Day 1 Retention", target: "≥ 30%", why: "Predictive of long-term success. <25% means core loop is broken." },
          { name: "Day 7 Retention", target: "≥ 12%", why: "Validates recurring value. <8% = no habit formation." },
        ]
      },
      {
        name: "Tech Health",
        kpis: [
          { name: "Crash-Free Sessions", target: "≥ 99.5%", why: "At this stage, a crash = a permanent lost user." },
          { name: "Cold Start Time", target: "< 3s", why: "Every extra second loses ~20% of new users on first open." },
        ]
      }
    ]
  },
  "Growth Phase": {
    color: T.amber, icon: "📈", range: "1K→100K DAU",
    tagline: "Prove unit economics and scalable acquisition.",
    categories: [
      {
        name: "Unit Economics",
        kpis: [
          { name: "LTV : CPI Ratio", target: "≥ 3:1", why: "Minimum 2:1 to scale. Below that, every install loses money." },
          { name: "Payback Period", target: "≤ 60 days", why: "Cash flow efficiency. Aim for <30 days if bootstrapping." },
        ]
      },
      {
        name: "Monetization",
        kpis: [
          { name: "IAP Conversion", target: "2–5%", why: "Lower suggests wrong audience or poor prompt timing." },
          { name: "ARPDAU", target: "$0.05+", why: "Benchmarked for hybrid casual. Tier 1 markets." },
        ]
      }
    ]
  }
};

function KPIDashboard() {
  const [activeStage, setActiveStage] = usePersistentToolState("activeStage", "Early Traction");
  const stage = KPI_STAGES[activeStage];

  return (
    <div>
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {Object.entries(KPI_STAGES).map(([name, data]: any) => (
          <button 
            key={name} 
            onClick={() => setActiveStage(name)}
            className={`flex-1 min-w-[160px] p-6 rounded-2xl border transition-all text-left ${activeStage === name ? "bg-tint/10 border-tint/20 shadow-xl" : "bg-tint/3 border-transparent"}`}
            style={{ borderBottomColor: activeStage === name ? data.color : 'transparent' }}
          >
            <div className="text-2xl mb-4">{data.icon}</div>
            <div className="text-[0.6rem] text-mutedL font-black uppercase tracking-widest mb-1">{data.range}</div>
            <div className={`text-base font-bold ${activeStage === name ? "text-tint" : "text-muted"}`}>{name}</div>
          </button>
        ))}
      </div>

      <div className="mb-12 p-8 rounded-3xl bg-blue/5 border border-blue/20">
        <h4 className="text-xl font-bold text-tint mb-2">{activeStage} Context</h4>
        <p className="text-muted text-sm leading-relaxed italic">“{stage.tagline}”</p>
      </div>

      <div className="space-y-12">
        {stage.categories.map((cat: any) => (
          <div key={cat.name}>
            <div className="text-[0.6rem] font-black text-mutedL uppercase tracking-[0.2em] mb-6 pb-2 border-b border-tint/5">{cat.name}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.kpis.map((kpi: any) => (
                <div key={kpi.name} className="p-6 rounded-2xl bg-tint/3 border border-tint/5 flex flex-col justify-between">
                  <div>
                    <h5 className="text-sm font-bold text-tint mb-2">{kpi.name}</h5>
                    <div className="text-2xl font-mono font-black text-blue mb-4">{kpi.target}</div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed pt-4 border-t border-tint/5">{kpi.why}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BUSINESS: FUNDING READINESS SCORE
══════════════════════════════════════════ */

const FUNDING_CRITERIA: any[] = [
  { id: "mrr", label: "MRR", weight: 20, unit: "$", score: (v: any) => v >= 50000 ? 5 : v >= 20000 ? 4 : v >= 5000 ? 3 : 1 },
  { id: "growth", label: "Growth MoM", weight: 20, unit: "%", score: (v: any) => v >= 20 ? 5 : v >= 10 ? 4 : v >= 5 ? 3 : 1 },
  { id: "ltv", label: "LTV:CAC", weight: 20, unit: "x", score: (v: any) => v >= 4 ? 5 : v >= 3 ? 4 : v >= 2 ? 3 : 1 },
  { id: "ret", label: "D30 Retention", weight: 20, unit: "%", score: (v: any) => v >= 20 ? 5 : v >= 12 ? 4 : v >= 8 ? 3 : 1 },
  { id: "runway", label: "Runway (mo)", weight: 20, unit: "", score: (v: any) => v >= 18 ? 5 : v >= 12 ? 4 : v >= 6 ? 3 : 1 }
];

function FundingReadiness() {
  const [vals, setVals] = usePersistentToolState("vals", {});
  const total = FUNDING_CRITERIA.reduce((sum, c) => {
    const v = vals[c.id];
    if (!v) return sum;
    return sum + (c.score(v) / 5) * c.weight;
  }, 0);

  const level = total >= 85 ? { l: "Series A Ready", c: T.forest, e: "🚀" } : total >= 65 ? { l: "Seed Ready", c: T.teal, e: "🌱" } : { l: "Pre-Seed / Angel", c: T.amber, e: "🔬" };

  return (
    <div className="space-y-8">
      <div className="p-10 rounded-3xl bg-tint/3 border border-tint/10 text-center relative overflow-hidden">
        <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: `${level.c}08` }} />
        <div className="text-4xl mb-4">{level.e}</div>
        <div className="text-5xl font-display font-black mb-2" style={{ color: level.c }}>{total.toFixed(0)}</div>
        <div className="text-[0.65rem] text-mutedL font-black uppercase tracking-[0.2em] mb-8">Investability Score</div>
        <div className="inline-block py-2 px-6 rounded-full font-black text-xs uppercase tracking-widest text-tint" style={{ background: level.c }}>{level.l}</div>
      </div>

      <div className="space-y-6">
        {FUNDING_CRITERIA.map(c => (
          <div key={c.id}>
            <div className="flex justify-between items-baseline mb-4">
              <label className="text-[0.6rem] font-black text-muted uppercase tracking-widest">{c.label}</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={vals[c.id] || ""} 
                  onChange={e => setVals({ ...vals, [c.id]: +e.target.value })} 
                  className="w-24 bg-tint/5 border border-tint/10 rounded-lg px-3 py-1.5 text-sm font-mono text-tint text-right focus:border-blue/50 outline-none"
                />
                <span className="text-xs text-muted font-bold w-4">{c.unit}</span>
              </div>
            </div>
            <div className="h-1 bg-tint/5 rounded-full overflow-hidden">
              <div className="h-full transition-all duration-500" style={{ width: `${(vals[c.id] ? c.score(vals[c.id]) : 0) * 20}%`, backgroundColor: T.blue }} />
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-tint/3 rounded-2xl border border-tint/5">
        <p className="text-xs text-muted leading-relaxed">
          <Sparkles size={14} className="inline mr-2 text-amber" />
          Investors usually look for a score above 70 for competitive seed rounds. If you are below 50, focus on either <strong>retention</strong> or <strong>unit economics</strong> before pitching.
        </p>
      </div>
    </div>
  );
}


/* Go-to-Market Builder */
function GTMBuilder() {
  const [category, setCategory] = usePersistentToolState("category", "games");
  const [monet, setMonet] = usePersistentToolState("monet", "iap");
  const [target, setTarget] = usePersistentToolState("target", "global");
  const [budget, setBudget] = usePersistentToolState("budget", "bootstrap");
  const [generated, setGenerated] = usePersistentToolState("generated", false);

  const PHASES = [
    { phase: "Pre-Launch", weeks: "8–12 weeks before", color: T.slate, actions: [
      category === "games" ? "Build a community on TikTok or Discord showing updates" : "Start SEO to capture demand before launch",
      "Submit for App Store editorial review (6-8 week lead time)",
      monet === "subscription" ? "Set up a landing page with free trial offer" : "Build waitlist on Product Hunt",
      "Identify 10-20 micro-influencers in your category",
      budget !== "bootstrap" ? "Run test campaigns ($200-500) for CPI baselines" : "Focus on ASO and organic community waitlist"
    ]},
    { phase: "Launch Week", weeks: "Day 0–7", color: T.amber, actions: [
      "Coordinate PR embargo lift with media contacts",
      "Email your waitlist users first — warm users drive ratings",
      "Post authentically on Reddit r/" + category,
      budget !== "bootstrap" ? "Ramp UA budget 50% daily once data is clear" : "Focus on social sharing and WOM",
      "Monitor Crashlytics hourly. Have hotfix ready to deploy"
    ]},
    { phase: "Weeks 2–4", weeks: "First month", color: T.forest, actions: [
      "Analyze D7 retention cohort — investigate any regression",
      budget !== "bootstrap" ? "Scale winning UA channels. Kill underperforming ones" : "Identify organic growth loops",
      monet === "subscription" ? "Optimize trial→paid conversion prompt timing" : "Run your first monetization A/B test",
      "Respond to every App Store review to show you care",
      "Plan first feature update for Day 30"
    ]},
    { phase: "Month 2–3", weeks: "Scale phase", color: T.teal, actions: [
      "Establish weekly cadence for metric reviews",
      "File for Apple Small Business Program (saves 15% commission)",
      target === "global" ? "Launch localization into top non-English markets" : "Double down on primary market features",
      budget !== "bootstrap" ? "Expand to 3rd UA channel" : "Begin strategic partnerships and cross-promotions",
      "Set up retargeting for lapsed D7 users"
    ]}
  ];

  if (generated) return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-tint">Your GTM Roadmap</h3>
        <button onClick={() => setGenerated(false)} className="text-xs text-blue font-bold uppercase tracking-widest">Edit Inputs</button>
      </div>
      {PHASES.map((p, i) => (
        <div key={i} className="space-y-4">
          <div className="flex items-center gap-3 pb-2 border-b border-tint/10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-tint" style={{ backgroundColor: p.color }}>{i + 1}</div>
            <div>
              <div className="text-sm font-bold text-tint">{p.phase}</div>
              <div className="text-[0.6rem] text-muted font-bold uppercase tracking-widest">{p.weeks}</div>
            </div>
          </div>
          <div className="space-y-3">
            {p.actions.map((a, ai) => (
              <div key={ai} className="flex gap-3 text-xs text-inkM leading-relaxed">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: p.color }} />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <CopyButton text={PHASES.map(p => `## ${p.phase}\n${p.actions.map(a => `• ${a}`).join("\n")}`).join("\n\n")} />
    </div>
  );

  return (
    <div className="space-y-4">
      <ToolSelect label="App Category" value={category} onChange={setCategory} options={[["games","🎮 Games"],["utility","⚡ Utility"],["social","👥 Social"],["health","💪 Health"]]}/>
      <ToolSelect label="Monetization" value={monet} onChange={setMonet} options={[["iap","💰 IAP"],["subscription","🔄 Subscription"],["ads","📢 Ads"]]}/>
      <ToolSelect label="Primary Target" value={target} onChange={setTarget} options={[["global","🌍 Global"],["us","🇺🇸 US First"],["eu","🇪🇺 Europe First"]]}/>
      <ToolSelect label="UA Budget" value={budget} onChange={setBudget} options={[["bootstrap","🌱 Bootstrap"],["small","💵 Small ($1K-10K)"],["mid","💰 Mid ($10K+)"]]}/>
      <button onClick={() => setGenerated(true)} className="w-full py-4 bg-blue rounded-2xl text-sm font-black text-white hover:scale-[1.02] transition-all">GENERATE GTM PLAN →</button>
    </div>
  );
}

/* Subscription Pricing Designer */
function SubPricingDesigner() {
  const [monthlyPrice, setMonthlyPrice] = usePersistentToolState("monthlyPrice", 9.99);
  const [annualPrice, setAnnualPrice] = usePersistentToolState("annualPrice", 59.99);
  const [highlight, setHighlight] = usePersistentToolState("highlight", "annual");
  const [trialDays, setTrialDays] = usePersistentToolState("trialDays", 7);

  const annualMonthly = (annualPrice / 12).toFixed(2);
  const savings = Math.round((1 - (annualPrice / 12) / monthlyPrice) * 100);

  return (
    <div className="space-y-6">
      <ToolSlider label="Monthly Price ($)" value={monthlyPrice} min={0.99} max={99.99} step={1} fmt={v => `$${v.toFixed(2)}`} onChange={setMonthlyPrice} accent={T.blue} />
      <ToolSlider label="Annual Price ($)" value={annualPrice} min={9.99} max={499.99} step={5} fmt={v => `$${v.toFixed(2)}`} onChange={setAnnualPrice} accent={T.amber} />
      <ToolSlider label="Trial Length (Days)" value={trialDays} min={0} max={30} step={1} fmt={v => `${v} Days`} onChange={setTrialDays} accent={T.pos} />
      
      <SLabel>Interactive Preview</SLabel>
      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => setHighlight("monthly")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${highlight === "monthly" ? "bg-tint/10 border-blue" : "bg-tint/5 border-tint/5 opacity-60"}`}
        >
          <div className="text-[0.6rem] font-bold text-muted uppercase tracking-widest mb-1">Monthly</div>
          <div className="text-xl font-black text-tint">${monthlyPrice.toFixed(2)}</div>
          <div className="text-[0.6rem] text-mutedL mt-1">per month</div>
        </div>
        <div 
          onClick={() => setHighlight("annual")}
          className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${highlight === "annual" ? "bg-tint/10 border-amber" : "bg-tint/5 border-tint/5 opacity-60"}`}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber text-tint text-[0.55rem] font-black px-2 py-0.5 rounded-full whitespace-nowrap">SAVE {savings}%</div>
          <div className="text-[0.6rem] font-bold text-muted uppercase tracking-widest mb-1">Annual</div>
          <div className="text-xl font-black text-tint">${annualMonthly}</div>
          <div className="text-[0.6rem] text-mutedL mt-1">${annualPrice.toFixed(2)} / year</div>
        </div>
      </div>

      <div className="bg-tint/5 border border-tint/5 rounded-2xl p-5 space-y-3">
        <div className="text-xs font-bold text-tint flex items-center gap-2">
          <Sparkles size={14} className="text-amber" /> Conversion Tactic
        </div>
        <p className="text-[0.7rem] text-muted leading-relaxed italic">
          "Frame the annual plan as the default. Showing it at ${annualMonthly}/mo makes the ${monthlyPrice.toFixed(2)} monthly option look expensive by comparison. Consider a {trialDays}-day trial to reduce risk."
        </p>
      </div>
    </div>
  );
}

/* Free Trial Strategy */
function FreeTrialStrategy() {
  const [d1, setD1] = usePersistentToolState("d1", 35);
  const [d7, setD7] = usePersistentToolState("d7", 18);
  const [monet, setMonet] = usePersistentToolState("monet", "subscription");

  const d7Drop = d7 / d1;
  const optimalTrial = d7Drop > 0.6 ? 14 : d7Drop > 0.45 ? 7 : 3;
  const triggerDay = d1 > 35 ? 1 : 0;

  return (
    <div className="space-y-6">
      <ToolSlider label="D1 Retention %" value={d1} min={10} max={80} fmt={fp} onChange={setD1} accent={T.blue} />
      <ToolSlider label="D7 Retention %" value={d7} min={2} max={50} fmt={fp} onChange={setD7} accent={T.blue} />
      <ToolSelect label="Monetization" value={monet} onChange={setMonet} options={[["subscription","🔄 Subscription"],["iap","💰 One-time IAP"]]} />

      <SLabel>Optimal Strategy</SLabel>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-tint/5 p-4 rounded-xl border border-tint/5">
          <div className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-1">Trial Length</div>
          <div className="text-xl font-black text-blue">{optimalTrial} Days</div>
        </div>
        <div className="bg-tint/5 p-4 rounded-xl border border-tint/5">
          <div className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-1">Trigger Day</div>
          <div className="text-xl font-black text-amber">Day {triggerDay}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[0.65rem] font-bold text-muted uppercase tracking-widest">Logic Breakdown</div>
        <div className="text-xs text-inkM space-y-3">
          <p>• {d7Drop > 0.5 ? "Strong mid-term stickiness allows for a shorter trial to convert high-intent users." : "Lower stickiness requires a longer trial (14d) to establish the habit loop."}</p>
          <p>• {triggerDay === 0 ? "Show paywall on first open (hard wall) to maximize T0 conversion." : "Wait until first successful action (Day 1) to build trust before asking for payment."}</p>
        </div>
      </div>
    </div>
  );
}

/* IAP Store Layout Planner */
function IAPStorePlanner() {
  const [type, setType] = usePersistentToolState("type", "games");
  
  const LAYOUTS: any = {
    games: [
      { slot: "Hero / Banner", purpose: "Limited-time offer with countdown. 20-40% CTR.", tip: "Refresh every 48h to prevent fatigue." },
      { slot: "Starter Pack", purpose: "One-time $0.99-$2.99 offer. 3-5% conversion.", tip: "Scarcity increases action dramatically." },
      { slot: "Best Value Bundle", purpose: "Anchor item at $19.99. Use as visual benchmark.", tip: "Add 'Most Popular' badge for validation." },
      { slot: "Regular Packs", purpose: "Core recurring items for consistent whales.", tip: "Show cost-per-unit for efficiency anchoring." }
    ],
    utility: [
      { slot: "Free Trial Hero", purpose: "Highest-value acquisition message.", tip: "Place at top. 7-day trials are standard." },
      { slot: "Comparison Table", purpose: "Free vs Pro feature contrast.", tip: "Make free feel intentionally limited." },
      { slot: "Annual Plan", purpose: "Highest LTV conversion target.", tip: "Show monthly equivalent price for anchoring." },
      { slot: "Monthly Plan", purpose: "Safe, low-commitment alternative.", tip: "Its job is to make annual look cheap." }
    ]
  };

  return (
    <div className="space-y-6">
      <ToolPills options={[["games","🎮 Games / IAP"],["utility","⚡ Subscription Apps"]]} value={type} onChange={setType} accent={T.amber} />
      <SLabel>Optimal Store Layout (Top to Bottom)</SLabel>
      <div className="space-y-4">
        {LAYOUTS[type].map((s: any, i: number) => (
          <div key={i} className="flex gap-4 p-4 border-b border-tint/5 last:border-0">
            <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center font-black text-amber text-xs shrink-0">{i + 1}</div>
            <div>
              <div className="text-sm font-bold text-tint mb-1">{s.slot}</div>
              <div className="text-[0.7rem] text-muted mb-2">{s.purpose}</div>
              <div className="text-[0.65rem] text-amber italic font-medium">💡 Tip: {s.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Creative Brief Template */
function CreativeBriefTool() {
  const [format, setFormat] = usePersistentToolState("format", "interstitial");
  const [style, setStyle] = usePersistentToolState("style", "ugc");
  const [generated, setGenerated] = usePersistentToolState("generated", false);

  const FORMATS: any = {
    interstitial: { dims: "1080×1920", dur: "15-30s", hook: "First 3 seconds" },
    banner: { dims: "320×50", dur: "Static", hook: "Instant visual" },
    rewarded: { dims: "1280×720", dur: "30s (unskippable)", hook: "Zero second value" }
  };

  const brief = `CREATIVE BRIEF: ${format.toUpperCase()} AD\nFormat: ${FORMATS[format].dims} / ${FORMATS[format].dur}\nStyle: ${style.toUpperCase()}\n\nHook window: ${FORMATS[format].hook}\n\n[USER ACTION: Define your target audience and core problem here. Explain why your app is the hero and provide a clear CTA.]`;

  if (generated) return (
    <div className="space-y-6">
      <div className="p-6 bg-tint/5 border border-tint/10 rounded-2xl">
        <div className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-4">Brief Metadata</div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <ToolRow label="Format" value={format.toUpperCase()} />
          <ToolRow label="Dimensions" value={FORMATS[format].dims} />
        </div>
        <textarea 
          readOnly 
          value={brief}
          className="w-full h-48 bg-transparent text-xs text-muted leading-relaxed font-mono outline-none resize-none"
        />
      </div>
      <div className="flex gap-3">
        <button onClick={() => setGenerated(false)} className="flex-1 py-3 bg-tint/5 border border-tint/10 rounded-xl text-xs font-bold text-muted">Edit</button>
        <CopyButton text={brief} />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <ToolSelect label="Ad Format" value={format} onChange={setFormat} options={[["interstitial","📱 Interstitial"],["banner","📏 Banner"],["rewarded","🎁 Rewarded Video"]]} />
      <ToolSelect label="Creative Style" value={style} onChange={setStyle} options={[["ugc","📸 UGC Authentic"],["gameplay","🎮 Raw Gameplay"],["cinematic","🎥 Cinematic"]]}/>
      <div className="bg-tint/5 p-5 rounded-2xl border border-tint/5 text-[0.7rem] text-muted leading-relaxed">
        <strong>Format Specs:</strong> {FORMATS[format].dims} · {FORMATS[format].dur} duration recommended for best conversion. Hook window: {FORMATS[format].hook}.
      </div>
      <button onClick={() => setGenerated(true)} className="w-full py-4 bg-blue rounded-2xl text-sm font-black text-white">GENERATE BRIEF →</button>
    </div>
  );
}

/* ASO Audit Checklist */
function ASOAudit() {
  const [scores, setScores] = usePersistentToolState("scores", {});
  
  const AUDIT = [
    { id: "title", label: "App Title Optimization", points: 15, hint: "Primary keyword included naturally. Uses all 30 characters without keyword stuffing." },
    { id: "subtitle", label: "Subtitle Strategy", points: 10, hint: "Unique value proposition. Contains strong secondary keywords. Uses 30 characters." },
    { id: "icon", label: "Icon Clarity & Contrast", points: 15, hint: "Extremely scalable (looks good at 32x32px). Contrasts against dominant competitor colors." },
    { id: "screenshot1", label: "Hero Screenshot (1st Image)", points: 20, hint: "Clear hook, large caption text, focuses on the core user benefit (not just a pure UI shot)." },
    { id: "screenshot_flow", label: "Screenshot Storyline", points: 10, hint: "Screenshots 2-5 tell a cohesive story. Includes social proof and highlights specific features." },
    { id: "reviews", label: "Rating & Velocity", points: 15, hint: "4.2+ Average rating. Recent positive velocity. Developer responds to critical reviews." },
    { id: "promo", label: "Promo Video / Preview", points: 15, hint: "High-action first 3 seconds to stop the scroll. Shows actual app experience clearly." }
  ];

  const total = AUDIT.reduce((s, a) => s + a.points, 0);
  const current = AUDIT.reduce((s, a) => s + (scores[a.id] ? a.points : 0), 0);
  const grade = current >= 85 ? "A" : current >= 70 ? "B" : current >= 50 ? "C" : "D";

  return (
    <div className="space-y-6">
      <div className="p-6 bg-tint/5 border border-tint/10 rounded-3xl flex items-center justify-between">
        <div>
          <div className="text-[0.65rem] font-bold text-muted uppercase tracking-widest mb-1">ASO Grade</div>
          <div className="text-3xl font-black" style={{ color: grade === "A" ? T.pos : grade === "B" ? T.blue : grade === "C" ? T.amber : T.neg }}>{grade}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-black text-tint">{current}/{total}</div>
          <div className="text-[0.6rem] text-muted font-bold uppercase tracking-widest">Composite Score</div>
        </div>
      </div>

      <div className="space-y-3">
        {AUDIT.map(item => (
          <div 
            key={item.id} 
            onClick={() => setScores((p: any) => ({ ...p, [item.id]: !p[item.id] }))}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${scores[item.id] ? "bg-pos/5 border-pos/30" : "bg-tint/3 border-tint/5 group hover:bg-tint/10"}`}
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${scores[item.id] ? "bg-pos border-pos text-tint" : "border-tint/20 text-transparent group-hover:border-tint/40"}`}>
              <CheckCircle2 size={12} />
            </div>
            <div className="flex-1">
              <div className={`text-xs font-bold mb-1 transition-colors ${scores[item.id] ? "text-pos" : "text-tint"}`}>{item.label}</div>
              <div className="text-[0.65rem] text-muted leading-relaxed pr-4">{item.hint}</div>
            </div>
            <div className={`text-[0.65rem] font-black ${scores[item.id] ? "text-pos" : "text-muted"}`}>+{item.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Incident Response Playbook */
function IncidentPlaybook() {
  const [type, setType] = usePersistentToolState("type", "crash");
  const [checked, setChecked] = usePersistentToolState("checked", {});

  const PLAYBOOK: any = {
    crash: [
      { id: "c1", phase: "0-15m", text: "Identify the crash rate spike in Crashlytics and determine affected OS/device matrix." },
      { id: "c2", phase: "15-60m", text: "Isolate the offending commit. Build and verify a hotfix locally." },
      { id: "c3", phase: "1-2 Hours", text: "Submit hotfix to App Review and request an Expedited Review via contact form." },
      { id: "c4", phase: "1-24h", text: "Pause all active UA campaigns to prevent burning cash on broken users." },
      { id: "c5", phase: "Post-Mortem", text: "Reply to all 1-star reviews asking them to update to the hotfix version." }
    ],
    rejection: [
      { id: "r1", phase: "Immediate", text: "Acknowledge the rejection and map it to the exact App Review Guideline number." },
      { id: "r2", phase: "Analysis", text: "Determine if it's a metadata issue (fast fix) or a binary/logic issue (slow fix)." },
      { id: "r3", phase: "Response", text: "Reply politely in Resolution Center with clarification if you believe the reviewer misunderstood the logic." },
      { id: "r4", phase: "Prevention", text: "Update your internal pre-submission QA checklist to explicitly cover this guideline." }
    ],
    revdrop: [
      { id: "d1", phase: "Immediate", text: "Verify analytics ingestion pipeline. Is the data broken or is revenue actually down?" },
      { id: "d2", phase: "Audit", text: "Check payment gateway status (Stripe/RevenueCat) and ensure store servers aren't down." },
      { id: "d3", phase: "Triage", text: "Examine DAU vs Conversion. Did traffic drop (UA issue) or did conversion drop (Product issue)?" },
      { id: "d4", phase: "Resolution", text: "Roll back any recent paywall or pricing changes to establish baseline." }
    ]
  };

  const toggle = (id: string) => setChecked((p: any) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="space-y-6">
      <ToolSelect label="Incident Type" value={type} onChange={setType} options={[["crash","💥 Critical Crash Spike"],["rejection","🚫 App Store Rejection"],["revdrop","📉 Unexplained Revenue Drop"]]} />
      
      <div className="space-y-4">
        {PLAYBOOK[type]?.map((item: any) => (
          <div key={item.id} onClick={() => toggle(item.id)} className={`p-4 rounded-xl border flex gap-4 cursor-pointer transition-all ${checked[item.id] ? "bg-tint/5 border-tint/10 opacity-50" : "bg-red-500/5 border-rose/30 hover:bg-rose/10"}`}>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${checked[item.id] ? "bg-tint/20 border-transparent text-tint" : "border-rose/50 text-transparent"}`}>
              <CheckCircle2 size={12} />
            </div>
            <div>
              <div className={`text-[0.6rem] font-bold uppercase tracking-widest mb-1.5 ${checked[item.id] ? "text-muted" : "text-rose"}`}>{item.phase}</div>
              <div className={`text-xs font-bold leading-relaxed ${checked[item.id] ? "text-muted line-through" : "text-tint"}`}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Sprint Planning Template */
function SprintPlanning() {
  const [goal, setGoal] = usePersistentToolState("goal", "");
  const [points, setPoints] = usePersistentToolState("points", 25);

  return (
    <div className="space-y-6">
      <ToolInput label="Sprint Goal (One Sentence)" value={goal} onChange={setGoal} placeholder="e.g. Optimize D1 habit loop." />
      <ToolSlider label="Team Velocity (Points)" value={points} min={5} max={100} fmt={v => v} onChange={setPoints} accent={T.teal} />
      
      <div className="bg-tint/5 border border-tint/5 rounded-2xl p-6 space-y-4">
        <SLabel>Recommended Allocation</SLabel>
        <div className="space-y-4">
          {[["New Features", 50, T.blue], ["Bugs / Stability", 25, T.rose], ["Tech Debt", 15, T.slate], ["Research", 10, T.amber]].map(([l, v, c]: any) => (
            <div key={l}>
              <div className="flex justify-between text-[0.65rem] font-bold text-muted uppercase tracking-widest mb-2">
                <span>{l}</span>
                <span style={{ color: c }}>{Math.round(points * (v / 100))} Points ({v}%)</span>
              </div>
              <div className="h-1 bg-tint/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${v}%`, backgroundColor: c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Tool Stack Recommender */
function ToolStackRecommender() {
  const [stage, setStage] = usePersistentToolState("stage", "launch");
  const [budget, setBudget] = usePersistentToolState("budget", "bootstrap");

  const STACK: any = {
    launch: {
      bootstrap: [
        { name: "Firebase Analytics", desc: "Free basic event tracking limitlessly." },
        { name: "RevenueCat (Free)", desc: "Manage IAPs without building backend infra." },
        { name: "Crashlytics", desc: "Absolute must-have for stability monitoring." },
        { name: "PostHog (OSS)", desc: "Free open-source product analytics." }
      ],
      funded: [
        { name: "Amplitude", desc: "Advanced behavioral analytics (Startup tier)." },
        { name: "AppsFlyer", desc: "Paid attribution for paid UA campaigns." },
        { name: "Intercom", desc: "Premium in-app user onboarding & support." },
        { name: "Qonversion", desc: "Robust subscription data infrastructure." }
      ]
    },
    growth: {
      bootstrap: [
        { name: "Mixpanel", desc: "Deep cohort analysis (generous free tier)." },
        { name: "AppFollow", desc: "Free ASO tracking and review replies." },
        { name: "OneSignal", desc: "Free unlimited push notifications." },
        { name: "Metabase", desc: "Self-hosted free dashboarding." }
      ],
      funded: [
        { name: "Segment", desc: "CDP to pipe data everywhere." },
        { name: "Adjust", desc: "Enterprise mobile measurement partner (MMP)." },
        { name: "Braze", desc: "World-class omnichannel lifecycle marketing." },
        { name: "Tableau", desc: "Advanced BI for the growth team." }
      ]
    },
    scale: {
      bootstrap: [
        { name: "Supabase", desc: "Scalable open-source backend." },
        { name: "Redash", desc: "Open-source data visualization." },
        { name: "Sentry", desc: "Advanced cross-platform error tracking." },
        { name: "Airbyte", desc: "OSS ELT pipeline sync." }
      ],
      funded: [
        { name: "Snowflake", desc: "Enterprise cloud data warehouse." },
        { name: "Looker", desc: "Embedded enterprise analytics." },
        { name: "Datadog", desc: "Comprehensive infrastructure monitoring." },
        { name: "Optimizely", desc: "Enterprise A/B testing and feature flags." }
      ]
    }
  };

  const current = STACK[stage]?.[budget] || [];

  return (
    <div className="space-y-6">
      <ToolSelect label="App Stage" value={stage} onChange={setStage} options={[["launch","🚀 Launch"],["growth","📈 Growth"],["scale","⚡ Scale"]]} />
      <ToolSelect label="Budget" value={budget} onChange={setBudget} options={[["bootstrap","🌱 Bootstrap"],["funded","💰 Funded"]]} />
      
      <SLabel>Recommended Tech Stack</SLabel>
      <div className="space-y-3">
        {current.map((t: any) => (
          <div key={t.name} className="p-4 bg-tint/5 border border-tint/5 rounded-xl flex items-center justify-between group hover:border-blue/30 transition-all">
            <div>
              <div className="text-sm font-bold text-tint mb-1 group-hover:text-blue transition-colors">{t.name}</div>
              <div className="text-[0.65rem] text-muted">{t.desc}</div>
            </div>
            <CheckCircle2 size={16} className="text-blue opacity-50 shrink-0" />
          </div>
        ))}
      </div>
      <AIInsightStatic calcId="Tool Stack" results={{ "Category": `${budget} ${stage}`, "Total Tools": current.length.toString() }} />
    </div>
  );
}

/* Privacy & Compliance Checklist */
function PrivacyChecklist() {
  const [checked, setChecked] = usePersistentToolState("checked", {});

  const ITEMS = [
    { id: "p1", section: "Core", text: "Privacy policy URL is live and accessible." },
    { id: "p2", section: "Core", text: "Explicit list of all data types collected." },
    { id: "p3", section: "iOS", text: "ATT prompt implemented (App Store requirement)." },
    { id: "p4", section: "GDPR", text: "Right to erasure / Account deletion in-app." }
  ];

  const toggle = (id: string) => setChecked((p: any) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline">
        <SLabel>Privacy Readiness</SLabel>
        <span className="text-xs font-mono text-blue">{Object.values(checked).filter(Boolean).length}/{ITEMS.length}</span>
      </div>
      <div className="space-y-3">
        {ITEMS.map(item => (
          <div key={item.id} onClick={() => toggle(item.id)} className={`p-4 rounded-xl border transition-all cursor-pointer flex gap-4 ${checked[item.id] ? "bg-blue/10 border-blue/30" : "bg-tint/3 border-tint/5"}`}>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${checked[item.id] ? "bg-blue border-blue text-white" : "border-tint/20 text-transparent"}`}>
              <CheckCircle2 size={12} />
            </div>
            <div>
              <div className="text-[0.6rem] font-bold text-blue uppercase tracking-widest mb-1">{item.section}</div>
              <div className={`text-xs font-bold ${checked[item.id] ? "text-muted line-through" : "text-tint"}`}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Weekly Metrics Report */
function WeeklyMetricsReport() {
  const [dauC, setDauC] = usePersistentToolState("d_c", 5500);
  const [dauL, setDauL] = usePersistentToolState("d_l", 5000);
  const [revC, setRevC] = usePersistentToolState("r_c", 1250);
  const [revL, setRevL] = usePersistentToolState("r_l", 1100);
  const [trialsC, setTrialsC] = usePersistentToolState("t_c", 120);
  const [trialsL, setTrialsL] = usePersistentToolState("t_l", 95);

  const pct = (c: number, l: number) => {
    if (l === 0) return '0.0%';
    const diff = ((c - l) / l) * 100;
    return `${diff > 0 ? "+" : ""}${diff.toFixed(1)}%`;
  };

  const emoji = (c: number, l: number) => c >= l ? '🟢' : '🔴';

  const report = `WEEKLY GROWTH REPORT
───────────────
👥 DAU: ${fn(dauC)} (${pct(dauC, dauL)}) ${emoji(dauC, dauL)}
💰 Revenue: ${fc(revC)} (${pct(revC, revL)}) ${emoji(revC, revL)}
⏳ Trials Started: ${fn(trialsC)} (${pct(trialsC, trialsL)}) ${emoji(trialsC, trialsL)}
───────────────
💡 ARPDAU: ${fc(revC / dauC)} (Prev: ${fc(revL / dauL)})
💡 Trial Conversion: ${fp(trialsC / dauC * 100)} of DAU

(Generated via Pocketuse)`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        <div className="space-y-1">
          <SLabel>Current Week</SLabel>
          <ToolSlider label="DAU" value={dauC} min={100} max={100000} step={100} fmt={fn} onChange={setDauC} accent={T.blue} />
          <ToolSlider label="Revenue" value={revC} min={10} max={50000} step={10} fmt={fc} onChange={setRevC} accent={T.amber} />
          <ToolSlider label="Trials" value={trialsC} min={0} max={5000} step={5} fmt={fn} onChange={setTrialsC} accent={T.forest} />
        </div>
        <div className="space-y-1">
          <SLabel>Previous Week</SLabel>
          <ToolSlider label="DAU" value={dauL} min={100} max={100000} step={100} fmt={fn} onChange={setDauL} accent={T.slate} />
          <ToolSlider label="Revenue" value={revL} min={10} max={50000} step={10} fmt={fc} onChange={setRevL} accent={T.slate} />
          <ToolSlider label="Trials" value={trialsL} min={0} max={5000} step={5} fmt={fn} onChange={setTrialsL} accent={T.slate} />
        </div>
      </div>
      <div className="p-6 bg-[#0a0a0a] border border-tint/10 rounded-2xl font-mono text-[0.7rem] text-muted whitespace-pre leading-relaxed shadow-inner">
        {report}
      </div>
      <CopyButton text={report} />
    </div>
  );
}

/* A/B Test Planning Tool */
function ABTestPlanner() {
  const [baseline, setBaseline] = usePersistentToolState("baseline", 3.5);
  const [lift, setLift] = usePersistentToolState("lift", 15);
  const [traffic, setTraffic] = usePersistentToolState("traffic", 5000);

  // Sample size rough approximation
  const n = Math.ceil(16 * (baseline / 100) * (1 - baseline / 100) / ( (baseline / 100) * (lift / 100) )**2);
  const days = Math.ceil((n * 2) / traffic);

  return (
    <div className="space-y-6">
      <ToolSlider label="Baseline CVR (%)" value={baseline} min={0.5} max={20} step={0.1} fmt={v => `${v}%`} onChange={setBaseline} accent={T.blue} />
      <ToolSlider label="Target Lift (%)" value={lift} min={5} max={50} step={1} fmt={v => `${v}%`} onChange={setLift} accent={T.amber} />
      <ToolSlider label="Daily Traffic" value={traffic} min={100} max={50000} step={100} fmt={v => v} onChange={setTraffic} accent={T.pos} />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-tint/5 p-5 rounded-2xl border border-tint/5">
          <div className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-1">Required Sample</div>
          <div className="text-xl font-black text-blue">{n.toLocaleString()} / Var</div>
        </div>
        <div className="bg-tint/5 p-5 rounded-2xl border border-tint/5">
          <div className="text-[0.6rem] text-muted font-bold uppercase tracking-widest mb-1">Test Duration</div>
          <div className="text-xl font-black text-amber">{days} Days</div>
        </div>
      </div>
    </div>
  );
}

/* App Health Scorecard */
function AppHealthScorecard({ accent = T.slate }: any) {
  const [d1, setD1] = usePersistentToolState("d1", 35);
  const [d7, setD7] = usePersistentToolState("d7", 15);
  const [crashFree, setCrashFree] = usePersistentToolState("crashFree", 99.5);
  const [rating, setRating] = usePersistentToolState("rating", 4.5);

  const getStatus = (val: number, good: number, warn: number, inverse = false) => {
    if (inverse) {
      if (val <= good) return { color: T.pos, label: "Healthy" };
      if (val <= warn) return { color: T.amber, label: "At Risk" };
      return { color: T.neg, label: "Critical" };
    }
    if (val >= good) return { color: T.pos, label: "Healthy" };
    if (val >= warn) return { color: T.amber, label: "At Risk" };
    return { color: T.neg, label: "Critical" };
  };

  const getScore = (val: number, min: number, max: number) => {
    return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  };

  const metrics = [
    { id: "d1", label: "D1 Retention", val: d1, setVal: setD1, unit: "%", good: 30, warn: 20, max: 100, min: 0, desc: "Users returning exactly one day after install." },
    { id: "d7", label: "D7 Retention", val: d7, setVal: setD7, unit: "%", good: 15, warn: 8, max: 100, min: 0, desc: "Users returning one week after install." },
    { id: "crashFree", label: "Crash-Free Sessions", val: crashFree, setVal: setCrashFree, unit: "%", good: 99.5, warn: 98.0, max: 100, min: 90, desc: "Percentage of sessions without a fatal crash." },
    { id: "rating", label: "Store Rating", val: rating, setVal: setRating, unit: "★", good: 4.5, warn: 4.0, max: 5, min: 1, desc: "Average user rating on App Store / Google Play." },
  ];

  const overallScore = Math.round(
    (getScore(d1, 10, 50) + 
     getScore(d7, 2, 25) + 
     getScore(crashFree, 95, 100) + 
     getScore(rating, 2, 5)) / 4
  );

  const overallStatus = getStatus(overallScore, 75, 50);

  return (
    <div>
      <div className="flex items-center justify-between p-6 bg-tint/5 border border-tint/10 rounded-3xl mb-8 shadow-lg shadow-black/50">
        <div>
          <div className="text-[10px] uppercase tracking-widest font-bold text-muted mb-1">Overall App Health Score</div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-black text-tint">{overallScore}/100</div>
            <div className="text-xs font-bold uppercase tracking-widest pb-1" style={{ color: overallStatus.color }}>
              {overallStatus.label}
            </div>
          </div>
        </div>
        <div className="h-16 w-16 rounded-full border-4 flex items-center justify-center font-black text-xl bg-black/40" style={{ borderColor: overallStatus.color, color: overallStatus.color }}>
          {overallStatus.label === "Healthy" ? "A" : overallStatus.label === "At Risk" ? "B" : "C"}
        </div>
      </div>

      <div className="space-y-6 mb-8">
        {metrics.map(m => {
          const status = getStatus(m.val, m.good, m.warn);
          
          return (
            <div key={m.id} className="p-5 bg-tint/5 border border-tint/10 rounded-2xl relative overflow-hidden group hover:border-tint/20 transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-1 opacity-80" style={{ backgroundColor: status.color }} />
              
              <div className="flex items-start justify-between mb-2 pl-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-bold text-tint tracking-tight">{m.label}</div>
                    <div className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-black/40" style={{ color: status.color, border: `1px solid ${status.color}40` }}>
                      {status.label}
                    </div>
                  </div>
                  <div className="text-[11px] text-muted">{m.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Benchmark</div>
                  <div className="text-xs font-black text-tint">{m.good}{m.unit} +</div>
                </div>
              </div>
              
              <div className="pl-3 mt-4">
                <ToolSlider 
                  label={`Adjust Content`} 
                  value={m.val} 
                  min={m.id === "crashFree" ? 90 : m.min} 
                  max={m.max} 
                  step={m.id === "rating" || m.id === "crashFree" ? 0.1 : 1} 
                  fmt={v => `${m.id === "rating" ? v.toFixed(1) : v}${m.unit}`} 
                  onChange={m.setVal} 
                  accent={status.color} 
                />
              </div>
            </div>
          );
        })}
      </div>

      <AIInsightStatic calcId="Health Scorecard" results={{ "Score": `${overallScore}/100`, "Status": overallStatus.label }} />
    </div>
  );
}

/* Cohort Revenue Analysis */
function CohortCalc({ accent = T.teal }: any) {
  const [cohortSize, setCohortSize] = usePersistentToolState("cohortSize", 1000);
  const [arpu, setArpu] = usePersistentToolState("arpu", 15);
  const [monthChurn, setMonthChurn] = usePersistentToolState("monthChurn", 8);
  const [expansion, setExpansion] = usePersistentToolState("expansion", 2);
  const months = Array.from({ length: 12 }, (_, i) => {
    const retained = cohortSize * Math.pow(1 - (monthChurn / 100), i + 1);
    const revPerUser = arpu * Math.pow(1 + (expansion / 100), i);
    return { v: retained * revPerUser, users: Math.round(retained) };
  });
  const totalLTV = months.reduce((s, m) => s + m.v, 0);
  return (
    <div>
      <ToolSlider label="Initial Cohort Size" value={cohortSize} min={100} max={100000} step={100} fmt={fn} onChange={setCohortSize} accent={accent} />
      <ToolSlider label="ARPU / mo" value={arpu} min={1} max={200} step={1} fmt={fc} onChange={setArpu} accent={accent} />
      <ToolSlider label="Monthly Churn" value={monthChurn} min={0.5} max={40} step={0.5} fmt={fp} onChange={setMonthChurn} accent={accent} />
      <ToolSlider label="Expansion Revenue/mo" value={expansion} min={0} max={20} step={0.5} fmt={fp} onChange={setExpansion} accent={accent} />
      <SLabel>Cohort Analytics</SLabel>
      <ToolRow label="Total Cohort 12m Rev" value={fc(totalLTV)} bold color={T.pos} />
      <ToolRow label="Month 12 Active Users" value={fn(months[11].users)} />
      <ToolRow label="Month 12 Revenue" value={fc(months[11].v)} />
      <MiniChart data={months} accent={accent} />
      <AIInsightStatic calcId="Cohort Revenue" results={{ "12m Total": fc(totalLTV) }} />
    </div>
  );
}

/* Content Marketing ROI */
function ContentROICalc({ accent = T.moss }: any) {
  const [pieces, setPieces] = usePersistentToolState("pieces", 8);
  const [costPer, setCostPer] = usePersistentToolState("costPer", 500);
  const [trafficPer, setTrafficPer] = usePersistentToolState("trafficPer", 800);
  const [conv, setConv] = usePersistentToolState("conv", 2);
  const [deal, setDeal] = usePersistentToolState("deal", 150);
  const [lifespan, setLifespan] = usePersistentToolState("lifespan", 24);
  const totalCost = pieces * costPer, monthlyTraffic = pieces * trafficPer;
  const monthlyLeads = monthlyTraffic * (conv / 100), monthlyRev = monthlyLeads * deal;
  const totalRev = monthlyRev * lifespan;
  const roi = totalCost > 0 ? ((totalRev - totalCost) / totalCost) * 100 : 0;
  return (
    <div>
      <ToolSlider label="Content Pieces/mo" value={pieces} min={1} max={50} step={1} fmt={fn} onChange={setPieces} accent={accent} />
      <ToolSlider label="Cost per Piece" value={costPer} min={50} max={10000} step={50} fmt={fc} onChange={setCostPer} accent={accent} />
      <ToolSlider label="Monthly Traffic/Piece" value={trafficPer} min={50} max={50000} step={50} fmt={fn} onChange={setTrafficPer} accent={accent} />
      <ToolSlider label="Lead Conv Rate" value={conv} min={0.1} max={20} step={0.1} fmt={fp} onChange={setConv} accent={accent} />
      <ToolSlider label="Avg Deal Value" value={deal} min={10} max={10000} step={10} fmt={fc} onChange={setDeal} accent={accent} />
      <ToolSlider label="Content Lifespan (mo)" value={lifespan} min={1} max={60} step={1} fmt={v => `${v}mo`} onChange={setLifespan} accent={accent} />
      <SLabel>Inbound Impact</SLabel>
      <ToolRow label="Monthly Leads" value={fn(monthlyLeads)} />
      <ToolRow label="Monthly Revenue" value={fc(monthlyRev)} />
      <ToolRow label="Total Lifetime Rev" value={fc(totalRev)} bold color={T.pos} />
      <ToolRow label="Content ROI" value={fp(roi)} bold color={roi > 0 ? T.pos : T.neg} />
      <AIInsightStatic calcId="Content ROI" results={{ "ROI": fp(roi) }} />
    </div>
  );
}

/* Influencer ROI Calc */
function InfluencerCalc({ accent = T.gold }: any) {
  const [followers, setFollowers] = usePersistentToolState("followers", 500000);
  const [eng, setEng] = usePersistentToolState("eng", 3.5);
  const [conv, setConv] = usePersistentToolState("conv", 1.2);
  const [aov, setAov] = usePersistentToolState("aov", 65);
  const [fee, setFee] = usePersistentToolState("fee", 5000);
  const reach = followers * 0.3;
  const clicks = reach * (eng / 100) * 0.3;
  const sales = clicks * (conv / 100);
  const revenue = sales * aov;
  const roi = fee > 0 ? ((revenue - fee) / fee) * 100 : 0;
  return (
    <div>
      <ToolSlider label="Influencer Followers" value={followers} min={1000} max={50000000} step={1000} fmt={fn} onChange={setFollowers} accent={accent} />
      <ToolSlider label="Engagement Rate" value={eng} min={0.1} max={20} step={0.1} fmt={fp} onChange={setEng} accent={accent} />
      <ToolSlider label="Purchase Conv Rate" value={conv} min={0.1} max={10} step={0.1} fmt={fp} onChange={setConv} accent={accent} />
      <ToolSlider label="Avg Order Value" value={aov} min={10} max={1000} step={5} fmt={fc} onChange={setAov} accent={accent} />
      <ToolSlider label="Fixed Fee" value={fee} min={100} max={500000} step={100} fmt={fc} onChange={setFee} accent={accent} />
      <SLabel>Market Velocity</SLabel>
      <ToolRow label="Estimated Reach" value={fn(reach)} />
      <ToolRow label="Estimated Sales" value={fn(sales)} />
      <ToolRow label="Gross Revenue" value={fc(revenue)} bold color={T.pos} />
      <ToolRow label="Campaign ROI" value={fp(roi)} bold color={roi > 0 ? T.pos : T.neg} />
      <AIInsightStatic calcId="Influencer ROI" results={{ "ROI": fp(roi) }} />
    </div>
  );
}

/* Pricing Elasticity */
function PricingElasticityCalc({ accent = T.brick }: any) {
  const [basePrice, setBasePrice] = usePersistentToolState("basePrice", 49);
  const [baseVol, setBaseVol] = usePersistentToolState("baseVol", 1000);
  const [elasticity, setElasticity] = usePersistentToolState("elasticity", -1.5);
  const [change, setChange] = usePersistentToolState("change", 20);
  const newPrice = basePrice * (1 + change / 100);
  const volChange = elasticity * (change / 100);
  const newVol = baseVol * (1 + volChange);
  const baseRev = basePrice * baseVol, newRev = newPrice * newVol;
  const revChange = baseRev > 0 ? ((newRev - baseRev) / baseRev) * 100 : 0;
  return (
    <div>
      <ToolSlider label="Current Price" value={basePrice} min={1} max={1000} step={1} fmt={fc} onChange={setBasePrice} accent={accent} />
      <ToolSlider label="Current Volume" value={baseVol} min={10} max={100000} step={10} fmt={fn} onChange={setBaseVol} accent={accent} />
      <ToolSlider label="Price Elasticity" value={elasticity} min={-5} max={0} step={0.1} fmt={v => v.toFixed(1)} onChange={setElasticity} accent={accent} />
      <ToolSlider label="Price Change %" value={change} min={-50} max={100} step={1} fmt={fp} onChange={setChange} accent={accent} />
      <SLabel>Demand Sensitivity</SLabel>
      <ToolRow label="New Price Point" value={fc(newPrice)} />
      <ToolRow label="Projected Volume" value={fn(newVol)} />
      <ToolRow label="Revenue Change %" value={fp(revChange)} bold color={revChange > 0 ? T.pos : T.neg} />
      <ToolRow label="New Monthly Rev" value={fc(newRev)} bold />
      <AIInsightStatic calcId="Elasticity" results={{ "Rev Delta": fp(revChange) }} />
    </div>
  );
}

/* UA Channel Comparison */
function ChannelCompareCalc({ accent = T.slate }: any) {
  const [budget, setBudget] = usePersistentToolState("budget", 10000);
  const [ltv, setLtv] = usePersistentToolState("ltv", 8.50);
  const CHANNELS = [
    { key: "meta", label: "Meta Ads", cpi: 1.20, d30ret: 10 },
    { key: "google", label: "Google UAC", cpi: 1.80, d30ret: 12 },
    { key: "tiktok", label: "TikTok Ads", cpi: 0.90, d30ret: 8 },
    { key: "asa", label: "Apple Search", cpi: 2.50, d30ret: 18 },
  ];
  const rows = CHANNELS.map(ch => {
    const installs = budget / ch.cpi;
    const rev = installs * ltv;
    return { ...ch, installs, roas: rev / budget };
  }).sort((a, b) => b.roas - a.roas);

  return (
    <div>
      <ToolSlider label="Monthly Budget" value={budget} min={1000} max={1000000} step={1000} fmt={fc} onChange={setBudget} accent={accent} />
      <ToolSlider label="Avg User LTV" value={ltv} min={0.5} max={50} step={0.5} fmt={fc} onChange={setLtv} accent={accent} />
      <SLabel>Ranked Performance</SLabel>
      <div className="space-y-4">
        {rows.map((ch, i) => (
          <div key={ch.key} className={`p-4 rounded-xl border ${i === 0 ? 'bg-blue/10 border-blue/30' : 'bg-tint/5 border-tint/5'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-tint">{ch.label} {i === 0 && "🏆"}</span>
              <span className="text-xs font-mono font-black text-blue">{(ch.roas).toFixed(2)}x ROAS</span>
            </div>
            <div className="flex justify-between text-[0.65rem] text-muted">
              <span>Installs: {fn(ch.installs)}</span>
              <span>CPI: ${ch.cpi.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      <AIInsightStatic calcId="Channel Comparison" results={{ "Best": rows[0].label }} />
    </div>
  );
}

/* Payback by Channel */
function PaybackByChannelCalc({ accent = T.navy }: any) {
  const [arpdau, setArpdau] = usePersistentToolState("arpdau", 0.08);
  const [margin, setMargin] = usePersistentToolState("margin", 65);
  const CHANNELS = [
    { label: "Meta Ads", cpi: 1.20 },
    { label: "Google UAC", cpi: 1.80 },
    { label: "TikTok Ads", cpi: 0.90 },
    { label: "Apple Search", cpi: 2.50 },
    { label: "Unity Ads", cpi: 0.70 },
  ];
  const netArpdau = arpdau * (margin / 100);
  return (
    <div>
      <ToolSlider label="Gross ARPDAU" value={arpdau} min={0.01} max={2} step={0.01} fmt={v => `$${v.toFixed(3)}`} onChange={setArpdau} accent={accent} />
      <ToolSlider label="Net Margin %" value={margin} min={10} max={100} step={1} fmt={fp} onChange={setMargin} accent={accent} />
      <SLabel>Time to Breakeven</SLabel>
      <div className="space-y-2">
        {CHANNELS.map(ch => {
          const days = netArpdau > 0 ? ch.cpi / netArpdau : 999;
          const color = days <= 60 ? T.pos : (days <= 120 ? T.warn : T.neg);
          return (
            <div key={ch.label} className="flex justify-between items-center py-2 border-b border-tint/5">
              <span className="text-xs text-muted">{ch.label}</span>
              <div className="flex items-center gap-4">
                <span className="text-[0.65rem] text-mutedL">${ch.cpi.toFixed(2)} CPI</span>
                <span className="text-sm font-mono font-black" style={{ color }}>{days > 365 ? ">1y" : `${days.toFixed(0)}d`}</span>
              </div>
            </div>
          );
        })}
      </div>
      <AIInsightStatic calcId="Payback Periods" results={{ "Daily Net": fc(netArpdau) }} />
    </div>
  );
}

/* Creative Testing ROI */
function CreativeTestingCalc({ accent = T.terra }: any) {
  const [cost, setCost] = usePersistentToolState("cost", 500);
  const [count, setCount] = usePersistentToolState("count", 5);
  const [lift, setLift] = usePersistentToolState("lift", 15);
  const [budget, setBudget] = usePersistentToolState("budget", 20000);
  const [cpi, setCpi] = usePersistentToolState("cpi", 1.50);
  const [ltv, setLtv] = usePersistentToolState("ltv", 7.00);

  const totalCost = cost * count;
  const baseInstalls = budget / cpi;
  const newCpi = cpi / (1 + lift / 100);
  const newInstalls = budget / newCpi;
  const extraRev = (newInstalls - baseInstalls) * ltv;
  const roi = totalCost > 0 ? ((extraRev - totalCost) / totalCost) * 100 : 0;
  return (
    <div>
      <ToolSlider label="Cost per creative" value={cost} min={50} max={5000} step={50} fmt={fc} onChange={setCost} accent={accent} />
      <ToolSlider label="Variation count" value={count} min={1} max={20} step={1} fmt={fn} onChange={setCount} accent={accent} />
      <ToolSlider label="CVR Lift %" value={lift} min={1} max={100} step={1} fmt={fp} onChange={setLift} accent={accent} />
      <ToolSlider label="Monthly UA Budget" value={budget} min={1000} max={500000} step={1000} fmt={fc} onChange={setBudget} accent={accent} />
      <SLabel>Experiment Returns</SLabel>
      <ToolRow label="Batch Testing Cost" value={fc(totalCost)} neg />
      <ToolRow label="New Effective CPI" value={`$${newCpi.toFixed(2)}`} />
      <ToolRow label="Extra Monthly Rev" value={fc(extraRev)} />
      <ToolRow label="Campaign ROI lift" value={fp(roi)} bold color={T.pos} />
      <AIInsightStatic calcId="Creative ROI" results={{ "New CPI": `$${newCpi.toFixed(2)}` }} />
    </div>
  );
}

/* Retargeting ROI */
function RetargetingCalc({ accent = T.plum }: any) {
  const [pool, setPool] = usePersistentToolState("pool", 50000);
  const [costPer, setCostPer] = usePersistentToolState("costPer", 0.40);
  const [rate, setRate] = usePersistentToolState("rate", 8);
  const [rLtv, setRLtv] = usePersistentToolState("rLtv", 4.50);
  const [cpi, setCpi] = usePersistentToolState("cpi", 1.80);
  const [aLtv, setALtv] = usePersistentToolState("aLtv", 6.00);

  const retargetBudget = pool * costPer;
  const reactivated = pool * (rate / 100);
  const retargetRev = reactivated * rLtv;
  const retargetRoi = retargetBudget > 0 ? ((retargetRev - retargetBudget) / retargetBudget) * 100 : 0;
  const newInstalls = retargetBudget / cpi;
  const acqRev = newInstalls * aLtv;
  const winner = retargetRev > acqRev ? "Retargeting" : "Acquisition";

  return (
    <div>
      <ToolSlider label="Lapsed User Pool" value={pool} min={1000} max={1000000} step={1000} fmt={fn} onChange={setPool} accent={accent} />
      <ToolSlider label="Cost to Reach / User" value={costPer} min={0.05} max={5} step={0.05} fmt={v => `$${v.toFixed(2)}`} onChange={setCostPer} accent={accent} />
      <ToolSlider label="Reactivation Rate %" value={rate} min={1} max={40} step={0.5} fmt={fp} onChange={setRate} accent={accent} />
      <ToolSlider label="Lapsed User LTV" value={rLtv} min={0.5} max={30} step={0.5} fmt={fc} onChange={setRLtv} accent={accent} />
      <SLabel>Vs Cold Acquisition</SLabel>
      <ToolRow label="Retargeting Total Cost" value={fc(retargetBudget)} />
      <ToolRow label="Retargeting Revenue" value={fc(retargetRev)} color={T.blue} />
      <ToolRow label="Equivalent Acq Revenue" value={fc(acqRev)} />
      <div className="mt-6 p-4 rounded-xl bg-tint/5 border border-tint/10 text-center">
        <div className="text-[0.6rem] text-muted uppercase tracking-widest mb-1">Efficient Choice</div>
        <div className="text-lg font-black text-tint">{winner} 🏆</div>
      </div>
      <AIInsightStatic calcId="Retargeting" results={{ "ROI": fp(retargetRoi) }} />
    </div>
  );
}

/* Cohort Analysis Interpreter */
function CohortInterpreter() {
  const [d1, setD1] = usePersistentToolState("d1", 35);
  const [d7, setD7] = usePersistentToolState("d7", 15);
  const [d30, setD30] = usePersistentToolState("d30", 5);

  const interpret = () => {
    if (d1 < 30) return "onboarding is leaking. fix the tutorial.";
    if (d7 / d1 < 0.4) return "the core week-1 habit isn't sticking.";
    if (d30 / d7 < 0.3) return "long term content depth or push strategy is missing.";
    return "healthy retention decay. focus on top-of-funnel UA.";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <ToolInput label="D1" value={d1} onChange={(v: string) => setD1(+v || 0)} type="number" />
        <ToolInput label="D7" value={d7} onChange={(v: string) => setD7(+v || 0)} type="number" />
        <ToolInput label="D30" value={d30} onChange={(v: string) => setD30(+v || 0)} type="number" />
      </div>
      <div className="p-6 bg-blue/10 border border-blue/20 rounded-2xl">
        <div className="text-[0.6rem] text-blue font-black uppercase tracking-widest mb-2">Automated Insight</div>
        <div className="text-sm font-bold text-tint leading-relaxed italic">"Based on your 35-15-5 decay curve, {interpret()}"</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN HUB COMPONENT
   ────────────────────────────────────────────────────────────────────────── */

const ALL_TOOLS = [
  { id: "iap", category: "Revenue", title: "In-App Purchase Estimator", icon: <Calculator />, color: T.amber, desc: "Model revenue based on conversion, churn, and store fees.", longDesc: "Accurately forecast your In-App Purchase (IAP) revenue. By inputting your expected conversion rates, user churn, and platform fees (Apple or Google's 15-30% cut), this tool generates a clear view of your net revenue and customer lifetime value (LTV). Accurate IAP modeling is essential for ensuring your user acquisition costs (CAC) never exceed your actual net earnings.", component: IAPCalc, size: "lg" },
  { id: "aso", category: "Revenue", title: "ASO ROI Estimator", icon: <TrendingUp />, color: T.slate, desc: "Predict rank-based organic revenue growth.", longDesc: "Predict your rank-based organic revenue growth with our ASO ROI Estimator. App Store Optimization isn't just about traffic—it's about bottom-line revenue. This tool calculates the estimated financial lift you can expect when investing in keyword optimization, helping you justify ASO spend against paid user acquisition channels.", component: ASOCalc },
  { id: "sub", category: "Revenue", title: "Subscription Modeler", icon: <Layers />, color: T.forest, desc: "Calculate MRR/ARR with monthly vs annual plan splits.", longDesc: "The Subscription Modeler helps you calculate critical MRR (Monthly Recurring Revenue) and ARR (Annual Recurring Revenue) metrics. By analyzing your split between monthly and annual plans—and accounting for platform cuts—you get an accurate picture of your recurring cash flow, predicting runway and growth speed.", component: SubCalc },
  { id: "mix", category: "Revenue", title: "Monetization Mix", icon: <BarChart3 />, color: T.sienna, desc: "Optimize your split between ads, IAP, and subs.", longDesc: "Optimize your monetization strategy by balancing Ads, IAP, and Subscriptions. Relying on a single revenue stream can be risky; this calculator helps you find the perfect hybrid monetization model to maximize ARPU (Average Revenue Per User) without destroying user retention.", component: MonetizationMixCalc },
  { id: "influencerroi", category: "Revenue", title: "Influencer ROI Calc", icon: <Star />, color: T.gold, desc: "Sponsorship fee vs engagement and conversion returns.", longDesc: "Take the guesswork out of creator marketing. This Influencer ROI Calculator helps you evaluate sponsorship fees against expected engagement, click-through rates, and ultimately, conversion returns. Ensure your influencer marketing budget is driving profitable installs rather than just vanity metrics.", component: InfluencerCalc },
  { id: "contentroi", category: "Revenue", title: "Content Marketing ROI", icon: <FileText />, color: T.moss, desc: "Traffic → Leads → Revenue lifetime modeling.", longDesc: "Model the lifetime value of your content marketing efforts. From top-of-funnel organic traffic to qualified leads and closed revenue, this tool helps you quantify the long-term ROI of your blog posts, videos, and SEO content, proving the value of organic growth.", component: ContentROICalc },
  { id: "creator", category: "Revenue", title: "Creator Revenue", icon: <MousePointer2 />, color: T.terra, desc: "Ads, deals, and blended RPM projections.", longDesc: "Designed specifically for the creator economy, this tool aggregates your Ads, brand deals, and direct audience monetization to build blended RPM (Revenue Per Mille) projections. Understand exactly what thousands of views mean for your bottom line.", component: CreatorCalc },
  { id: "saas", category: "Revenue", title: "SaaS Multi-Tier Modeling", icon: <Layout />, color: T.navy, desc: "Free to Pro to Enterprise funnel modeler.", longDesc: "Map out your B2B or B2C SaaS multi-tier pricing strategy. This funnel modeler helps you project revenue across Free, Pro, and Enterprise tiers, allowing you to optimize your upgrade paths and feature gating to maximize the lifetime value of every signup.", component: SaaSCalc },
  { id: "affiliate", category: "Revenue", title: "Affiliate Earnings", icon: <ExternalLink />, color: T.sage, desc: "Traffic to commissions projection tool.", longDesc: "Forecast your affiliate marketing earnings with precision. By modeling your inbound traffic, click-through rates to partner offers, and average commission payouts, this projection tool helps you identify which traffic sources are truly profitable.", component: AffiliateCalc },
  { id: "freemium", category: "Revenue", title: "Freemium Strategy", icon: <RefreshCw />, color: T.moss, desc: "Infrastructure cost vs conversion revenue balancing.", longDesc: "Balance the cost of free users against the revenue of premium converters. The Freemium Strategy calculator compares your infrastructure and server costs per user against your conversion revenue, ensuring your free tier acts as a profitable acquisition channel, not a cash drain.", component: FreemiumCalc },
  { id: "api", category: "Revenue", title: "API Usage-Based Pricing", icon: <Cpu />, color: T.gold, desc: "Model multi-tier programmatic revenue.", longDesc: "Model multi-tier programmatic revenue for your API product. Usage-based pricing can be highly complex to forecast. This tool lets you map out cost-per-call tiers against expected usage volume, giving you clear insights into high-volume profitability.", component: APICalc },
  { id: "payout", category: "Revenue", title: "App Store Developer Payout", icon: <DollarSign />, color: T.gold, desc: "Calculated net payout after store cuts and brackets.", longDesc: "Calculate your true net payout after App Store and Google Play fees. This tool instantly computes your actual take-home revenue, automatically adjusting for the 15% Small Business Program bracket versus the standard 30% cut, saving you from gross-margin miscalculations.", component: AppStorePayoutCalc },
  { id: "uac", category: "Growth", title: "UA Campaign ROI", icon: <Target />, color: T.rose, desc: "Predict ROI and break-even for ad spend campaigns.", longDesc: "Predict campaign ROI and exactly when you'll hit break-even on your ad spend. This User Acquisition (UA) calculator analyzes your CPI (Cost Per Install) against your LTV (Lifetime Value), giving you a clear ROAS (Return on Ad Spend) timeline for confident scaling.", component: UACCalc, size: "lg" },
  { id: "channels", category: "Growth", title: "UA Channel Comparison", icon: <BarChart3 />, color: T.slate, desc: "Compare Meta vs Google vs TikTok ROAS.", longDesc: "Compare the performance of major ad networks like Meta, Google Ads, and TikTok. This UA Channel Comparison tool helps you allocate your budget scientifically by comparing normalized ROAS, CPI, and scale ceilings across different platforms.", component: ChannelCompareCalc },
  { id: "creativetest", category: "Growth", title: "Creative Testing ROI", icon: <MousePointer2 />, color: T.terra, desc: "ROI for conversion lift from ad variations.", longDesc: "Measure the financial impact of ad creative variations. This tool calculates the ROI of A/B testing your creatives by highlighting how even a small lift in CTR (Click-Through Rate) cascades into lower CPIs and massively improved campaign profitability.", component: CreativeTestingCalc },
  { id: "retargetroi", category: "Growth", title: "Retargeting ROI", icon: <RefreshCw />, color: T.plum, desc: "Lapsed user reactivation vs new user CPI.", longDesc: "Lapsed users are often your cheapest source of revenue. The Retargeting ROI calculator compares the cost of reactivating an old user against acquiring a net-new user, helping you decide exactly how much budget to shift towards win-back campaigns.", component: RetargetingCalc },
  { id: "paybackchannel", category: "Growth", title: "Payback by Channel", icon: <Clock />, color: T.navy, desc: "Which channel recovers acquisition cost fastest.", longDesc: "Cash flow is the lifeblood of app growth. This tool reveals which acquisition channel recovers its initial cost the fastest (Payback Period). Shorter payback periods mean you can reinvest your capital faster, multiplying your growth velocity.", component: PaybackByChannelCalc },
  { id: "viral", category: "Growth", title: "Viral Coefficient", icon: <Zap />, color: T.teal, desc: "K-factor and user base growth projection.", longDesc: "Determine your app's true K-factor and project viral growth. The Viral Coefficient calculator maps out how many new users each existing user brings in. If your score is above 1.0, your user base will grow exponentially for free.", component: ViralCalc },
  { id: "adspend", category: "Growth", title: "Ad Spend Analyzer", icon: <TrendingUp />, color: T.plum, desc: "Detailed ROAS and LTV:CAC campaign breakdown.", longDesc: "Get a detailed breakdown of your ROAS and LTV-to-CAC ratios. This Ad Spend Analyzer serves as a health check for your paid marketing operations, instantly flagging campaigns that are burning cash and highlighting those ready for budget scaling.", component: AdSpendCalc, size: "lg" },
  { id: "email", category: "Growth", title: "Email List Monetization", icon: <Mail />, color: T.violet, desc: "Opens and clicks to revenue per send model.", longDesc: "Turn your newsletter into a predictable revenue engine. By analyzing open rates, click-throughs, and revenue per qualified click, this tool gives you an exact monetary value for every email sent, helping you optimize your CRM strategy.", component: EmailCalc },
  { id: "reengage", category: "Growth", title: "Re-activation Strategic Aid", icon: <RefreshCw />, color: T.sienna, desc: "Compare re-engagement cost vs new user CPI.", longDesc: "Compare the cost of re-engagement campaigns (like push notifications and targeted ads) versus acquiring net-new users. This strategic aid helps you maximize your marketing budget's efficiency by striking the right balance between retention and acquisition.", component: ReengagementCalc },
  { id: "localize", category: "Growth", title: "Market Expansion Lift", icon: <Globe />, color: T.teal, desc: "ROI for localizing into new geographic regions.", longDesc: "Calculate the exact ROI of localizing your app into new geographic regions. Market expansion is expensive; this tool models your translation and culturalization costs against the expected lift in conversion rates and organic ranking in T1 and T2 markets.", component: LocalizationROICalc },
  { id: "uachannel", category: "Growth", title: "Channel Playbook Builder", icon: <Compass />, color: T.blue, desc: "Smart channel recommendations by app category.", longDesc: "Stop guessing where to spend your marketing budget. The UA Channel Playbook Builder generates smart, category-specific channel recommendations (e.g., Apple Search Ads for Utilities vs TikTok for Social apps) to maximize your initial growth momentum.", component: UAChannelPlaybook },
  { id: "influencer", category: "Growth", title: "Influencer Outreach Tool", icon: <Sparkles />, color: T.blue, desc: "Budget and reach estimator for creator campaigns.", longDesc: "Plan your creator outreach campaigns with confidence. This budget and reach estimator helps you forecast the impact of seeding your app to micro and macro-influencers, generating realistic CPI targets before you negotiate sponsorships.", component: InfluencerOutreach },
  { id: "retention", category: "Analytics", title: "Retention Curve Analysis", icon: <Clock />, color: T.forest, desc: "Model long-term retention decay and D30 cohorts.", longDesc: "Model long-term retention decay and understand your D30 cohorts. Retention is the most critical metric for any app. This calculator visualizes your drop-off curve, helping you pinpoint exactly where users lose interest so you can fix your core loop.", component: RetentionCurveCalc, size: "lg" },
  { id: "session", category: "Analytics", title: "Session Engagement Index", icon: <Activity />, color: T.teal, desc: "Measure session depth and total playtime metrics.", longDesc: "Measure the depth of user engagement. The Session Engagement Index evaluates average session length and frequency to determine how 'sticky' your app is. High playtime metrics correlate strongly with both ad revenue and organic growth.", component: SessionEngagementCalc },
  { id: "rating", category: "Analytics", title: "Rating Impact Modeler", icon: <Star />, color: T.gold, desc: "How star ratings affect visibility and downloads.", longDesc: "Quantify the real impact of your App Store ratings. This Rating Impact Modeler demonstrates how a jump from 3.9 to 4.2 stars dramatically increases visibility, organic search conversions, and ultimately, free downloads.", component: RatingImpactCalc },
  { id: "push", category: "Analytics", title: "Push Notification ROI", icon: <Zap />, color: T.amber, desc: "Revenue and retention impact of CRM campaigns.", longDesc: "Calculate the bottom-line ROI of your CRM and Push Notification campaigns. This tool models the revenue and retention lift generated by re-engaging users directly on their lock screen, optimizing your messaging frequency without causing opt-outs.", component: PushNotifCalc },
  { id: "geo", category: "Analytics", title: "Geo Yield Tiers", icon: <Map />, color: T.navy, desc: "Estimated yield from T1, T2, and T3 markets.", longDesc: "Estimate varying revenue yields across Tier 1, Tier 2, and Tier 3 geographic markets. Global growth requires nuanced monetization; this tool helps you adjust pricing and ad expectations based on regional purchasing power and historical eCPM data.", component: GeoRevenueCalc },
  { id: "ecpmgeo", category: "Analytics", title: "eCPM Country Yardstick", icon: <Globe />, color: T.slate, desc: "Projected revenue across major global regions.", longDesc: "Project your ad monetization revenue across major global regions using the eCPM Country Yardstick. Understand the massive discrepancy in ad value between US/UK traffic versus emerging markets, allowing for smarter UA geographic targeting.", component: EcpmByCountryCalc },
  { id: "lifecycle", category: "Analytics", title: "User Lifecycle Mix", icon: <RefreshCw />, color: T.moss, desc: "Segment users by acquisition, engagement, and risk.", longDesc: "Segment your user base into actionable cohorts: Acquisition, Engagement, and Risk. This User Lifecycle Mix tool identifies what percentage of your users are newly onboarded, actively loyal, or at high risk of churning, allowing for targeted interventions.", component: UserLifecycleCalc },
  { id: "keyword", category: "ASO", title: "ASO Keyword Research", icon: <Search />, color: T.sage, desc: "Estimate rank-based keyword volume capture.", longDesc: "Estimate your rank-based keyword volume capture. This ASO Keyword Research tool uses search volume assumptions to forecast how much daily organic traffic you mathematically secure if you rank #1, #3, or #10 for a high-priority search term.", component: KeywordTrafficCalc, size: "lg" },
  { id: "cvr", category: "ASO", title: "CVR Optimization ROI", icon: <TrendingUp />, color: T.amber, desc: "Revenue lift from A/B testing store assets.", longDesc: "Calculate the revenue impact of App Store A/B tests. The CVR Optimization ROI tool shows how a simple 2% increase in your listing's conversion rate—achieved through better screenshots or icons—compounds into massive gains across all your marketing channels.", component: ConvRateOptimizerCalc },
  { id: "reviews", category: "ASO", title: "Review Velocity Planner", icon: <MessageSquare />, color: T.rose, desc: "Timeline to hit your target App Store rating.", longDesc: "Plan your timeline to hit your target App Store rating. The Review Velocity Planner calculates exactly how many 5-star reviews you need to counteract older negative ratings and cross crucial visibility thresholds (like the jump from 3.9 to 4.0 stars).", component: ReviewVelocityCalc },
  { id: "bidding", category: "Analytics", title: "Waterfall vs Bidding", icon: <Zap />, color: T.sienna, desc: "Revenue lift from real-time ad bidding.", longDesc: "Evaluate the revenue lift of switching from a traditional ad waterfall to real-time in-app bidding. This tool models the efficiency gains and increased competition per impression, helping you maximize your ad monetization stack.", component: WaterfallVsBiddingCalc },
  { id: "adfreq", category: "Analytics", title: "Ad Frequency Sweet Spot", icon: <Activity />, color: T.terra, desc: "Optimal ads per session vs churn risk.", longDesc: "Find your ideal Ad Frequency Sweet Spot. Push too many ads and you'll churn users; push too few and you leave money on the table. This calculator models ad revenue per session against the permanent financial cost of user churn.", component: AdFrequencyCalc },
  { id: "screenshots", category: "Strategy", title: "Screenshot Pipeline", icon: <Layers />, color: T.blue, desc: "8-slot visual storytelling plan for app stores.", longDesc: "Plan visual storytelling for your App Store. This Screenshot Pipeline tool generates an 8-slot strategic framework, ensuring your imagery highlights core hooks, social proof, and value propositions to maximize tap-through conversion rates.", component: ScreenshotPlanner },
  { id: "press", category: "Strategy", title: "Press Kit Draft", icon: <FileText />, color: T.slate, desc: "Instant press release and media announcement starter.", longDesc: "Generate an instant, professional press release and media announcement. This Press Kit Draft starter helps you structure your app's narrative, feature highlights, and founding story so journalists can effortlessly cover your launch.", component: PressKitGenerator },
  { id: "beta", category: "Strategy", title: "Beta Tester Planner", icon: <Target />, color: T.blue, desc: "Scale and logistics for pre-launch testing.", longDesc: "Plan the scale and logistics required for a successful pre-launch test. The Beta Tester Planner calculates how many testers you need to invite to guarantee enough active feedback, crash reports, and qualitative data before a public release.", component: BetaTesterPlanner },
  { id: "competitor_score", category: "Strategy", title: "Competitor Scorecard", icon: <Compass />, color: T.plum, desc: "Benchmark vs rivals across 4 product dimensions.", longDesc: "Benchmark your app against rivals across multiple product dimensions. This Competitor Scorecard forces an objective evaluation of your UI/UX, feature set, pricing, and performance to highlight clear competitive advantages you can exploit.", component: CompetitorAnalysis },
  { id: "okr", category: "Strategy", title: "OKR Blueprint", icon: <Target />, color: T.amber, desc: "Aligned objectives and key results for app teams.", longDesc: "Generate aligned Objectives and Key Results (OKRs) for your app growth team. This blueprint creates a structured goal-setting framework, ensuring your engineering, product, and marketing efforts are all pushing toward the same critical KPIs.", component: OKRGenerator },
  { id: "unitec", category: "Business", title: "Unit Economics Shield", icon: <Shield />, color: T.violet, desc: "LTV:CAC, payback, and margin scorecard.", longDesc: "Evaluate your business viability with the Unit Economics Shield. By analyzing your LTV-to-CAC ratio, payback periods, and overall profit margins, this scorecard provides a brutal, honest assessment of whether your app is ready to scale or needs optimization.", component: UnitEconCalc, size: "lg" },
  { id: "devcost", category: "Business", title: "Dev Cost ROI", icon: <Wrench />, color: T.brick, desc: "Build cost vs revenue, 24-month break-even.", longDesc: "Calculate the true ROI of your engineering costs. The Dev Cost ROI tool compares your initial build and maintenance costs against projected revenue, giving you a realistic 24-month break-even timeline for your software investment.", component: DevCostROICalc },
  { id: "teamscale", category: "Business", title: "Team Scaling Plan", icon: <Users />, color: T.amber, desc: "Headcount needed at revenue milestones.", longDesc: "Plan your headcount growth as you scale. This Team Scaling Plan models the human capital—from engineers to customer support—you will inevitably need logically mapped against specific MRR and user-base milestones.", component: TeamScalingCalc },
  { id: "competitor", category: "Business", title: "Competitor Yield Est.", icon: <Target />, color: T.moss, desc: "Estimate rival app revenue by rank & category.", longDesc: "Estimate how much money your rivals are making. The Competitor Yield Estimator uses gross category rankings and relative store positions to provide a ballpark figure of your competitor's daily revenue, helping you size your total addressable market.", component: CompetitorRevenueCalc },
  { id: "funding", category: "Business", title: "Funding Readiness", icon: <Award />, color: T.violet, desc: "Investor readiness score across key KPIs.", longDesc: "Prepare for your seed or Series A round. This Funding Readiness tool grades your startup across key KPIs (retention, growth rate, margins, CAC), giving you an investor's perspective on where your pitch needs strengthening.", component: FundingReadiness },
  { id: "kpidash", category: "Business", title: "KPI Benchmarks", icon: <FileText />, color: T.forest, desc: "Track key metrics vs startup stage targets.", longDesc: "Track your real-time performance against critical startup stage targets. The KPI Benchmarks dashboard curates essential metrics, letting you know instantly if your current growth trajectory matches the expectations of top-tier venture capitalists.", component: KPIDashboard },
  { id: "elasticity", category: "Business", title: "Pricing Elasticity", icon: <TrendingDown />, color: T.brick, desc: "Model price changes vs volume and revenue delta.", longDesc: "Model the impact of changing your app's price. The Pricing Elasticity calculator demonstrates how raising or lowering your price will affect download volume and overall revenue delta, helping you find the absolute maximum yield point.", component: PricingElasticityCalc },
  { id: "cohortrev", category: "Business", title: "Cohort Revenue Analysis", icon: <Layers />, color: T.teal, desc: "12-month cohort decay with churn and expansion.", longDesc: "Perform a deep dive into your 12-month cohort decay. This Cohort Revenue Analysis tool models churn against net revenue expansion (like upsells), showing you exactly when a group of acquired users becomes truly profitable.", component: CohortCalc },
  { id: "whale", category: "Business", title: "Whale Management", icon: <Wallet />, color: T.navy, desc: "Segment payers and identify concentration risk.", longDesc: "Identify concentration risk in your monetization. The Whale Management tool segments your paying users to show exactly what percentage of your revenue relies on the top 1% of spenders, helping you balance VIP support against broader monetization.", component: WhaleSegmentation },
  { id: "runway", category: "Business", title: "Startup Runway", icon: <Activity />, color: T.plum, desc: "Monthly burn vs cash reserves to find your zero-cash date.", longDesc: "Calculate your exact 'zero-cash' date. The Startup Runway tool models your monthly burn rate against your current cash reserves. Knowing your runway eliminates panic and allows you to time your next fundraising round or product launch perfectly.", component: RunwayCalc },
  { id: "ads", category: "Revenue", title: "Mobile Ad Revenue", icon: <Smartphone />, color: T.teal, desc: "Estimate revenue from Banners, Interstitials, and Rewarded Ads.", longDesc: "Estimate potential revenue from Banners, Interstitials, and Rewarded Video Ads. The Mobile Ad Revenue calculator uses standard eCPM benchmarks to project earnings based on your daily active users and average ad impressions per session.", component: MobileAdsCalc },
  { id: "soft", category: "Growth", title: "Soft Launch Market Selection", icon: <Globe />, color: T.blue, desc: "Identify the best T1/T2 proxy markets for your soft launch.", longDesc: "Identify the perfect proxy market for your pre-launch testing. The Soft Launch Market Selection tool recommends specific Tier 2 or Tier 3 countries that mimic your primary demographic's behavior, allowing you to test monetization cheaply before a US launch.", component: SoftLaunchSelector },
  { id: "roadmap", category: "Strategy", title: "Roadmap Prioritizer", icon: <Compass />, color: T.violet, desc: "Rank features using RICE or MoSCoW frameworks.", longDesc: "Rank features objectively using the RICE (Reach, Impact, Confidence, Effort) or MoSCoW frameworks. The Roadmap Prioritizer eliminates emotional decision-making, ensuring your engineering time is spent on the highest-leverage updates.", component: RoadmapPrioritizer, size: "lg" },
  { id: "launch", category: "Strategy", title: "App Launch Checklist", icon: <CheckCircle2 />, color: T.blue, desc: "A comprehensive roadmap from pre-launch to scale phase.", longDesc: "Navigate the chaos of releasing a new product. The App Launch Checklist provides a comprehensive, step-by-step strategic roadmap covering everything from pre-launch community building to scalable post-launch UA strategies.", component: AppLaunchChecklist },
  { id: "gtm", category: "Strategy", title: "Go-to-Market Builder", icon: <Rocket />, color: T.amber, desc: "Strategic 4-phase plan for launch and global expansion.", longDesc: "Build a customized, 4-phase strategic plan for your product launch and global expansion. The Go-to-Market Builder details the specific marketing, product, and sales actions required to penetrate the market and achieve sustainable momentum.", component: GTMBuilder },
  { id: "subpricing", category: "Revenue", title: "Subscription Designer", icon: <CreditCard />, color: T.blue, desc: "Interactive pricing designer with conversion anchoring.", longDesc: "Design high-converting pricing tiers. This Subscription Designer tool lets you interactively set monthly versus annual costs, utilizing proven psychological conversion anchoring—like highlighting percentage savings—to drive users toward annual commitments.", component: SubPricingDesigner },
  { id: "trial", category: "Revenue", title: "Free Trial Strategy", icon: <Clock />, color: T.pos, desc: "Optimal trial length and trigger timing based on retention.", longDesc: "Optimize your freemium onboarding funnel. The Free Trial Strategy tool helps you determine the perfect trial length and the exact moment to trigger the paywall based on your unique user retention curve, maximizing trial-to-paid conversion.", component: FreeTrialStrategy },
  { id: "iapstore", category: "Revenue", title: "IAP Store Planner", icon: <Layout />, color: T.amber, desc: "Optimal layout for in-app stores to maximize ASP.", longDesc: "Maximize your Average Order Value (AOV). The IAP Store Planner uses psychological pricing principles to help you structure the layout of your in-app store—from 'decoy' pricing tiers to best-value highlights—increasing your overall purchasing volume.", component: IAPStorePlanner },
  { id: "creative", category: "Growth", title: "Creative Brief Template", icon: <MousePointer2 />, color: T.plum, desc: "Structured ad creative briefs for high-CTR campaigns.", longDesc: "Produce ad creatives that actually convert. The Creative Brief Template structures your campaign concepts—focusing heavily on the crucial first 3-second hook and localized value propositions—resulting in higher CTRs and lower acquisition costs.", component: CreativeBriefTool },
  { id: "asoaudit", category: "ASO", title: "ASO Audit Checklist", icon: <Search />, color: T.slate, desc: "Grade your store listing across 5 technical dimensions.", longDesc: "Grade your App Store listing across 5 critical dimensions. The ASO Audit Checklist evaluates your title, subtitle, icon clarity, screenshot storyline, and review velocity, giving you a definitive score and actionable steps to improve organic visibility.", component: ASOAudit },
  { id: "incident", category: "Strategy", title: "Incident Playbook", icon: <AlertCircle />, color: T.rose, desc: "Checklists for crashes, rejections, and revenue drops.", longDesc: "Don't panic when things break. The Incident Playbook provides rigorous, time-bound checklists for handling catastrophic app crashes, App Store rejections, and sudden revenue drops, ensuring your team responds swiftly and professionally.", component: IncidentPlaybook },
  { id: "sprint", category: "Strategy", title: "Sprint Planner", icon: <List />, color: T.teal, desc: "Points-based sprint allocation by task category.", longDesc: "Allocate your engineering resources efficiently. The Sprint Planner uses points-based capacity planning to help you balance new feature development, technical debt, and bug fixes across your task categories, ensuring predictable development cycles.", component: SprintPlanning },
  { id: "toolstack", category: "Strategy", title: "Tool Stack Recommender", icon: <Wrench />, color: T.blue, desc: "The best analytics and UA stack for your startup stage.", longDesc: "Stop wasting money on the wrong SDKs. The Tool Stack Recommender provides tailored advice on the best analytics, attribution, and marketing tools for your specific startup stage and budget (Bootstrap vs Funded), preventing technical bloat.", component: ToolStackRecommender },
  { id: "privacy", category: "Strategy", title: "Privacy Compliance", icon: <Lock />, color: T.navy, desc: "Checklist for GDPR, COPPA, and ATT requirements.", longDesc: "Ensure your app meets global privacy standards. The Privacy Compliance checklist guides you through the complex requirements of GDPR, COPPA, and Apple's ATT framework, minimizing the risk of devastating store rejections and legal fines.", component: PrivacyChecklist },
  { id: "weeklyreport", category: "Analytics", title: "Weekly Metrics Report", icon: <BarChart3 />, color: T.forest, desc: "WoW automated report generator for key growth KPIs.", longDesc: "Automate your growth reporting. The Weekly Metrics Report generates a clear week-over-week analysis of your key KPIs—like DAU, revenue, and trial conversions—formatting it perfectly for a quick paste into your team's Slack or investor updates.", component: WeeklyMetricsReport },
  { id: "abtest", category: "Analytics", title: "A/B Test Planner", icon: <Activity />, color: T.plum, desc: "Significant sample size and test duration calculator.", longDesc: "Ensure your product experiments are statistically sound. The A/B Test Planner calculates the minimum sample size and testing duration required to achieve statistical significance, preventing you from making major product decisions based on statistical noise.", component: ABTestPlanner },
  { id: "healthscore", category: "Analytics", title: "App Health Scorecard", icon: <Activity />, color: T.slate, desc: "RAG status for retention, stability, and store ratings.", longDesc: "Get a high-level view of your app's core vitals. The App Health Scorecard evaluates your D1 retention, D7 retention, crash-free rates, and store ratings against aggressive industry benchmarks, instantly flagging metrics that have entered 'At Risk' or 'Critical' status.", component: AppHealthScorecard, size: "lg" },
  { id: "cohort", category: "Analytics", title: "Cohort Interpreter", icon: <TrendingDown />, color: T.terra, desc: "Plain-English analysis of your retention decay curve.", longDesc: "Instantly understand your retention issues without being a data scientist. The Cohort Interpreter provides a plain-English analysis of your retention decay curve, clearly diagnosing if you have an onboarding problem (D1), a habit-forming problem (D7), or a content depth problem (D30).", component: CohortInterpreter },
];

const CATEGORIES = ["All", "Favorites", "Revenue", "Growth", "Analytics", "ASO", "Strategy", "Business"];

export default function Tools() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  const [activeTool, setActiveTool] = useState<any>(() => ALL_TOOLS.find(t => t.id === toolId) || null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("pocket_tools_favs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    setActiveTool(ALL_TOOLS.find(t => t.id === toolId) || null);
  }, [toolId]);

  const closeTool = () => navigate('/tools');
  const openTool = (tool: any) => navigate(`/tools/${tool.id}`);

  useEffect(() => {
    localStorage.setItem("pocket_tools_favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const isFav = favorites.includes(id);
    setFavorites(prev => 
      isFav ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filtered = ALL_TOOLS.filter(t => 
    (filter === "All" || (filter === "Favorites" ? favorites.includes(t.id) : t.category === filter)) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) || 
     t.desc.toLowerCase().includes(search.toLowerCase()) || 
     (t.longDesc && t.longDesc.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="relative min-h-screen bg-bg text-tint overflow-x-hidden">
      <SEO 
        title={activeTool ? `${activeTool.title} Tool` : "Mobile Growth & Product Tools"} 
        description={activeTool ? activeTool.desc : "Free calculators, planners, and strategic frameworks for mobile app developers and founders."} 
        url={`https://pocketuse.com/tools${activeTool ? `/${activeTool.id}` : ''}`} 
        schemaData={activeTool ? {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": `${activeTool.title} Tool - Pocketuse`,
          "description": activeTool.desc,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All",
          "url": `https://pocketuse.com/tools/${activeTool.id}`,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        } : undefined}
      />
      <Navbar />

      <section className="relative pt-[180px] pb-20 px-6 md:px-12 grid-bg">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue/25 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-[1200px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue/10 border border-blue/20 rounded-full px-4 py-1.5 text-[0.7rem] font-black text-blue uppercase tracking-widest mb-7">
              <Wrench size={14} />
              Founder Toolbox
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-black leading-[1] tracking-tighter text-tint mb-6">
              Tools to <span className="grad-text">Ship and Scale.</span>
            </h1>
            <p className="text-[1.15rem] text-muted leading-relaxed max-w-[650px] mx-auto font-light mb-12">
              Free, interactive resource for app developers. Calculate unit economics, plan your roadmap, and audit your ASO strategy.
            </p>

            <div className="max-w-[700px] mx-auto relative group">
              <div className="absolute inset-0 bg-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-tint/5 border border-tint/10 rounded-2xl p-2 pl-6 focus-within:border-blue/50 transition-all">
                <Search className="text-muted" size={20} />
                <input 
                  type="text" 
                  placeholder="Search 40+ growth and engineering tools..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-tint font-medium"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-bg relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-8 mb-12 border-b border-tint/5 pb-8">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    filter === c 
                      ? "bg-blue text-white shadow-[0_10px_20px_rgba(59,130,246,0.3)]" 
                      : "bg-tint/5 text-muted hover:text-tint hover:bg-tint/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="text-[0.65rem] font-bold text-muted uppercase tracking-[0.2em]">
              Showing <span className="text-tint">{filtered.length}</span> tools
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
              {filtered.map((tool, idx) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`${tool.size === 'lg' ? 'md:col-span-2 row-span-2' : 'col-span-1'}`}
                >
                  <Link 
                    to={`/tools/${tool.id}`}
                    className="group bg-bgCard border border-tint/10 rounded-[32px] p-8 h-full flex flex-col cursor-pointer hover:border-blue/40 hover:bg-tint/5 transition-all block focus:outline-none"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-tint/5 rounded-2xl text-tint group-hover:scale-110 transition-transform" style={{ color: tool.color }}>
                        {tool.icon}
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="text-[0.6rem] h-fit font-black text-mutedL uppercase tracking-widest border border-tint/5 rounded-full px-3 py-1">
                          {tool.category}
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => toggleFavorite(e, tool.id)}
                          className={`p-3 rounded-xl border transition-colors duration-300 ${
                            favorites.includes(tool.id) 
                              ? "bg-rose/20 border-rose/40 text-rose shadow-[0_0_15px_rgba(244,63,94,0.3)]" 
                              : "bg-tint/5 border-tint/5 text-muted hover:text-tint hover:bg-tint/10"
                          }`}
                        >
                          <Heart 
                            size={16} 
                            fill={favorites.includes(tool.id) ? "currentColor" : "none"} 
                            className={`transition-all duration-300 ${favorites.includes(tool.id) ? "scale-110" : "scale-100"}`}
                          />
                          {favorites.includes(tool.id) && (
                            <motion.span 
                              initial={{ scale: 0, opacity: 0.8 }}
                              animate={{ scale: 2, opacity: 0 }}
                              className="absolute inset-0 rounded-xl bg-rose/40 pointer-events-none"
                            />
                          )}
                        </motion.button>
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-black text-tint mb-3 group-hover:translate-x-1 transition-transform">{tool.title}</h3>
                    <p className="text-sm text-muted leading-relaxed mb-8 flex-1">{tool.desc}</p>
                    <div className="flex items-center gap-2 text-blue font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                      Open Tool <ChevronRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center bg-tint/3 border border-dashed border-tint/10 rounded-[32px]"
            >
              <div className="w-16 h-16 bg-rose/10 text-rose rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-display font-black text-tint mb-2">No Favorites Yet</h3>
              <p className="text-muted text-sm max-w-[300px] mx-auto">
                {filter === "Favorites" 
                  ? "Click the heart on any tool to save it here for quick access."
                  : "No tools match your current search or filter."}
              </p>
              {filter === "Favorites" && (
                <button 
                  onClick={() => setFilter("All")}
                  className="mt-8 text-blue text-xs font-black uppercase tracking-widest hover:underline"
                >
                  Explore All Tools
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* TOOL MODAL */}
      <AnimatePresence>
        {activeTool && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeTool}
              className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-[800px] max-h-[90vh] bg-bgCard border border-tint/10 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-8 border-b border-tint/10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-tint/5 rounded-2xl" style={{ color: activeTool.color }}>
                    {activeTool.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-black text-tint leading-tight">{activeTool.title}</h2>
                    <div className="text-[0.6rem] text-mutedL font-black uppercase tracking-widest mt-1">Toolbox / {activeTool.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => toggleFavorite(e, activeTool.id)}
                    className={`group relative w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      favorites.includes(activeTool.id) 
                        ? "bg-rose/20 border-rose/40 text-rose shadow-[0_0_20px_rgba(244,63,94,0.4)]" 
                        : "bg-tint/5 border-tint/10 text-tint hover:bg-tint/10"
                    }`}
                  >
                    <Heart 
                      size={20} 
                      fill={favorites.includes(activeTool.id) ? "currentColor" : "none"} 
                      className={`transition-all duration-300 ${favorites.includes(activeTool.id) ? "scale-110" : "scale-100"}`}
                    />
                    {favorites.includes(activeTool.id) && (
                      <motion.span 
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        className="absolute inset-0 rounded-full bg-rose/40 pointer-events-none"
                      />
                    )}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-bgCard border border-tint/10 rounded-lg text-[0.6rem] font-bold text-tint opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {favorites.includes(activeTool.id) ? "Remove from Favorites" : "Add to Favorites"}
                    </div>
                  </motion.button>
                  <button 
                    onClick={closeTool}
                    className="w-12 h-12 rounded-full bg-tint/5 border border-tint/10 flex items-center justify-center text-tint hover:bg-tint/10 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <ToolStateProvider toolId={activeTool.id}>
                  <activeTool.component accent={activeTool.color} />
                </ToolStateProvider>
                
                {activeTool.longDesc && (
                  <div className="mt-12 pt-10 border-t border-tint/5">
                    <h3 className="text-lg font-bold text-tint mb-4">How it works</h3>
                    <p className="text-muted text-sm leading-relaxed whitespace-pre-wrap">
                      {activeTool.longDesc}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-tint/5 bg-tint/3 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2 text-muted text-[0.65rem] font-bold">
                  <AlertCircle size={14} className="text-amber" />
                  Educational tool. Results are estimates.
                </div>
                <button 
                   onClick={() => navigate("/contact")}
                   className="text-tint text-[0.65rem] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                >
                   Need specialized advice? <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="py-20 bg-surface border-y border-tint/5">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-black text-tint mb-6">Built for Scaling Founders</h2>
          <p className="text-muted max-w-[500px] mx-auto mb-10">These tools are based on industry standards for Top-100 apps. Use them to validate your unit economics and strategy.</p>
          <button 
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-3 bg-invert text-bg px-10 py-5 rounded-2xl text-lg font-display font-black hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
          >
            Start a Private Project
            <ArrowLeft className="rotate-[135deg]" size={20} />
          </button>
        </div>
      </div>

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
