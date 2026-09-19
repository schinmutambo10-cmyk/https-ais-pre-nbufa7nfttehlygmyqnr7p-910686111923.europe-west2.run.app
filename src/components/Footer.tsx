import { useState } from 'react';
import { StudioInfo } from '../types';
import { MapPin, ArrowUp, Instagram, Facebook, Video, MessageSquare, ShieldCheck, FileText, X } from 'lucide-react';

interface FooterProps {
  studioInfo: StudioInfo;
  onBookClick: () => void;
  onOpenSettings: () => void;
}

export default function Footer({ studioInfo, onBookClick, onOpenSettings }: FooterProps) {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-zinc-800 text-zinc-400 text-xs">
      {/* Upper Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Location */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-cinzel text-xl font-bold tracking-[0.2em] text-white block">
              {studioInfo.name.toUpperCase()}
            </span>
            <p className="text-xs uppercase tracking-widest text-[#c59b27] font-semibold">
              Professional Tattoo Artistry & Creative Expression
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Dedicated to bespoke tattoo design, meticulous fine line craftsmanship, and creative artistic projects on Mutanga Avenue in Lusaka, Zambia.
            </p>
            <div className="flex items-center gap-2 text-zinc-300 pt-1">
              <MapPin className="w-4 h-4 text-[#c59b27] shrink-0" />
              <span>Mutanga Avenue, Lusaka, Zambia</span>
            </div>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#about" className="hover:text-[#c59b27] transition-colors">About Studio</a></li>
              <li><a href="#services" className="hover:text-[#c59b27] transition-colors">Services & Craft</a></li>
              <li><a href="#gallery" className="hover:text-[#c59b27] transition-colors">Portfolio Gallery</a></li>
              <li><a href="#booking" className="hover:text-[#c59b27] transition-colors">Book an Appointment</a></li>
              <li><a href="#contact" className="hover:text-[#c59b27] transition-colors">Location & Map</a></li>
            </ul>
          </div>

          {/* Col 4: Studio Guidelines & Standards */}
          <div className="space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Studio Standards
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Single-Use Sterile Needles</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Strict 18+ Age Policy (ID Required)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Hospital-Grade Sanitation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Dedicated Aftercare Advice</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Action & Socials */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              Get in Touch
            </h4>
            <button
              id="footer-contact-cta"
              onClick={onBookClick}
              className="w-full py-2.5 px-4 text-center rounded font-semibold uppercase tracking-wider text-black bg-[#c59b27] hover:bg-[#d8ae35] text-xs transition-colors"
            >
              Contact / Book
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={studioInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={studioInfo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="TikTok"
              >
                <Video className="w-4 h-4" />
              </a>
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
                className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-900 bg-black/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {studioInfo.name}. All rights reserved. Mutanga Avenue, Lusaka, Zambia.
          </p>

          <div className="flex items-center gap-6 text-xs text-zinc-400">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#c59b27] transition-colors underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#c59b27] transition-colors underline"
            >
              Terms & Studio Guidelines
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modals */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-zinc-800 rounded-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal === 'privacy' ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5 text-[#c59b27]" />
                  <h3 className="font-cinzel text-lg font-bold">Privacy Policy</h3>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed font-light">
                  {studioInfo.name} respects your personal privacy. Information provided in appointment booking forms (name, phone, email, and reference concepts) is used exclusively for consultation, design planning, and direct communication regarding your requested tattoo session. We never sell or share your contact details with external third parties.
                </p>
                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                  Reference photos uploaded to the studio remain your property and are viewed strictly for artistic assessment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                  <ShieldCheck className="w-5 h-5 text-[#c59b27]" />
                  <h3 className="font-cinzel text-lg font-bold">Studio Guidelines & Terms</h3>
                </div>
                <ul className="text-zinc-300 text-xs space-y-2.5 font-light leading-relaxed">
                  <li>
                    <strong className="text-white font-medium">Age Requirement:</strong> You must be at least 18 years old to receive a tattoo. A valid government identification card may be requested.
                  </li>
                  <li>
                    <strong className="text-white font-medium">Appointment Requests:</strong> Booking enquiries submitted online are requests for consultation and availability; they do not constitute a confirmed calendar slot until agreed upon directly with the studio.
                  </li>
                  <li>
                    <strong className="text-white font-medium">Hygiene Protocols:</strong> All needle cartridges and ink caps are strictly single-use and disposed of in accordance with healthcare sanitation standards.
                  </li>
                  <li>
                    <strong className="text-white font-medium">Aftercare Commitment:</strong> Healing instructions will be provided upon session completion. Following recommended aftercare is essential for optimal longevity and skin recovery.
                  </li>
                </ul>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-zinc-800 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
