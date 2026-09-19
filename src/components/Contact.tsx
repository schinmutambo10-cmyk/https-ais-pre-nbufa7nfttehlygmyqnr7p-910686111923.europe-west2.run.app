import { StudioInfo } from '../types';
import { MapPin, Phone, MessageSquare, Instagram, Facebook, Clock, ExternalLink, Edit3, Navigation } from 'lucide-react';

interface ContactProps {
  studioInfo: StudioInfo;
  onOpenSettings: () => void;
}

export default function Contact({ studioInfo, onOpenSettings }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-[#0c0c0e] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#c59b27] block mb-2">
            Location & Inquiries
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-4">
            Visit & Contact the Studio
          </h2>
          <div className="w-16 h-0.5 bg-[#c59b27] mx-auto mb-6" />
          <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
            Chelstone Ink Art & Tattoos welcomes both first-time and experienced collectors. Find our studio on Mutanga Avenue in Lusaka, Zambia.
          </p>
        </div>

        {/* Studio Primary Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Contact Methods */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-[#c59b27]" />
                  <h3 className="font-cinzel text-base font-bold">Studio Address</h3>
                </div>
                <a
                  href={studioInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#c59b27] hover:underline"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="text-sm text-zinc-300 space-y-1">
                <p className="font-medium text-white">{studioInfo.name}</p>
                <p>{studioInfo.street}</p>
                <p>{studioInfo.location}</p>
              </div>

              <div className="pt-2">
                <a
                  href={studioInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b27] hover:bg-[#d8ae35] rounded transition-colors w-full justify-center"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-base font-bold text-white">Direct Phone & WhatsApp</h3>
                <button
                  onClick={onOpenSettings}
                  className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-[#c59b27]"
                  title="Edit contact placeholders"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Owner Edit</span>
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3 rounded bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-zinc-950 flex items-center justify-center text-[#c59b27]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Phone Line</span>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200">
                      {studioInfo.phoneRaw || studioInfo.phonePlaceholder}
                    </span>
                  </div>
                </div>
                {studioInfo.phoneRaw ? (
                  <a
                    href={`tel:${studioInfo.phoneRaw}`}
                    className="text-xs text-[#c59b27] hover:underline"
                  >
                    Call
                  </a>
                ) : (
                  <span className="text-[11px] text-zinc-500 italic">Editable</span>
                )}
              </div>

              {/* WhatsApp */}
              <div className="flex items-center justify-between p-3 rounded bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-zinc-950 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">WhatsApp Chat</span>
                    <span className="text-xs sm:text-sm font-medium text-zinc-200">
                      {studioInfo.whatsappNumber || studioInfo.whatsappPlaceholder}
                    </span>
                  </div>
                </div>
                <a
                  href={studioInfo.whatsappNumber ? `https://wa.me/${studioInfo.whatsappNumber.replace(/[^0-9]/g, '')}` : '#'}
                  onClick={(e) => {
                    if (!studioInfo.whatsappNumber) {
                      e.preventDefault();
                      onOpenSettings();
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
                >
                  Chat
                </a>
              </div>
            </div>

            {/* Social Media Links Card */}
            <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel text-base font-bold text-white">Social Channels</h3>
                <span className="text-[10px] text-zinc-500 italic">Editable Links</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={studioInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded bg-zinc-900 border border-zinc-800 hover:border-[#c59b27]/60 text-zinc-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <div className="truncate">
                    <span className="text-[10px] text-zinc-500 block">Instagram</span>
                    <span className="text-xs font-medium truncate block">{studioInfo.instagramHandle}</span>
                  </div>
                </a>

                <a
                  href={studioInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded bg-zinc-900 border border-zinc-800 hover:border-[#c59b27]/60 text-zinc-300 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <div className="truncate">
                    <span className="text-[10px] text-zinc-500 block">Facebook</span>
                    <span className="text-xs font-medium truncate block">Chelstone Ink</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Studio Hours */}
            <div className="p-5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400 leading-relaxed">
                <span className="text-zinc-200 font-semibold block mb-0.5">Operating Hours</span>
                {studioInfo.openingHours}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Frame */}
          <div className="lg:col-span-7">
            <div className="rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
              {/* Map header */}
              <div className="px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-wider text-zinc-300 uppercase">
                    Chelstone, Lusaka, Zambia
                  </span>
                </div>
                <a
                  href={studioInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c59b27] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Embedded Google Maps container */}
              <div className="relative h-[430px] w-full bg-zinc-900">
                <iframe
                  title="Chelstone Ink Art & Tattoos Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.987747805096!2d28.3853195!3d-15.358249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1940f50800b46293%3A0x86bbad2f5e3d744b!2sMutanga%20Ave%2C%20Lusaka%2C%20Zambia!5e0!3m2!1sen!2szm!4v1710842000000!5m2!1sen!2szm"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating location card overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#09090b]/95 border border-zinc-700/80 p-4 rounded-lg shadow-xl backdrop-blur-md">
                  <p className="font-cinzel text-xs font-bold text-white mb-1">
                    Chelstone Ink Art & Tattoos
                  </p>
                  <p className="text-[11px] text-zinc-300 mb-2">
                    Mutanga Avenue, Lusaka, Zambia
                  </p>
                  <a
                    href={studioInfo.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#c59b27] hover:text-[#d8ae35]"
                  >
                    <span>View on Google Maps App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
