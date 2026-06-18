import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isScattered: boolean;
}

export const ParticleText: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 80 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const initParticles = () => {
      const dpr = window.devicePixelRatio || 1;
      
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Scale context to match physical CSS pixels
      ctx.scale(dpr, dpr);
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      // Calculate responsive font size similar to Tailwind classes:
      // text-6xl (60px) to text-[100px]
      const fontSize = Math.min(100, Math.max(50, width * 0.16));
      ctx.font = `900 ${fontSize}px "DM Sans", sans-serif`;
      
      // Try to apply letter-spacing if supported by browser
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '10px';
      }
      
      ctx.fillText('NEONIX', 0, height / 2);
      
      // Read the pixel data back (considering DPR)
      // Since getImageData gets raw physical pixels, we need to read from the scaled canvas width
      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, width, height);
      
      const particlesArray: Particle[] = [];
      
      // Guarantee a tighter step for high density, but protect from crashing
      const step = Math.max(2, Math.floor((width * dpr) / 800));
      
      for (let y = 0, y2 = textCoordinates.height; y < y2; y += step) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x += step) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
            // Map raw physical coordinates back to logical CSS coordinates
            const logicalX = x / dpr;
            const logicalY = y / dpr;
            
            // Add sub-pixel jitter to completely destroy any visible "grid/matrix" pattern
            const jitterX = (Math.random() - 0.5) * 1.5;
            const jitterY = (Math.random() - 0.5) * 1.5;
            
            const finalX = logicalX + jitterX;
            const finalY = logicalY + jitterY;
            
            particlesArray.push({
              // Start particles at their assembled positions
              x: finalX,
              y: finalY,
              baseX: finalX,
              baseY: finalY,
              vx: 0,
              vy: 0,
              size: Math.random() * 0.5 + 0.9, // 0.9 to 1.4px radius (ensure overlapping to look solid)
              color: '#ffffff', // Strictly white
              isScattered: false
            });
          }
        }
      }
      
      particlesRef.current = particlesArray;
    };

    // Ensure fonts are loaded before initializing text
    document.fonts.ready.then(() => {
      initParticles();
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const mouse = mouseRef.current;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repel from mouse (explode outward)
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          // Apply strong push
          const directionX = forceDirectionX * force * 25;
          const directionY = forceDirectionY * force * 25;
          
          p.vx -= directionX;
          p.vy -= directionY;
          p.isScattered = true;
        }
        
        // Spring back to target
        p.vx += (p.baseX - p.x) * 0.04; // Adjust for 1.2-1.5s ease out
        p.vy += (p.baseY - p.y) * 0.04;
        
        // Friction / damping
        p.vx *= 0.82;
        p.vy *= 0.82;
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Draw
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Debounce resize
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        initParticles();
      }, 200);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      
      // When mouse leaves, particles naturally spring back to their baseX/baseY
      // because of the spring physics in the animation loop. We just reset the flag.
      particlesRef.current.forEach(p => {
        p.isScattered = false;
      });
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Mobile Touch support
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // prevent scrolling while playing with particles
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
    };
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative h-[80px] sm:h-[100px] md:h-[120px] lg:h-[140px] mb-2 sm:mb-4">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};
