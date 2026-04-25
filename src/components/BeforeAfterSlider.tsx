import { useState, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({ 
  beforeImage, 
  afterImage, 
  beforeLabel = "Before", 
  afterLabel = "After" 
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseDown = (e: ReactMouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: ReactMouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] mx-auto rounded-[2rem] overflow-hidden cursor-ew-resize select-none border border-tint/10 shadow-2xl group"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After Image (Base) */}
      <div className="absolute inset-0 w-full h-full">
        <img src={afterImage} alt="After" className="w-full h-full object-cover pointer-events-none" />
        <div className="absolute top-6 right-6 bg-blue/80 backdrop-blur-xl text-white text-[0.7rem] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl border border-white/10">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img src={beforeImage} alt="Before" className="w-full h-full object-cover pointer-events-none grayscale" />
        <div className="absolute inset-0 bg-blue/5 pointer-events-none" />
        <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-xl text-white text-[0.7rem] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-2xl border border-white/10">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-invert cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-transform"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-invert rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform">
          <div className="flex gap-1.5">
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
