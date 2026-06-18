import React, { useState } from 'react';
import ScrollAnimation from './ScrollAnimation';
import { SecondScrollAnimation } from './SecondScrollAnimation';
import { ThirdScrollAnimation } from './ThirdScrollAnimation';
import { TextMarquee } from './TextMarquee';
import { Footer } from './Footer';
import { ParticleText } from './ParticleText';
import { VapourText } from './VapourText';
import { RippleButton } from './RippleButton';
import { AboutUsModal } from './AboutUsModal';
import { 
  Play, 
  ArrowRight, 
  X, 
  Facebook, 
  Linkedin, 
  Instagram, 
  Send,
  Sparkles,
  ChevronRight,
  Bookmark,
  CheckCircle2,
  Shield,
  Fingerprint,
  Cpu,
  Database,
  Zap,
  Activity,
  Flame,
  Link as LinkIcon
} from 'lucide-react';

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const words = ['experiences', 'worlds', 'realities', 'emotions'];
  // Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'services' | 'clients'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeMission, setActiveMission] = useState<1 | 2>(1);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  
  // Custom Form interaction
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Chips & Milestone interactive state 
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  
  const milestoneList = [
    { id: 'm1', label: 'Spatial Architecture', status: 'Completed', date: 'Q1', description: 'Deep analysis of 3D spatial mapping and rendering requirements.' },
    { id: 'm2', label: 'Hardware Prototyping', status: 'Completed', date: 'Q2', description: 'Ergonomic design for next-gen headsets and controllers.' },
    { id: 'm3', label: 'Metaverse Beta', status: 'Active', date: 'Q3', description: 'Iterative live testing of our virtual reality environments.' },
    { id: 'm4', label: 'Haptics Analysis', status: 'In Progress', date: 'Q3', description: 'Mapping tactile feedback needs for maximum physical immersion.' },
    { id: 'm5', label: 'Rendering Engine', status: 'Completed', date: 'Q1', description: 'Core optical specifications and 90fps baseline rendering targets.' },
    { id: 'm6', label: 'Vestibular Tuning', status: 'Scheduled', date: 'Q4', description: 'Evaluating motion sickness mitigation and comfort ratings.' },
    { id: 'm7', label: 'Engine Integration', status: 'Active', date: 'Ongoing', description: 'Translating physics engines into highly optimized VR codebases.' },
    { id: 'm8', label: 'Latency Reduction', status: 'Scheduled', date: 'Q4', description: 'Fine-tuning motion-to-photon latency to under 10ms.' },
  ];

  // Handle Form Submission
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setEmail('');
        setIsConnectOpen(false);
      }, 3500);
    }
  };

  return (
    <div className="relative bg-black/0 text-white selection:bg-white selection:text-black font-sans antialiased">
      
      {/* BACKGROUND SCROLL ANIMATION */}
      <ScrollAnimation />

      {/* 1. HEADER NAVIGATION */}
      <header className="w-full px-6 md:px-12 py-6 md:py-8 flex items-center relative z-30">
        {/* Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-10">
          <button
            onClick={() => window.location.reload()}
            className="text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer relative py-2 text-white hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => setIsAboutOpen(true)}
            className="text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer relative py-2 text-neutral-500 hover:text-neutral-300"
          >
            About
          </button>
          <button
            className="text-xs md:text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer relative py-2 text-neutral-500 hover:text-neutral-300"
          >
            Services
          </button>
        </nav>

        {/* Menu Pill Header Button */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button 
            id="menu-toggle-btn"
            onClick={() => setIsMenuOpen(true)}
            className="border border-white/10 hover:border-white/30 bg-neutral-900/40 hover:bg-neutral-900/80 text-white text-[11px] md:text-xs font-medium uppercase tracking-widest px-4 md:px-5 py-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-102 flex items-center gap-2"
          >
            Menu
          </button>
          <button
            id="menu-dots-btn"
            onClick={() => setIsMenuOpen(true)}
            className="border border-white/10 hover:border-white/30 bg-neutral-900/40 hover:bg-neutral-900/80 text-white px-3 py-2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center hover:scale-102"
          >
            <span className="flex gap-0.5 tracking-tighter font-extrabold text-[10px] md:text-xs">••</span>
          </button>
        </div>
      </header>

      {/* 2. HERO CONTENT SECTION */}
      <main className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center py-10 md:py-16 relative z-30">
        
        {/* Dynamic Left-Aligned Hero Block */}
        <div className="flex flex-col items-start text-left gap-6 md:gap-7 w-full max-w-2xl mb-16 md:mb-20 mt-8 md:mt-16">
          
          {/* Main Typography Title (Canvas Particles) */}
          <ParticleText />

          {/* Subtitle Description */}
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base tracking-wide max-w-md sm:max-w-lg leading-relaxed font-light">
            We Innovate. We Immerse. We Transform. Step into the future of reality with our cutting-edge VR solutions.
          </p>

          {/* Interactive Button Group */}
          <div className="flex flex-wrap items-center justify-start gap-4 mt-1">
            {/* Discover Button */}
            <button 
              id="discover-action-btn"
              onClick={() => setIsConnectOpen(true)}
              className="border border-white/10 hover:border-white/40 bg-neutral-900/30 hover:bg-neutral-900/80 transition-all duration-500 px-6 py-3 rounded-full flex items-center gap-4 group cursor-pointer"
            >
              <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-white group-hover:translate-x-0.5 transition-transform duration-300">
                Discover
              </span>
              <span className="w-px h-3.5 bg-white/20" />
              <span className="text-[10px] md:text-xs font-bold text-neutral-400 group-hover:text-white transition-colors duration-300">
                ••
              </span>
            </button>

            {/* Connect Icon Link & Slider */}
            <button
              id="connect-action-btn"
              onClick={() => setIsConnectOpen(true)}
              className="flex items-center gap-3 px-4 py-3 text-xs md:text-sm text-neutral-400 hover:text-white group transition-all duration-300 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full border border-white/5 bg-neutral-900/20 group-hover:border-white/30 flex items-center justify-center transition-all duration-300">
                {/* Standard custom elegant path for high-tech connectivity / message */}
                <svg 
                  className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 127.14 96.36" 
                  fill="currentColor"
                >
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.43-5c.89-.65,1.76-1.34,2.58-2a75.43,75.43,0,0,0,92.63,0c.83.71,1.69,1.4,2.58,2a67.57,67.57,0,0,1-10.43,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.87,48.24,121.75,25.43,107.7,8.07ZM42.45,65.69C34.83,65.69,28.6,58.7,28.6,50.13s6.08-15.56,13.85-15.56,14,7,13.85,15.56S48.51,65.69,42.45,65.69Zm42.24,0C77.07,65.69,70.84,58.7,70.84,50.13s6.08-15.56,13.85-15.56,14,7,13.85,15.56S90.75,65.69,84.69,65.69Z" />
                </svg>
              </div>
              <span className="font-medium uppercase tracking-wider text-[11px] md:text-sm">Connect with us</span>
            </button>
          </div>

          {/* Quick inline overlay element for mini connectivity/forms */}
          {isConnectOpen && (
            <div className="w-full max-w-sm bg-neutral-950/95 border border-white/10 rounded-2xl p-5 mt-4 text-left animate-fadeIn transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-widest uppercase text-neutral-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-white" /> Access Portal
                </span>
                <button 
                  onClick={() => setIsConnectOpen(false)}
                  className="text-neutral-500 hover:text-white p-1 hover:bg-white/5 rounded-full transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {formSubmitted ? (
                <div id="success-feedback-container" className="py-4 text-center">
                  <CheckCircle2 className="w-8 h-8 text-white mx-auto mb-2 animate-bounce" />
                  <p className="text-xs text-white uppercase tracking-widest font-bold">Secure Connection Established</p>
                  <p className="text-[11px] text-neutral-500 mt-1">Our team will reach out to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <p className="text-xs text-neutral-400 mb-3 leading-relaxed">
                    Leave your contact token to connect with Neonix innovators.
                  </p>
                  <div className="flex items-center gap-2 bg-neutral-900 border border-white/5 p-1 rounded-lg">
                    <input 
                      type="email"
                      value={email}
                      required
                      placeholder="Enter security email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent text-xs w-full px-3 py-2 outline-none border-none text-white focus:ring-0 placeholder:text-neutral-600 font-mono"
                    />
                    <button 
                      type="submit"
                      className="bg-white text-black p-2 rounded-md hover:bg-neutral-200 transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
          
        {/* 2.5 FUNCTIONAL SCOPE & MILESTONES (CHIPS SECTION) */}
        <div className="w-full max-w-5xl mx-auto mt-4 pt-6 border-t border-white/10 text-center mb-16 md:mb-20">
            <div className="flex items-center gap-2.5 mb-4 justify-center">
              <span className="w-2 h-2 rounded-full bg-white block shadow-[0_0_8px_rgba(255,255,255,0.85)] animate-pulse" />
              <span className="text-[10px] md:text-xs tracking-[0.25em] font-semibold text-neutral-400 uppercase">
                Functional Scope & Milestones
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {milestoneList.map((item) => {
                const isSelected = selectedMilestone === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMilestone(isSelected ? null : item.id)}
                    className={`group border rounded-full px-3 py-1.5 flex items-center gap-2 cursor-pointer text-[10px] md:text-[11px] font-medium transition-all duration-300 hover:scale-[1.02] ${
                      isSelected 
                        ? 'border-white bg-white text-black font-semibold' 
                        : 'border-white/10 hover:border-white/30 bg-neutral-950 hover:bg-neutral-900/60 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {/* Glowing white dot indicator */}
                    <span className={`w-1.5 h-1.5 rounded-full block shrink-0 transition-all duration-300 group-hover:scale-110 ${
                      isSelected 
                        ? 'bg-black' 
                        : 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]'
                    }`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Micro Details Playable Panel */}
            {selectedMilestone && (
              <div className="mt-4 p-4 rounded-xl border border-white/15 bg-neutral-950 max-w-xl mx-auto animate-fadeIn text-left">
                {(() => {
                  const current = milestoneList.find(m => m.id === selectedMilestone);
                  if (!current) return null;
                  return (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                          System Objective • {current.date}
                        </span>
                        <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                          current.status === 'Completed' ? 'bg-white/10 text-white' : 'bg-neutral-850 text-neutral-300'
                        }`}>
                          {current.status}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{current.label}</h4>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-light">{current.description}</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

        {/* Staggered Alternating Layout for 8 features (zigzag flow) */}
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 md:gap-14 pb-16 pt-8">
          
          {/* Card 1: SEC-01 (Odd - Left aligned) */}
          <div className="w-full flex justify-start">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <Shield className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">SEC-01</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Immersive Fidelity
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Ultra-high resolution micro-OLED panels for photorealistic experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: CPU-02 (Even - Right aligned) */}
          <div className="w-full flex justify-end">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <Cpu className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">CPU-02</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Spatial Audio
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Advanced 3D positional audio pipelines for true digital presence.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: DB-03 (Odd - Left aligned) */}
          <div className="w-full flex justify-start">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <Database className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">DB-03</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  6DOF Tracking
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Flawless inside-out room-scale tracking with zero dead zones.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: ZAP-04 (Even - Right aligned) */}
          <div className="w-full flex justify-end">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <Zap className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">ZAP-04</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Haptic Feedback
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Sub-millisecond tactile responses via advanced motion controllers.
                </p>
              </div>
            </div>
          </div>

          {/* Card 5: BIO-05 (Odd - Left aligned) */}
          <div className="w-full flex justify-start">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <Fingerprint className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">BIO-05</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Eye Tracking
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Foveated rendering driven by real-time pupil scanning.
                </p>
              </div>
            </div>
          </div>

          {/* Card 6: MET-06 (Even - Right aligned) */}
          <div className="w-full flex justify-end">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <Activity className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">MET-06</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Multiplayer Hubs
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Live synchronized avatars streamed directly to social VR clients.
                </p>
              </div>
            </div>
          </div>

          {/* Card 7: PERF-07 (Odd - Left aligned) */}
          <div className="w-full flex justify-start">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <Flame className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">PERF-07</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Wireless Freedom
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Zero-latency Wi-Fi 6E streaming without the tether.
                </p>
              </div>
            </div>
          </div>

          {/* Card 8: LINK-08 (Even - Right aligned) */}
          <div className="w-full flex justify-end">
            <div className="w-full md:w-[46%] bg-[#09090b]/50 backdrop-blur-md border border-white/10 hover:border-white/20 p-8 min-h-[220px] md:min-h-[260px] rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(255,255,255,0.02)] flex flex-col justify-start gap-6 group text-left">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl border border-white/10 bg-neutral-900/50 flex items-center justify-center transition-all duration-300 group-hover:border-white/25">
                  <LinkIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs text-neutral-600 font-mono tracking-wider">LINK-08</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  Cross-Platform
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed md:leading-loose font-light">
                  Seamless multiplayer bridges between standalone and PC-VR.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PRICING SECTION */}
      <section className="relative z-30 bg-black pt-24 md:pt-32 pb-16 md:pb-20 px-6 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
        
        {/* Top and Bottom Red Glows */}
        <div className="absolute top-0 left-0 w-full h-[300px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at top, rgba(220,30,30,0.35) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse at bottom, rgba(220,30,30,0.35) 0%, transparent 70%)' }} />

        {/* Huge Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
          <h2 className="text-[120px] sm:text-[180px] md:text-[250px] lg:text-[300px] font-black text-white/[0.02] tracking-tighter leading-none" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            Pricing
          </h2>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col">
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Our Headsets
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10">
              Step into the next generation of spatial computing. Choose the hardware that fits your needs.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Neonix Core Card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] flex flex-col relative group transition-all duration-500 hover:bg-white/5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/30 active:scale-[0.98] cursor-pointer">
              <div className="mb-6">
                <h3 className="text-xl text-neutral-300 font-medium mb-1">Neonix Core</h3>
                <div className="text-5xl font-semibold text-white tracking-tight">₹69,000</div>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4 min-h-[40px]">
                The perfect entry point into immersive spatial computing.
              </p>
              <img src="https://i.postimg.cc/pVzdgfJ2/white-vr.png" alt="Neonix Core VR" className="w-full rounded-2xl my-3 object-cover shadow-lg" />
              
              <ul className="space-y-4 mb-10 flex-grow mt-4">
                {['Dual 2K Micro-OLED displays', '90Hz smooth refresh rate', 'Inside-out 6DOF tracking', '2.5 hours battery life', 'Included motion controllers'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <RippleButton>
                Pre-Order Now
              </RippleButton>
            </div>

            {/* Neonix Pro Card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] flex flex-col relative group transition-all duration-500 hover:bg-white/5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/30 active:scale-[0.98] cursor-pointer">
              <div className="mb-6">
                <h3 className="text-xl text-white font-medium mb-1">Neonix Pro</h3>
                <div className="text-5xl font-semibold text-white tracking-tight">₹98,000</div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed mb-4 min-h-[40px]">
                Professional grade immersion for creators and enthusiasts.
              </p>
              <img src="https://i.postimg.cc/TYQT6CLv/black-vr.png" alt="Neonix Pro VR" className="w-full rounded-2xl my-3 object-cover shadow-lg" />
              
              <ul className="space-y-4 mb-10 flex-grow mt-4">
                {['Dual 4K Micro-OLED displays', '120Hz refresh rate', 'Eye and face tracking included', '4 hours battery life', 'Premium balanced halo strap'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white">
                    <svg className="w-5 h-5 text-white/80 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <RippleButton>
                Pre-Order Now
              </RippleButton>
            </div>

            {/* Neonix Ultra Card */}
            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] flex flex-col relative group transition-all duration-500 hover:bg-white/[0.05] shadow-[0_0_30px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(56,189,248,0.25)] hover:border-sky-400/50 active:scale-[0.98] cursor-pointer">
              <div className="mb-6">
                <h3 className="text-xl text-neutral-300 font-medium mb-1">Neonix Ultra</h3>
                <div className="text-5xl font-semibold text-white tracking-tight">₹1,25,000</div>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4 min-h-[40px]">
                The ultimate zero-compromise virtual reality experience.
              </p>
              <img src="https://i.postimg.cc/rm6kJHbV/purple-vr.png" alt="Neonix Ultra VR" className="w-full rounded-2xl my-3 object-cover shadow-lg" />
              
              <ul className="space-y-4 mb-10 flex-grow mt-4">
                {['Dual 6K Micro-OLED displays', '144Hz ultra-smooth refresh rate', 'Full-body tracking integration', 'Advanced haptic feedback interface', 'Custom-tailored facial gasket'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                    <svg className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <RippleButton>
                Pre-Order Now
              </RippleButton>
            </div>

          </div>

        </div>
      </section>

      {/* SECOND SCROLL ANIMATION SECTION */}
      <SecondScrollAnimation />

      {/* TEXT MARQUEE */}
      <TextMarquee />

      {/* THIRD SCROLL ANIMATION SECTION */}
      <ThirdScrollAnimation />

      {/* FOOTER */}
      <Footer />
      
      {/* Global Tech Overlay to cover Gemini Watermark */}
      <div className="fixed bottom-4 right-4 z-[990] bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-[9px] md:text-[10px] text-white/50 tracking-[0.2em] uppercase border border-white/10 shadow-lg pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        NEONIX // SPATIAL OS
      </div>

      {/* About Us Modal */}
      <AboutUsModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}
