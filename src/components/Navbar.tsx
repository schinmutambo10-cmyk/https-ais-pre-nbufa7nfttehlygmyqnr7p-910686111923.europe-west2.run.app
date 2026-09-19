import { useState, useEffect } from 'react';
import { StudioInfo } from '../types';
import { Menu, X, Calendar, MapPin, Settings2 } from 'lucide-react';

interface NavbarProps {
  studioInfo: StudioInfo;
  onOpenSettings: () => void;
  onBookClick: () => void;
}

export default function Navbar({ studioInfo, onOpenSettings, onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#gallery' },
    { name: 'Location', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#"
            id="brand-logo"
            className="group flex flex-col focus:outline-none"
          >
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-zinc-100 group-hover:text-[#c59b27] transition-colors">
              CHELSTONE INK
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c59b27] font-medium">
              Art & Tattoos • Lusaka
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-300 hover:text-[#c59b27] tracking-wider uppercase text-xs transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick Location Badge */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-400 bg-zinc-900/80 border border-zinc-800 hover:border-[#c59b27]/50 hover:text-zinc-200 transition-colors"
              title="Studio Location on Mutanga Avenue"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
              <span className="hidden lg:inline">Mutanga Ave, Lusaka</span>
              <span className="lg:hidden">Lusaka</span>
            </a>

            {/* Owner Customizer Button */}
            <button
              id="owner-settings-btn"
              onClick={onOpenSettings}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#c59b27] hover:border-[#c59b27]/40 transition-colors"
              title="Studio Owner: Edit contact information and links"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            {/* Book Appointment CTA */}
            <button
              id="navbar-book-cta"
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b27] hover:bg-[#d8ae35] active:bg-[#a68019] rounded transition-all duration-200 shadow-md shadow-[#c59b27]/10"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#c59b27]"
              title="Studio Owner Settings"
            >
              <Settings2 className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-zinc-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c0e] border-b border-zinc-800 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-[#c59b27] py-2 text-sm tracking-widest uppercase font-medium border-b border-zinc-800/40"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#c59b27] rounded"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
            <p className="text-center text-[11px] text-zinc-500">
              Mutanga Avenue, Lusaka, Zambia
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
