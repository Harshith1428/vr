import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { VapourText } from './VapourText';

// Using 240 frames from the video-3 sequence
const frameCount = 240;
const frames = Array.from({ length: frameCount }, (_, i) => 
  `/video-3/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

export function ThirdScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const images = useRef<HTMLImageElement[]>([]);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Preload first 10 images
    images.current = [];
    for (let i = 1; i <= Math.min(10, frameCount); i++) {
      const img = new Image();
      img.src = frames[i - 1];
      images.current.push(img);
    }
    
    // Lazy load the rest
    setTimeout(() => {
      for (let i = 11; i <= frameCount; i++) {
        const img = new Image();
        img.src = frames[i - 1];
        images.current.push(img);
      }
    }, 2500);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for opaque images
    if (!ctx) return;

    function renderFrame(index: number) {
      if (!ctx || !canvas) return;
      const img = images.current[Math.floor(index)];
      if (img && img.complete) {
        // Set canvas internal resolution to match the exact image resolution.
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    }

    // Map the scroll progress THROUGH THIS SPECIFIC CONTAINER to the frame sequence
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      const scrollableDistance = rect.height - window.innerHeight;
      let scrollFraction = -rect.top / scrollableDistance;
      
      if (scrollFraction < 0) scrollFraction = 0;
      if (scrollFraction > 1) scrollFraction = 1;
      
      targetFrame.current = scrollFraction * (frameCount - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    // Smooth interpolation for silky smooth playback
    const tick = () => {
      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.1;
      renderFrame(currentFrame.current);
      animationRef.current = requestAnimationFrame(tick);
    };
    tick();

    // Make sure the first frame renders immediately when loaded
    if (images.current[0]) {
      images.current[0].onload = () => renderFrame(0);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black z-30 mb-0 pb-0 h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        
        {/* 
          Using canvas for instant hardware-accelerated frame updates without image decode lag (blurriness).
          We use CSS object-fit: contain to handle the scaling flawlessly without cropping.
        */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ objectPosition: 'center top' }}
        />
          
        {/* Animated Text Overlay */}
        <div 
          className="absolute bottom-16 left-8 md:bottom-20 md:left-16 flex flex-col items-start gap-4 z-20 w-[90%] md:w-auto"
        >
          {/* Small Top Label */}
          <VapourText 
            text="NEXT GENERATION" 
            className="text-white/60 text-xs md:text-sm font-bold tracking-[0.3em] uppercase" 
            delay={0.1}
          />
          
          {/* Main Headline */}
          <VapourText 
            text="Feel Everything" 
            className="text-white text-5xl md:text-7xl lg:text-[80px] font-black leading-none tracking-tight" 
            delay={0.4}
          />
          
          {/* Subtitle */}
          <VapourText 
            text="VR experiences built for the future" 
            className="text-white/70 text-sm md:text-base max-w-sm font-light tracking-wide leading-relaxed" 
            delay={0.8}
          />
          
          {/* CTA Button */}
          <button 
            className="mt-2 group relative px-8 py-3 rounded-full border border-white/40 text-white font-medium text-sm transition-all duration-300 hover:bg-white hover:text-black hover:border-white overflow-hidden animate-fade-in"
            style={{ animationDelay: '1.5s', animationFillMode: 'both' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Discover More
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
