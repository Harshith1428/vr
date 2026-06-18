import React from 'react';

const frames = Array.from({ length: 300 }, (_, i) => 
  `/vr-loop/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
);

export function MarqueeAnimation() {
  return (
    <section className="relative z-30 bg-black w-full overflow-hidden py-16 md:py-24 border-t border-white/5">
      <div className="flex w-max animate-marquee hover-pause-none">
        {/* First set of images */}
        <div className="flex">
          {frames.map((src, idx) => (
            <img 
              key={`first-${idx}`} 
              src={src} 
              alt={`Frame ${idx + 1}`} 
              className="h-32 sm:h-48 md:h-64 object-cover flex-shrink-0 mx-2 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
              loading="lazy"
            />
          ))}
        </div>
        {/* Duplicated set for seamless looping */}
        <div className="flex">
          {frames.map((src, idx) => (
            <img 
              key={`second-${idx}`} 
              src={src} 
              alt={`Frame ${idx + 1}`} 
              className="h-32 sm:h-48 md:h-64 object-cover flex-shrink-0 mx-2 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
