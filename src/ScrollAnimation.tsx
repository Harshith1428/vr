import React, { useEffect, useRef } from 'react';

const ScrollAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const frameCount = 188;
  const images = useRef<HTMLImageElement[]>([]);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  
  const getFrameUrl = (index: number) => {
    const paddedIndex = index.toString().padStart(3, '0');
    return `/ezgif-frame-${paddedIndex}.jpg`;
  };

  useEffect(() => {
    let animationFrameId: number;
    
    // Preload first 10 images immediately so it renders fast
    images.current = [];
    for (let i = 1; i <= Math.min(10, frameCount); i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images.current.push(img);
    }
    
    // Lazy load the rest after a delay to prevent clogging the network tab
    setTimeout(() => {
      for (let i = 11; i <= frameCount; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        images.current.push(img);
      }
    }, 1500);

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const render = (index: number) => {
      // Ensure index is valid and integer
      const validIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(index)));
      const img = images.current[validIndex];
      if (img && img.complete && img.width > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate ratio for object-cover
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };
    
    // Initial draw
    const img0 = new Image();
    img0.src = getFrameUrl(1);
    img0.onload = () => {
      render(0);
    };
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const mainElement = document.querySelector('main');
      
      // If we have a main element, map the animation to finish when we scroll past it
      const maxScroll = mainElement 
        ? mainElement.offsetHeight + mainElement.offsetTop - (window.innerHeight / 2)
        : document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
      let scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      
      if (scrollFraction < 0) scrollFraction = 0;
      if (scrollFraction > 1) scrollFraction = 1;
      
      targetFrame.current = scrollFraction * (frameCount - 1);
    };
    
    // Smooth frame interpolation loop
    const updateFrame = () => {
      // Lerp frame
      currentFrame.current += (targetFrame.current - currentFrame.current) * 0.1;
      
      // Optimization: only render if difference is notable
      if (Math.abs(currentFrame.current - targetFrame.current) > 0.01) {
        render(currentFrame.current);
      } else {
        // Ensure final frame matches target closely when idle
        render(targetFrame.current);
      }
      
      animationFrameId = requestAnimationFrame(updateFrame);
    };
    
    updateFrame();
    
    const handleResize = () => {
      if (canvasRef.current) {
        // High DPI canvas support
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        context.scale(dpr, dpr);
        
        // Reset CSS size
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        
        render(currentFrame.current);
      }
    };
    
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" id="scroll-animation-bg">
      <canvas ref={canvasRef} className="w-full h-full object-cover opacity-80" />
      {/* Optional gradient overlay to blend with the black theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
    </div>
  );
};

export default ScrollAnimation;
