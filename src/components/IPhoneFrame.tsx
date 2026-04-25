import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, ReactNode, useState, MouseEvent } from "react";

interface IPhoneFrameProps {
  children?: ReactNode;
  className?: string;
}

export function IPhoneFrame({ children, className = "" }: IPhoneFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse tilt
  const springConfig = { damping: 30, stiffness: 120 };
  const mouseTiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);
  const mouseTiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  
  // Parallax translation
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  // Scroll-based rotation
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full flex items-center justify-center perspective-[1500px] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Floating Glow Effect */}
      <motion.div
        style={{
          x: translateX,
          y: translateY,
          rotateX: isHovering ? mouseTiltX : scrollRotateX,
          rotateY: isHovering ? mouseTiltY : scrollRotateY,
        }}
        className="absolute w-[300px] h-[580px] bg-blue/20 rounded-[60px] blur-[80px] pointer-events-none z-0"
      />

      <motion.div
        style={{
          rotateX: isHovering ? mouseTiltX : scrollRotateX,
          rotateY: isHovering ? mouseTiltY : scrollRotateY,
          x: translateX,
          y: translateY,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovering ? 0 : [0, -15, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        className="relative w-[280px] h-[560px] rounded-[48px] bg-surface-dark border-[1px] border-tint/15 iphone-shadow overflow-hidden cursor-pointer shadow-[0_0_40px_rgba(59,130,255,0.15)]"
      >
        {/* Bezel/Frame highlight */}
        <div className="absolute inset-0 rounded-[48px] border-[4px] border-tint/5 pointer-events-none z-30" />
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-bg rounded-b-2xl z-40 mt-3 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-tint/5" />
            <div className="w-8 h-1.5 rounded-full bg-tint/5" />
        </div>
        
        {/* Screen Content with internal parallax */}
        <motion.div 
          style={{ 
            transformStyle: "preserve-3d",
            translateZ: 20
          }}
          className="absolute inset-[10px] bg-linear-to-br from-surface to-surface2 rounded-[38px] z-10 overflow-hidden border border-tint/5"
        >
          {children}
        </motion.div>

        {/* Side Buttons (Visual only) */}
        <div className="absolute -left-[1px] top-28 w-[3px] h-12 bg-tint/20 rounded-r-sm z-20" />
        <div className="absolute -left-[1px] top-44 w-[3px] h-16 bg-tint/20 rounded-r-sm z-20" />
        <div className="absolute -right-[1px] top-36 w-[3px] h-20 bg-tint/20 rounded-l-sm z-20" />

        {/* Reflection/Glare */}
        <motion.div 
          style={{
            x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]),
            y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]),
          }}
          className="absolute inset-0 bg-linear-to-tr from-transparent via-tint/5 to-transparent pointer-events-none z-50"
        />
      </motion.div>
    </div>
  );
}
