import tattooDetailImg from '../assets/images/tattoo_art_detail_1789838906259.jpg';
import { StudioInfo } from '../types';
import { STUDIO_PRINCIPLES } from '../data/defaultData';
import { Palette, ShieldCheck, Crosshair, Users, HeartHandshake, Feather } from 'lucide-react';

interface AboutProps {
  studioInfo: StudioInfo;
  onBookClick: () => void;
}

export default function About({ studioInfo, onBookClick }: AboutProps) {
  const principleIcons = [
    <Palette className="w-5 h-5 text-[#c59b27]" key="palette" />,
    <ShieldCheck className="w-5 h-5 text-[#c59b27]" key="shield" />,
    <Crosshair className="w-5 h-5 text-[#c59b27]" key="crosshair" />,
    <Users className="w-5 h-5 text-[#c59b27]" key="users" />
  ];

  return (
    <section id="about" className="py-24 bg-[#0c0c0e] border-t border-b border-zinc-800/80 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute -top-32 right-0 w-96 h-96 bg-[#c59b27]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#c59b27] block mb-2">
            The Studio
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-6">
            About the Studio
          </h2>
          <div className="w-16 h-0.5 bg-[#c59b27] mx-auto mb-6" />
          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            Located on Mutanga Avenue in Lusaka, <strong className="text-white font-medium">{studioInfo.name}</strong> is a dedicated creative tattoo and art studio serving clients across Lusaka and Zambia who value individual expression and fine craftsmanship.
          </p>
        </div>

        {/* Narrative & Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <div className="p-6 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-3 text-white">
                <Feather className="w-5 h-5 text-[#c59b27]" />
                <h3 className="font-cinzel text-lg sm:text-xl font-semibold tracking-wide">
                  Artistic Expression on Skin
                </h3>
              </div>
              <p className="text-zinc-300 font-light">
                We believe tattoos are more than skin-deep decoration; they are intimate milestones, personal reflections, and permanent wearable artwork. We take the time to listen to your concept, understand your vision, and translate your thoughts into tailored, original designs crafted specifically for your body.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-3 text-white">
                <HeartHandshake className="w-5 h-5 text-[#c59b27]" />
                <h3 className="font-cinzel text-lg sm:text-xl font-semibold tracking-wide">
                  A Safe, Comfortable Environment
                </h3>
              </div>
              <p className="text-zinc-300 font-light">
                Whether you are stepping into a tattoo studio for your very first piece or adding to a growing collection, your comfort and peace of mind come first. We maintain strict hygiene protocols, sterile single-use materials, and a supportive, patient studio atmosphere on Mutanga Avenue.
              </p>
            </div>

            {/* Quick Studio Promise Callout */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400">Ready to discuss your idea?</p>
                <p className="text-sm text-zinc-200">Consultations are open by appointment.</p>
              </div>
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b27] hover:bg-[#d8ae35] rounded transition-colors"
              >
                Book a Consultation
              </button>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 shadow-2xl group">
              <img
                src={tattooDetailImg}
                alt="Detailed custom tattoo linework craftsmanship"
                className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[11px] uppercase tracking-widest text-[#c59b27] font-semibold block mb-1">
                  Studio Focus
                </span>
                <p className="font-cinzel text-lg font-bold text-white mb-2">
                  Precision in Every Line
                </p>
                <p className="text-xs text-zinc-300 font-light">
                  From delicate micro-linework to heavy blackwork contrast, every needle stroke receives careful concentration.
                </p>
              </div>
            </div>

            {/* Decorative Studio Tag */}
            <div className="absolute -bottom-4 -right-4 bg-zinc-900/95 border border-[#c59b27]/40 px-4 py-2.5 rounded shadow-xl hidden sm:block backdrop-blur-md">
              <p className="text-[11px] uppercase tracking-wider text-zinc-400">Studio Location</p>
              <p className="text-xs font-semibold text-white">Mutanga Ave • Lusaka</p>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {STUDIO_PRINCIPLES.map((principle, index) => (
            <div
              key={principle.id}
              className="p-6 rounded-lg bg-zinc-900/40 border border-zinc-800/80 hover:border-[#c59b27]/50 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                {principleIcons[index]}
              </div>
              <h4 className="font-cinzel text-base font-bold text-white mb-2">
                {principle.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
