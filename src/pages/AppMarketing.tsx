import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { IPhoneFrame } from "../components/IPhoneFrame";
import { 
  TrendingUp, 
  Search, 
  BarChart, 
  Target, 
  Users, 
  MessageSquare,
  Bell,
  Rocket,
  MousePointer2,
  PieChart,
  Share2,
  Zap,
  Star
} from "lucide-react";

export default function AppMarketing() {
  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <SEO 
        title="App Marketing & Growth Strategies" 
        description="Data-driven app marketing, ASO, user acquisition, and retention strategies to scale your mobile app to millions of users." 
        url="https://pocketuse.com/app-marketing" 
      />
      <Navbar />

      {/* HERO */}
      <section className="relative pt-[180px] pb-20 px-6 md:px-12 overflow-hidden grid-bg">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-violet/35 rounded-full blur-[120px] pointer-events-none opacity-50" />
        
        <div className="max-w-[1160px] mx-auto text-center relative z-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hud-label justify-center mb-8">
              User Acquisition
            </div>
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-display font-extrabold leading-[1.05] tracking-tight text-tint mb-6">
              Data-Driven <span className="grad-text">App Marketing</span>
            </h1>
            <p className="text-[1.15rem] text-text-secondary leading-relaxed max-w-[700px] mx-auto font-light mb-12">
              Building the app is just the start. We drive <span className="text-editorial text-violet">sustainable growth</span> through strategic acquisition, retention, and optimization that turns downloads into loyal users.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-25 px-6 md:px-12 bg-surface relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketingFeatureCard 
              icon={<Search className="text-violet" />}
              title="App Store Optimization"
              description="Improve visibility and organic downloads with keyword research, metadata optimization, and A/B testing."
            />
            <MarketingFeatureCard 
              icon={<Target className="text-blue" />}
              title="Paid Acquisition"
              description="High-ROI campaigns across Apple Search Ads, Google App Campaigns, and social media platforms."
            />
            <MarketingFeatureCard 
              icon={<Users className="text-violet" />}
              title="Retention Strategy"
              description="Lifecycle marketing, push notifications, and in-app messaging to keep users coming back."
            />
            <MarketingFeatureCard 
              icon={<BarChart className="text-blue" />}
              title="Conversion Optimization"
              description="Data-driven analysis of your user funnel to identify and fix friction points in the journey."
            />
            <MarketingFeatureCard 
              icon={<PieChart className="text-violet" />}
              title="Advanced Analytics"
              description="Deep-dive reporting on LTV, CAC, and retention cohorts to guide your growth decisions."
            />
            <MarketingFeatureCard 
              icon={<Share2 className="text-blue" />}
              title="Viral Loops"
              description="Engineering social sharing and referral programs that turn your users into your best advocates."
            />
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="py-25 px-6 md:px-12 bg-bg relative">
        <div className="max-w-[1160px] mx-auto">
          <div className="flex flex-col gap-25">
            <MarketingDetailSection 
              title="App Store Optimization (ASO)"
              subtitle="Organic Growth Engine"
              description="ASO is the foundation of mobile growth. We optimize every element of your store presence to ensure you rank for the right keywords and convert visitors into users."
              image={
                <IPhoneFrame className="h-[420px] w-[210px]">
                  <div className="w-full h-full bg-surface-dark flex flex-col p-4 pt-12">
                    <div className="bg-tint/5 border border-tint/10 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-violet/20 flex items-center justify-center text-violet">
                          <Star size={16} fill="currentColor" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 w-20 bg-tint/20 rounded-full mb-1" />
                          <div className="h-1.5 w-12 bg-tint/10 rounded-full" />
                        </div>
                      </div>
                      <div className="h-1 w-full bg-tint/5 rounded-full overflow-hidden">
                        <motion.div 
                          animate={{ width: ["0%", "85%"] }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="h-full bg-violet"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-10 bg-tint/3 border border-tint/5 rounded-lg flex items-center px-3 gap-3">
                          <div className="w-4 h-4 rounded bg-tint/10" />
                          <div className="h-2 flex-1 bg-tint/10 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </IPhoneFrame>
              }
              features={[
                "Keyword research & competitive analysis",
                "Title, subtitle, and description optimization",
                "Screenshot & video preview A/B testing",
                "Rating & review management strategy",
                "Localization for global market expansion"
              ]}
              reversed={false}
            />

            <MarketingDetailSection 
              title="Paid User Acquisition"
              subtitle="Scalable Performance"
              description="We manage performance marketing campaigns that focus on quality over quantity. Our goal is to find high-LTV users at a sustainable cost per acquisition."
              image={
                <div className="relative w-full max-w-[300px] aspect-square bg-linear-to-br from-violet/10 to-blue/10 rounded-[40px] border border-tint/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-2 text-violet"
                  >
                    <Target size={120} strokeWidth={1} />
                  </motion.div>
                </div>
              }
              features={[
                "Apple Search Ads (ASA) management",
                "Google App Campaigns (UAC)",
                "Meta, TikTok, and Twitter ad management",
                "Creative strategy & ad production",
                "Attribution setup & fraud prevention"
              ]}
              reversed={true}
            />

            <MarketingDetailSection 
              title="Retention & Engagement"
              subtitle="The Loyalty Loop"
              description="Acquiring a user is only half the battle. We implement sophisticated lifecycle marketing strategies that keep users engaged and prevent churn."
              image={
                <IPhoneFrame className="h-[420px] w-[210px]">
                  <div className="w-full h-full bg-surface-dark flex flex-col p-4 pt-12">
                    <div className="space-y-3">
                      <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-violet/20 border border-violet/30 rounded-xl p-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Bell size={12} className="text-violet" />
                          <div className="h-1.5 w-16 bg-violet/40 rounded-full" />
                        </div>
                        <div className="h-1 w-full bg-violet/20 rounded-full" />
                      </motion.div>
                      <motion.div 
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-blue/20 border border-blue/30 rounded-xl p-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquare size={12} className="text-blue" />
                          <div className="h-1.5 w-20 bg-blue/40 rounded-full" />
                        </div>
                        <div className="h-1 w-full bg-blue/20 rounded-full" />
                      </motion.div>
                    </div>
                    <div className="mt-auto flex justify-center pb-8">
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-violet"
                      >
                        <Users size={48} />
                      </motion.div>
                    </div>
                  </div>
                </IPhoneFrame>
              }
              features={[
                "Personalized push notification campaigns",
                "In-app messaging & user onboarding flows",
                "Email marketing & re-engagement",
                "Subscription & monetization optimization",
                "Churn prediction & win-back strategies"
              ]}
              reversed={false}
            />
          </div>
        </div>
      </section>

      {/* GROWTH STACK */}
      <section className="py-25 px-6 md:px-12 bg-surface text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[2.5rem] font-display font-extrabold tracking-tight text-tint mb-6">Our Growth Stack</h2>
          <p className="text-text-secondary mb-12">We use industry-leading tools to measure, analyze, and scale your app's performance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Adjust", "AppsFlyer", "Mixpanel", "Amplitude", "RevenueCat", "Firebase", "Braze", "OneSignal", "AppTweak", "SensorTower"].map((tool) => (
              <span key={tool} className="px-5 py-2.5 bg-tint/5 border border-tint/10 rounded-xl text-sm font-semibold text-tint">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function MarketingFeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 bg-surface2 border border-tint/7 rounded-2xl hover:border-violet/30 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-tint/5 flex items-center justify-center mb-6 text-xl border border-tint/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-tint mb-3">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function MarketingDetailSection({ title, subtitle, description, image, features, reversed }: { title: string, subtitle: string, description: string, image: React.ReactNode, features: string[], reversed: boolean }) {
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${reversed ? "lg:flex-row-reverse" : ""}`}>
      <div className="flex-1">
        <div className="text-violet font-bold uppercase tracking-widest text-xs mb-3">{subtitle}</div>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-tint mb-6">{title}</h2>
        <p className="text-text-secondary leading-relaxed mb-8 font-light">{description}</p>
        <ul className="space-y-4">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-text-primary">
              <div className="w-5 h-5 rounded-full bg-violet/20 flex items-center justify-center text-violet">
                <Rocket size={12} />
              </div>
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet/20 rounded-full blur-[80px] pointer-events-none opacity-30" />
          {image}
        </div>
      </div>
    </div>
  );
}
