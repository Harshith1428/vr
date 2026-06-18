import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        >
          {/* Dark blurred backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row gap-8 md:gap-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Visual Side */}
            <div className="w-full md:w-2/5 flex flex-col justify-between items-start border-r border-white/10 pr-0 md:pr-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">NEONIX</h2>
                <p className="text-sky-400 font-mono text-xs tracking-[0.2em] uppercase">Spatial Systems</p>
              </div>
              <div className="mt-8 md:mt-12 w-full aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative group">
                <img src="https://i.postimg.cc/pVzdgfJ2/white-vr.png" alt="Neonix VR" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/50 tracking-widest uppercase">EST. 2026</div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="w-full md:w-3/5 flex flex-col gap-6 text-neutral-300 pt-2 md:pt-0">
              <h3 className="text-2xl font-medium text-white tracking-tight">Redefining Human-Computer Interaction</h3>
              <p className="leading-relaxed text-sm">
                Neonix was founded on a singular vision: to tear down the 2D screens that separate us from our digital lives. We are a collective of engineers, designers, and dreamers building the absolute pinnacle of spatial computing hardware.
              </p>
              <p className="leading-relaxed text-sm text-neutral-400">
                By combining impossibly dense Micro-OLED displays, sub-millimeter full-body tracking, and zero-latency haptics, we aren't just making VR headsets—we are creating robust, breathable gateways to entirely new realities.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-6 md:mt-auto pt-6 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-semibold text-white">India</span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500">Global HQ</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-semibold text-white">14</span>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500">Patents Granted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
