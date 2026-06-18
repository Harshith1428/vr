import React, { useEffect, useRef } from 'react';

// Using 300 frames since the VR-loop-zip contains 300 frames
const frameCount = 300;
const frames = Array.from({ length: frameCount }, (_, i) => 
  `/vr-loop/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

export function SecondScrollAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroup1Ref = useRef<HTMLDivElement>(null);
  const textGroup2TitleRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  
  const images = useRef<HTMLImageElement[]>([]);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
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
    }, 2000);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Keep canvas sized correctly
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrame.current);
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    function renderFrame(index: number) {
      if (!ctx || !canvas) return;
      const img = images.current[Math.floor(index)];
      if (img && img.complete) {
        // Draw image covering the canvas completely (object-fit: cover logic)
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          // Align image to the bottom of the screen to remove any black space below the headset
          offsetY = canvas.height - drawHeight;
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
      
      targetScroll.current = scrollFraction;
      targetFrame.current = scrollFraction * (frameCount - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Helper for calculating opacity
    function getAnimValue(scroll: number, startIn: number, endIn: number, startOut?: number, endOut?: number) {
      if (scroll < startIn) return 0;
      if (scroll >= startIn && scroll <= endIn) return (scroll - startIn) / (endIn - startIn);
      if (!startOut || !endOut) return 1;
      if (scroll > endIn && scroll < startOut) return 1;
      if (scroll >= startOut && scroll <= endOut) return 1 - (scroll - startOut) / (endOut - startOut);
      return 0;
    }

    // Smooth interpolation for silky smooth playback
    const tick = () => {
      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.1;
      currentScroll.current += (targetScroll.current - currentScroll.current) * 0.1;
      
      renderFrame(currentFrame.current);

      const scroll = currentScroll.current;

      // Group 1: Fade in 0.05 to 0.15, fade out 0.25 to 0.35
      if (textGroup1Ref.current) {
        const op = getAnimValue(scroll, 0.05, 0.15, 0.25, 0.35);
        textGroup1Ref.current.style.opacity = op.toString();
        textGroup1Ref.current.style.transform = `translateY(${20 * (1 - op)}px)`;
        textGroup1Ref.current.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
      }

      // Group 2 Title: Fade in 0.35 to 0.45
      if (textGroup2TitleRef.current) {
        const op = getAnimValue(scroll, 0.35, 0.45);
        textGroup2TitleRef.current.style.opacity = op.toString();
        textGroup2TitleRef.current.style.transform = `translateY(${20 * (1 - op)}px)`;
      }

      // Cards: Sequence from 0.45 to 0.85
      const cards = [
        { ref: card1Ref, start: 0.45, end: 0.55 },
        { ref: card2Ref, start: 0.52, end: 0.62 },
        { ref: card3Ref, start: 0.59, end: 0.69 },
        { ref: card4Ref, start: 0.66, end: 0.76 },
        { ref: card5Ref, start: 0.73, end: 0.83 },
      ];

      cards.forEach(card => {
        if (card.ref.current) {
          const op = getAnimValue(scroll, card.start, card.end);
          card.ref.current.style.opacity = op.toString();
          card.ref.current.style.transform = `translateY(${20 * (1 - op)}px) scale(${1 - 0.05 * (1 - op)})`;
          card.ref.current.style.pointerEvents = op > 0.5 ? 'auto' : 'none';
        }
      });

      animationRef.current = requestAnimationFrame(tick);
    };
    tick();

    // Make sure the first frame renders immediately when loaded
    if (images.current[0]) {
      images.current[0].onload = () => renderFrame(0);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-black z-30 mb-0 pb-0" style={{ height: '350vh' }}>
      {/* Sticky container that holds the canvas while scrolling through the space */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Dark overlay to ensure text is readable over the VR video */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Group 1 */}
        <div 
          ref={textGroup1Ref} 
          className="absolute inset-0 flex flex-col justify-center items-center px-6 opacity-0 text-white"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-32 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-between items-start">
              <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8 tracking-tight">
                  We offer next level<br />
                  <span className="italic underline underline-offset-8 decoration-1">solutions</span>
                </h2>
              </div>
              <div className="md:w-1/2 flex flex-col gap-16 mt-4 md:mt-0">
                <p className="text-base md:text-lg leading-relaxed">
                  After working with us, your business will achieve the new heights. We will return to you with in-depth analysis, tailored strategies and business problems solved. We transform your problems. After working with us, your business will achieve the new heights.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-12 justify-between border-t border-white/30 pt-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl md:text-4xl font-medium tracking-tight">43k<sup className="text-lg md:text-xl">$</sup></span>
                    <span className="text-[10px] tracking-widest uppercase font-semibold">Average Revenue</span>
                    <span className="text-[8px] md:text-[9px] uppercase opacity-70">Lorem ipsum dolor sit amet<br/>consectetur adipiscing elit</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl md:text-4xl font-medium tracking-tight">200<sup className="text-lg md:text-xl">+</sup></span>
                    <span className="text-[10px] tracking-widest uppercase font-semibold">Campaigns</span>
                    <span className="text-[8px] md:text-[9px] uppercase opacity-70">Lorem ipsum dolor sit amet<br/>consectetur adipiscing elit</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-3xl md:text-4xl font-medium tracking-tight">380<sup className="text-lg md:text-xl">+</sup></span>
                    <span className="text-[10px] tracking-widest uppercase font-semibold">Successful Projects</span>
                    <span className="text-[8px] md:text-[9px] uppercase opacity-70">Lorem ipsum dolor sit amet<br/>consectetur adipiscing elit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Group 2 */}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-white pointer-events-none">
          <div className="max-w-7xl w-full relative flex flex-col items-center justify-center min-h-[600px]">
            
            <div ref={textGroup2TitleRef} className="text-center max-w-2xl mx-auto mb-16 relative z-30 opacity-0">
              <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase leading-loose">
                Let us unleash your business potential to<br/>
                the highest possible degree.<br/>
                Working with us will provide you<br/>
                long term growth.
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.95] tracking-tight text-center z-10 relative mt-6">
                you come to us<br/>
                with<br/>
                <span className="italic">(challenges),</span><br/>
                we turn them into<br/>
                opportunities
              </h2>
            </div>

            {/* Cards positioned around the text to match the image */}
            <div className="w-full lg:absolute lg:inset-0 mt-20 lg:mt-0 flex flex-col sm:grid sm:grid-cols-2 lg:block gap-6">
              
              {/* Card 1 - Top Left */}
              <div ref={card1Ref} className="opacity-0 lg:absolute lg:top-[10%] lg:left-[2%] w-full lg:w-56 border border-[rgba(255,255,255,0.15)] p-5 rounded-2xl bg-[rgba(255,255,255,0.08)] backdrop-blur-[12px] flex-col gap-5 z-20 flex pointer-events-auto transition-transform hover:scale-105">
                <div className="w-8 h-8 rounded border border-white/50 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-[11px] leading-relaxed">
                  We can offer you a winning ecommerce strategy built on a solid platform & systems.
                </p>
              </div>

              {/* Card 2 - Top Right */}
              <div ref={card2Ref} className="opacity-0 lg:absolute lg:top-[20%] lg:right-[8%] w-full lg:w-56 border border-[rgba(255,255,255,0.15)] p-5 rounded-2xl bg-[rgba(255,255,255,0.08)] backdrop-blur-[12px] flex-col gap-5 z-20 flex pointer-events-auto transition-transform hover:scale-105">
                <div className="w-8 h-8 rounded border border-white/50 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Our sales and CRO work generates real ROI and fast results for the clients (short term).
                </p>
              </div>

              {/* Card 3 - Bottom Left */}
              <div ref={card3Ref} className="opacity-0 lg:absolute lg:bottom-[5%] lg:left-[12%] w-full lg:w-56 border border-[rgba(255,255,255,0.15)] p-5 rounded-2xl bg-[rgba(255,255,255,0.08)] backdrop-blur-[12px] flex-col gap-5 z-20 flex pointer-events-auto transition-transform hover:scale-105">
                <div className="w-8 h-8 rounded border border-white/50 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3" />
                  </svg>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Our profit-driven SEO & PPC — we lead with ROI and strategies to hit metrics.
                </p>
              </div>

              {/* Card 4 - Bottom Center */}
              <div ref={card4Ref} className="opacity-0 lg:absolute lg:bottom-[2%] lg:left-[42%] w-full lg:w-56 border border-[rgba(255,255,255,0.15)] p-5 rounded-2xl bg-[rgba(255,255,255,0.08)] backdrop-blur-[12px] flex-col gap-5 z-20 flex pointer-events-auto transition-transform hover:scale-105">
                <div className="w-8 h-8 rounded border border-white/50 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Managing your modern campaigns and tracking translation to make sure we fix endless struggles.
                </p>
              </div>

              {/* Card 5 - Bottom Right */}
              <div ref={card5Ref} className="opacity-0 lg:absolute lg:bottom-[10%] lg:right-[3%] w-full lg:w-64 border border-[rgba(255,255,255,0.15)] p-6 rounded-2xl bg-[rgba(255,255,255,0.08)] backdrop-blur-[12px] flex-col gap-5 z-20 flex pointer-events-auto transition-transform hover:scale-105">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center self-end">
                  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
                  </svg>
                </div>
                <p className="text-[11px] leading-relaxed">
                  We run the best SEO campaigns to get results.
                  <br/><br/>
                  We provide relevant strategies including research analysis, local SEO, and logging analytics, ensuring long term viability and business growth.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

