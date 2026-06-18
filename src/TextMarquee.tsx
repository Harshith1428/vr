import React from 'react';

export function TextMarquee() {
  const text = "NEXT GEN EXPERIENCE ✦ IMMERSIVE TECHNOLOGY ✦ FUTURE OF REALITY ✦ BEYOND LIMITS ✦ ";
  
  return (
    <div className="w-full bg-[#0a0a0a] overflow-hidden flex items-center h-[70px] border-y border-white/5 relative z-30">
      <div className="flex w-max animate-marquee-text whitespace-nowrap">
        <span className="text-white text-[15px] uppercase tracking-[0.2em] font-medium mx-4">
          {text}
        </span>
        <span className="text-white text-[15px] uppercase tracking-[0.2em] font-medium mx-4">
          {text}
        </span>
        <span className="text-white text-[15px] uppercase tracking-[0.2em] font-medium mx-4">
          {text}
        </span>
        <span className="text-white text-[15px] uppercase tracking-[0.2em] font-medium mx-4">
          {text}
        </span>
      </div>
    </div>
  );
}
