import React, { useState, MouseEvent } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
}

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RippleButton({ children, className = "", onClick, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`relative overflow-hidden w-full py-3.5 rounded-xl border border-white/20 text-white font-medium text-sm transition-all duration-300 ease-out active:scale-[0.96] hover:bg-[#dc1e1e] hover:border-[#dc1e1e] hover:shadow-[0_0_20px_rgba(220,30,30,0.6)] ${className} mt-auto`}
    >
      <span className="relative z-10">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </button>
  );
}
