import React from "react";
import { motion } from "motion/react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { 
  Target, 
  CheckCircle2, 
  Smile, 
  BarChart3, 
  Calendar, 
  Bell, 
  ShieldCheck, 
  Palette, 
  Smartphone, 
  Zap,
  ArrowRight,
  Plus,
  GripVertical
} from "lucide-react";
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Task {
  id: string;
  text: string;
  tag: string;
  completed: boolean;
}

export default function Ritual() {
  const [tasks, setTasks] = React.useState<Task[]>([
    { id: '1', text: 'Log your morning mood', tag: 'MOOD', completed: true },
    { id: '2', text: 'Complete a 10-min meditation', tag: 'HABIT', completed: true },
    { id: '3', text: 'Organize work tasks with tags', tag: 'TASKS', completed: true },
    { id: '4', text: 'Check monthly review insights', tag: 'ANALYTICS', completed: false },
    { id: '5', text: 'Add Ritual widget to home screen', tag: 'WIDGETS', completed: false },
  ]);

  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [logoLoadError, setLogoLoadError] = React.useState(false);
  const [streakDays, setStreakDays] = React.useState<boolean[]>(
    Array.from({ length: 28 }, (_, i) => i < 22) // 22 day streak
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const sage = "#8FB37B";
  const darkSurface = "#1A1A1A";

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden font-sans">
      <SEO 
        title="Ritual Habit Tracker App" 
        description="Discover Ritual, our flagship habit tracking app. Build better routines, track your progress, and achieve your goals with our beautifully designed Android application." 
        url="https://pocketuse.com/ritual" 
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-[180px] pb-32 px-6 md:px-12 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#8FB37B]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-[#8FB37B]/10 border border-[#8FB37B]/20 rounded-full px-4 py-1.5 text-[0.75rem] font-bold text-[#8FB37B] uppercase tracking-[0.2em] mb-8">
                <div className="w-6 h-6 rounded-md overflow-hidden bg-[#8FB37B]/20 flex items-center justify-center">
                  {!logoLoadError ? (
                    <img
                      src="/ritual-logo.png"
                      alt="Ritual logo"
                      className="w-full h-full object-cover"
                      onError={() => setLogoLoadError(true)}
                    />
                  ) : (
                    <Zap size={13} />
                  )}
                </div>
                Your Daily Companion
              </div>
              <h1 className="text-[clamp(3.5rem,7vw,5.5rem)] font-serif font-bold leading-[1] tracking-tight text-tint mb-8">
                Harmonize Your <span className="text-[#8FB37B]">Daily Rituals.</span>
              </h1>
              <p className="text-[1.25rem] text-text-secondary leading-relaxed max-w-[550px] font-light mb-12">
                A beautifully crafted personal growth companion designed to help you balance habits, tasks, and emotional well-being.
              </p>

              <div className="inline-flex items-center gap-2 bg-[#8FB37B]/10 border border-[#8FB37B]/25 rounded-full px-4 py-1.5 text-[0.72rem] font-bold text-[#8FB37B] uppercase tracking-[0.18em] mb-8">
                Available on Android
              </div>
              
              <div className="flex flex-wrap gap-5">
                <button className="bg-[#8FB37B] text-[#0D0D0D] font-display font-bold px-10 py-4.5 rounded-2xl hover:scale-105 transition-all flex items-center gap-2 group shadow-[0_10px_30px_rgba(143,179,123,0.3)]">
                  Start Your Ritual
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-3 px-6 py-4.5 text-tint font-bold">
                  <span className="text-[#8FB37B]">Habits</span> • <span>Todo</span> • <span>Mood</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              {/* App Mockup Representation */}
              <div className="relative mx-auto w-full max-w-[340px] aspect-[9/19.5] bg-surface-dark rounded-[3rem] border-[8px] border-border shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Mockup Content - Inspired by Screenshot 1 */}
                <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-6 h-6 rounded-lg bg-tint/5 border border-tint/10 flex items-center justify-center text-[10px]">⚙️</div>
                    <div className="font-serif font-bold text-xl tracking-widest">RITUAL</div>
                    <div className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] text-text-tertiary uppercase tracking-widest mb-2">Mon, Apr 6</div>
                  <div className="text-3xl font-serif font-bold mb-8">Good evening.</div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#2D3A26] p-4 rounded-3xl aspect-square flex flex-col justify-between">
                      <Zap size={16} className="text-[#8FB37B]" />
                      <div>
                        <div className="text-[8px] uppercase tracking-widest text-[#8FB37B]/70 mb-1">Current Streak</div>
                        <div className="text-lg font-bold text-[#8FB37B]">1 day streak</div>
                      </div>
                    </div>
                    <div className="bg-surface p-4 rounded-3xl aspect-square flex flex-col justify-between">
                      <CheckCircle2 size={16} className="text-tint/40" />
                      <div>
                        <div className="text-[8px] uppercase tracking-widest text-tint/40 mb-1">Progress</div>
                        <div className="text-lg font-bold">8/8 done</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface p-5 rounded-3xl mb-8 border border-tint/5">
                    <p className="text-[11px] italic text-text-secondary leading-relaxed mb-3">
                      "Go confidently in the direction of your dreams. Live the life you have imagined."
                    </p>
                    <div className="text-[8px] font-bold text-[#8FB37B] uppercase tracking-widest">— Henry David Thoreau</div>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-[#8FB37B] w-full py-3 rounded-2xl flex items-center justify-center gap-2 text-[#0D0D0D] font-bold text-xs mb-8">
                      <Plus size={14} /> CREATE NEW HABIT
                    </div>
                    
                    {/* Bottom Nav Mockup */}
                    <div className="bg-surface/80 backdrop-blur-md rounded-full p-2 flex justify-around items-center border border-tint/5">
                      <div className="w-8 h-8 rounded-full bg-[#2D3A26] flex items-center justify-center text-[#8FB37B]"><Zap size={14} /></div>
                      <CheckCircle2 size={14} className="text-tint/30" />
                      <div className="w-4 h-4 rounded-full border-2 border-tint/30" />
                      <Smile size={14} className="text-tint/30" />
                      <Calendar size={14} className="text-tint/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-12 top-1/4 bg-surface border border-tint/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8FB37B]/20 flex items-center justify-center text-[#8FB37B]"><Smile size={18} /></div>
                  <div>
                    <div className="text-[10px] text-text-tertiary uppercase tracking-widest">Mood</div>
                    <div className="text-sm font-bold">Feeling Great</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-16 bottom-1/4 bg-surface border border-tint/10 p-4 rounded-2xl shadow-2xl backdrop-blur-xl hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400"><CheckCircle2 size={18} /></div>
                  <div>
                    <div className="text-[10px] text-text-tertiary uppercase tracking-widest">Tasks</div>
                    <div className="text-sm font-bold">8/8 Completed</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
      <section className="py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[3rem] font-serif font-bold text-tint mb-6">Mindful Features</h2>
            <p className="text-text-secondary text-lg max-w-[600px] mx-auto font-light">
              Ritual transforms self-improvement from a chore into a rewarding daily practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Target className="text-[#8FB37B]" />}
              title="Intelligent Habits"
              description="Flexible scheduling for daily, weekly, or monthly goals with visual streaks."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="text-[#8FB37B]" />}
              title="Task Management"
              description="Bridge the gap between long-term habits and immediate actions with tags."
            />
            <FeatureCard 
              icon={<Smile className="text-[#8FB37B]" />}
              title="Mood Logging"
              description="Connect your habits to your happiness with intuitive emoji-based entries."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-[#8FB37B]" />}
              title="Monthly Insights"
              description="Zoom out and see the big picture with detailed progress statistics."
            />
          </div>
        </div>
      </section>

      {/* THE TRIFECTA SECTION */}
      <section className="py-32 px-6 md:px-12 bg-bg relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-surface2 rounded-[4rem] border border-tint/5 p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[40%] h-full bg-linear-to-l from-[#8FB37B]/5 to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-[2.5rem] md:text-[3.5rem] font-serif font-bold text-tint leading-[1.1] mb-8">
                  The Habit-Task-Mood <span className="text-[#8FB37B]">Trifecta.</span>
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed font-light mb-10">
                  Unlike competitors that focus on only one area, Ritual understands that productivity, consistency, and emotion are deeply interconnected.
                </p>
                
                <div className="space-y-6">
                  <BenefitItem title="All-in-One Synergy" description="Eliminate app fatigue. No more switching between multiple journals." />
                  <BenefitItem title="Premium Aesthetics" description="Distraction-free, zen-like experience with a soothing sage palette." />
                  <BenefitItem title="Total Privacy" description="Your data stays with you. Local storage ensures your reflections remain private." />
                </div>
              </div>
              
              <div className="relative aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full border border-[#8FB37B]/10 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[70%] h-[70%] border border-[#8FB37B]/20 rounded-full"
                  />
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4">
                    <TrifectaNode icon={<Target />} label="Habits" delay={0} />
                    <TrifectaNode icon={<CheckCircle2 />} label="Tasks" delay={0.2} />
                    <div className="col-span-2 flex justify-center">
                      <TrifectaNode icon={<Smile />} label="Mood" delay={0.4} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STREAK VISUALIZATION SECTION */}
      <section className="py-32 px-6 md:px-12 bg-surface-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8FB37B]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto relative z-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-surface2 border border-tint/5 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#8FB37B]/10 flex items-center justify-center text-[#8FB37B]">
                    <Zap size={24} className="animate-pulse" />
                  </div>
                </div>

                <div className="mb-12">
                  <div className="text-[10px] text-[#8FB37B] font-bold uppercase tracking-[0.3em] mb-4">Habit Momentum</div>
                  <h3 className="text-4xl font-serif font-bold text-tint mb-2">Meditation</h3>
                  <p className="text-text-tertiary font-light">Daily • 8:00 AM</p>
                </div>

                <div className="flex items-end gap-8 mb-16">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-tint/5"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364.4}
                        initial={{ strokeDashoffset: 364.4 }}
                        whileInView={{ strokeDashoffset: 364.4 * (1 - 22/30) }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="text-[#8FB37B] drop-shadow-[0_0_8px_rgba(143,179,123,0.5)]"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-serif font-bold text-tint">22</span>
                      <span className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest">Days</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-bold text-tint mb-1">Current Streak</div>
                    <div className="text-[#8FB37B] text-xs font-medium flex items-center gap-1">
                      <ArrowRight size={12} className="-rotate-45" /> Top 5% of users
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-3">
                  {streakDays.map((active, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.02 }}
                      className={`aspect-square rounded-lg border ${
                        active 
                          ? 'bg-[#8FB37B] border-[#8FB37B] shadow-[0_0_15px_rgba(143,179,123,0.3)]' 
                          : 'bg-tint/5 border-tint/5'
                      } transition-all duration-500 hover:scale-110 cursor-pointer`}
                      onClick={() => {
                        const newDays = [...streakDays];
                        newDays[i] = !newDays[i];
                        setStreakDays(newDays);
                      }}
                    />
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between items-center text-[10px] text-text-tertiary font-bold uppercase tracking-widest">
                  <span>Last 4 Weeks</span>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-sm bg-tint/10" /> Missed
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-sm bg-[#8FB37B]" /> Completed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-[3rem] font-serif font-bold text-tint mb-6">Visual <span className="text-[#8FB37B]">Momentum.</span></h2>
              <p className="text-text-secondary text-lg font-light mb-10 leading-relaxed">
                Stay motivated by watching your progress grow visually. Our intuitive streak visualization helps you build consistency through positive reinforcement.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#8FB37B]/10 flex items-center justify-center text-[#8FB37B] flex-shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-tint mb-2">Consistency Heatmaps</h4>
                    <p className="text-text-tertiary text-sm font-light">Identify patterns in your behavior with beautiful, data-driven visualizations.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#8FB37B]/10 flex items-center justify-center text-[#8FB37B] flex-shrink-0">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-tint mb-2">Streak Rewards</h4>
                    <p className="text-text-tertiary text-sm font-light">Unlock custom themes and badges as you hit major milestones in your journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO SECTION */}
      <section className="py-32 px-6 md:px-12 bg-bg">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-[3rem] font-serif font-bold text-tint mb-6">Experience the <span className="text-[#8FB37B]">Flow.</span></h2>
              <p className="text-text-secondary text-lg font-light mb-8 leading-relaxed">
                Our interface is designed to work with you. Try reordering your tasks below to see how Ritual makes organization feel effortless.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-tint/80">
                  <div className="w-6 h-6 rounded-full bg-[#8FB37B]/20 flex items-center justify-center text-[#8FB37B]"><CheckCircle2 size={14} /></div>
                  Smooth Drag & Drop
                </div>
                <div className="flex items-center gap-3 text-tint/80">
                  <div className="w-6 h-6 rounded-full bg-[#8FB37B]/20 flex items-center justify-center text-[#8FB37B]"><CheckCircle2 size={14} /></div>
                  Instant Visual Feedback
                </div>
                <div className="flex items-center gap-3 text-tint/80">
                  <div className="w-6 h-6 rounded-full bg-[#8FB37B]/20 flex items-center justify-center text-[#8FB37B]"><CheckCircle2 size={14} /></div>
                  Tactile Interaction
                </div>
              </div>
            </div>

            <div className="bg-surface2 border border-tint/10 rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(143,179,123,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8FB37B]/5 blur-[60px] pointer-events-none group-hover:bg-[#8FB37B]/10 transition-colors" />
              <div className="flex justify-between items-center mb-10 relative z-2">
                <h3 className="text-2xl font-serif font-bold text-tint">Daily To Do</h3>
                <div className="text-[10px] text-[#8FB37B] font-bold uppercase tracking-widest bg-[#8FB37B]/10 px-3 py-1 rounded-full">
                  Interactive Demo
                </div>
              </div>

              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={tasks.map(t => t.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <SortableTaskItem key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>
                
                <DragOverlay dropAnimation={{
                  sideEffects: defaultDropAnimationSideEffects({
                    styles: {
                      active: {
                        opacity: '0.5',
                      },
                    },
                  }),
                }}>
                  {activeId ? (
                    <div className="bg-surface border border-[#8FB37B]/50 p-5 rounded-2xl shadow-2xl flex items-center gap-4 cursor-grabbing scale-105 transition-transform">
                      <div className="text-tint/20"><GripVertical size={20} /></div>
                      <div className="w-6 h-6 rounded-lg border-2 border-[#8FB37B] flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-[#8FB37B]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-tint font-medium">{tasks.find(t => t.id === activeId)?.text}</div>
                        <div className="text-[10px] text-[#8FB37B] font-bold mt-1">{tasks.find(t => t.id === activeId)?.tag}</div>
                      </div>
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>

              <div className="mt-10 pt-8 border-t border-tint/5">
                <div className="bg-tint/5 rounded-2xl p-4 flex items-center gap-4 text-text-tertiary italic text-sm">
                  <Plus size={18} />
                  Add a task...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 px-6 md:px-12 bg-surface-dark">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-[3rem] font-serif font-bold text-tint mb-6">How It Works</h2>
            <p className="text-text-secondary font-light">Four simple steps to a more intentional life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <Step number="01" title="Define Rituals" description="Add the habits and tasks that matter most to you." />
            <Step number="02" title="Personalize" description="Choose from a library of emojis and colors for each goal." />
            <Step number="03" title="Track Daily" description="Use the app or widgets to check off items as you go." />
            <Step number="04" title="Reflect & Grow" description="Use monthly reviews to celebrate wins and recalibrate." />
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-32 px-6 md:px-12 bg-bg text-center">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-[#8FB37B] mb-8 flex justify-center">
              <Zap size={48} />
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-serif font-bold text-tint italic leading-tight mb-12">
              "Small daily actions create extraordinary results. Start your Ritual today."
            </h2>
            <button className="bg-[#8FB37B] text-[#0D0D0D] font-display font-bold px-12 py-5 rounded-2xl text-xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(143,179,123,0.2)] mb-8">
              Download Ritual
            </button>
            <div className="flex items-center justify-center gap-6 text-sm text-text-tertiary">
              <a href="/ritual/privacy" className="hover:text-[#8FB37B] transition-colors">Privacy Policy</a>
              <span className="w-1 h-1 rounded-full bg-tint/20" />
              <a href="/ritual/terms" className="hover:text-[#8FB37B] transition-colors">Terms of Service</a>
            </div>
          </motion.div>
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
      className="p-8 bg-surface2 border border-tint/5 rounded-[2.5rem] hover:border-[#8FB37B]/30 transition-all group"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#8FB37B]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-bold text-tint mb-3">{title}</h3>
      <p className="text-text-tertiary text-sm leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}

function BenefitItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1.5 w-5 h-5 rounded-full bg-[#8FB37B]/20 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#8FB37B]" />
      </div>
      <div>
        <h4 className="text-tint font-bold mb-1">{title}</h4>
        <p className="text-text-tertiary text-sm font-light">{description}</p>
      </div>
    </div>
  );
}

function TrifectaNode({ icon, label, delay }: { icon: React.ReactNode, label: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      <div className="w-20 h-20 rounded-[2rem] bg-surface border border-tint/10 flex items-center justify-center text-[#8FB37B] shadow-2xl">
        {React.cloneElement(icon as React.ReactElement, { size: 32 })}
      </div>
      <span className="text-sm font-bold text-tint/60 uppercase tracking-widest">{label}</span>
    </motion.div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="relative">
      <div className="text-[5rem] font-serif font-bold text-tint/5 absolute -top-10 -left-4 leading-none select-none">
        {number}
      </div>
      <div className="relative z-2">
        <h3 className="text-xl font-serif font-bold text-tint mb-3">{title}</h3>
        <p className="text-text-tertiary text-sm leading-relaxed font-light">{description}</p>
      </div>
    </div>
  );
}

const SortableTaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`bg-surface border ${isDragging ? 'border-[#8FB37B]/50' : 'border-tint/5'} p-5 rounded-2xl flex items-center gap-4 group transition-colors hover:border-tint/10`}
    >
      <div 
        {...attributes} 
        {...listeners} 
        className="text-tint/10 group-hover:text-tint/30 cursor-grab active:cursor-grabbing transition-colors"
      >
        <GripVertical size={20} />
      </div>
      <div className={`w-6 h-6 rounded-lg border-2 ${task.completed ? 'border-[#8FB37B] bg-[#8FB37B]/10' : 'border-tint/10'} flex items-center justify-center transition-colors`}>
        {task.completed && <CheckCircle2 size={14} className="text-[#8FB37B]" />}
      </div>
      <div className="flex-1">
        <div className={`text-tint font-medium ${task.completed ? 'line-through text-tint/40' : ''} transition-colors`}>
          {task.text}
        </div>
        <div className="text-[10px] text-[#8FB37B] font-bold mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
          {task.tag}
        </div>
      </div>
    </div>
  );
};
