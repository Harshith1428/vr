import React from 'react';
import { Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 py-16 px-6 md:px-12 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
        
        {/* Brand Section */}
        <div className="flex flex-col items-start gap-6 max-w-sm">
          <h2 
            className="text-2xl font-black tracking-widest text-white leading-none cursor-default"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            NEONIX <span className="text-neutral-500 font-light">VR</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-light">
            Pushing the boundaries of spatial computing. We build immersive hardware and software solutions that transform how you interact with the digital realm.
          </p>
        </div>

        {/* Links Grid */}
        <div className="flex flex-wrap md:flex-nowrap gap-12 md:gap-24">
          
          <div className="flex flex-col gap-4 text-left">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-2">Experiences</h4>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Gaming & Entertainment</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Enterprise Training</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Social Metaverse</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Spatial Education</a>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-2">Hardware</h4>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Vision Headsets</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Haptic Gloves</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Omni Treadmills</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Base Stations</a>
          </div>

          <div className="flex flex-col gap-4 text-left">
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-2">Company</h4>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">About Us</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Careers</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Press Room</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors cursor-pointer">Contact</a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-neutral-500 text-xs tracking-wider">
          &copy; 2026 NEONIX VR. All dimensions reserved.
        </p>

        <div className="flex items-center gap-4">
          <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all cursor-pointer">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
