import { ServiceItem } from '../types';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

interface ServicesProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

export default function Services({ services, onSelectService }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-[#08080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#c59b27] block mb-2">
            Studio Offerings
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-6">
            Artistry & Services
          </h2>
          <div className="w-16 h-0.5 bg-[#c59b27] mx-auto mb-6" />
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
            Every piece created at Chelstone Ink Art & Tattoos is approached with deliberate care and craftsmanship. Explore our primary creative services below.
          </p>
        </div>

        {/* 4 Primary Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col justify-between rounded-lg bg-[#0e0e11] border border-zinc-800 hover:border-[#c59b27]/60 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-[#c59b27]/10"
            >
              {/* Subtle metallic top hairline */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#c59b27]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#c59b27]">
                    {service.subtitle}
                  </span>
                  <Sparkles className="w-4 h-4 text-zinc-600 group-hover:text-[#c59b27] transition-colors" />
                </div>

                <h3 className="font-cinzel text-xl font-bold text-white mb-3 group-hover:text-[#c59b27] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="border-t border-zinc-800/80 pt-4 mb-6 space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-[#c59b27] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  id={`enquire-btn-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-200 bg-zinc-900 group-hover:bg-[#c59b27] group-hover:text-black rounded border border-zinc-700/60 group-hover:border-[#c59b27] transition-all duration-200"
                >
                  <span>Enquire / Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Custom Requirements */}
        <div className="mt-12 p-5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-center max-w-2xl mx-auto">
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong className="text-zinc-200 font-medium">Have a specific design in mind?</strong> We welcome custom concepts, reference sketches, and personal ideas. You can upload reference images directly through our booking enquiry form below.
          </p>
        </div>
      </div>
    </section>
  );
}
