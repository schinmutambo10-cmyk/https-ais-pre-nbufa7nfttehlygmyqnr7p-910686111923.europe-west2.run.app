import { StudioInfo } from '../types';
import heroStudioImg from '../assets/images/hero_tattoo_studio_1789838889859.jpg';
import { ArrowDown, Calendar, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  studioInfo: StudioInfo;
  onBookClick: () => void;
  onViewWorkClick: () => void;
}

export default function Hero({ studioInfo, onBookClick, onViewWorkClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#08080a]">
      {/* Background Tattoo Art Image with moody luxury dark scrims */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroStudioImg}
          alt="Professional tattoo artistry in Lusaka studio"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000 opacity-35"
          referrerPolicy="no-referrer"
        />
        {/* Layered dark gradients for readability and atmospheric luxury */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-[#08080a]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#08080a]/50 to-[#08080a]" />
      </div>

      {/* Decorative fine geometric studio borders */}
      <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full bg-[#c59b27]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-12 w-80 h-80 rounded-full bg-[#c59b27]/5 blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left pt-8">
        {/* Studio Location & Quality Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-xs tracking-wider uppercase mb-6 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#c59b27] animate-pulse" />
          <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
          <span>Mutanga Avenue, Lusaka, Zambia</span>
        </div>

        {/* Studio Brand Name */}
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.35em] text-[#c59b27] uppercase font-semibold mb-3">
          {studioInfo.name}
        </p>

        {/* Required Headline */}
        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-lg mb-6">
          INK YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e4bc50] via-[#c59b27] to-[#8e6b12]">STORY.</span>
        </h1>

        {/* Required Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-10 tracking-wide">
          Professional tattoo artistry and creative expression in Lusaka, Zambia.
        </p>

        {/* Two Prominent Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 justify-start">
          <button
            id="hero-book-btn"
            onClick={onBookClick}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black bg-[#c59b27] hover:bg-[#d8ae35] active:bg-[#a68019] rounded transition-all duration-200 shadow-xl shadow-[#c59b27]/20 focus:outline-none"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>Book an Appointment</span>
          </button>

          <button
            id="hero-view-work-btn"
            onClick={onViewWorkClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium uppercase tracking-wider text-zinc-200 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white border border-zinc-700 hover:border-[#c59b27]/60 rounded transition-all duration-200 backdrop-blur-sm focus:outline-none"
          >
            <Sparkles className="w-4 h-4 text-[#c59b27]" />
            <span>View Our Work</span>
          </button>
        </div>

        {/* Studio Highlights Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded">
            <span className="block text-[11px] uppercase tracking-widest text-[#c59b27] font-semibold">Custom Art</span>
            <span className="text-xs text-zinc-400">One-of-a-kind designs</span>
          </div>
          <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded">
            <span className="block text-[11px] uppercase tracking-widest text-[#c59b27] font-semibold">Hygiene First</span>
            <span className="text-xs text-zinc-400">Hospital-grade safety</span>
          </div>
          <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded">
            <span className="block text-[11px] uppercase tracking-widest text-[#c59b27] font-semibold">Consultations</span>
            <span className="text-xs text-zinc-400">Detailed planning</span>
          </div>
          <div className="p-3 bg-zinc-950/40 border border-zinc-900 rounded">
            <span className="block text-[11px] uppercase tracking-widest text-[#c59b27] font-semibold">Location</span>
            <span className="text-xs text-zinc-400">Mutanga Ave, Lusaka</span>
          </div>
        </div>
      </div>

      {/* Down arrow indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#c59b27] animate-bounce" />
      </div>
    </section>
  );
}
