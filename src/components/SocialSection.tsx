import { StudioInfo } from '../types';
import { Instagram, Facebook, MessageSquare, ExternalLink, Sparkles, Video } from 'lucide-react';

interface SocialSectionProps {
  studioInfo: StudioInfo;
  onOpenSettings: () => void;
}

export default function SocialSection({ studioInfo, onOpenSettings }: SocialSectionProps) {
  const socials = [
    {
      name: 'Instagram',
      handle: studioInfo.instagramHandle,
      url: studioInfo.instagramUrl,
      description: 'Daily studio updates, freshly healed tattoos, flash designs, and linework macro shots.',
      icon: <Instagram className="w-6 h-6 text-pink-500" />,
      tag: 'Most Active',
      color: 'hover:border-pink-500/50'
    },
    {
      name: 'Facebook',
      handle: studioInfo.facebookHandle,
      url: studioInfo.facebookUrl,
      description: 'Studio announcements, customer photo features, and community gallery updates.',
      icon: <Facebook className="w-6 h-6 text-blue-500" />,
      tag: 'Studio Page',
      color: 'hover:border-blue-500/50'
    },
    {
      name: 'TikTok',
      handle: studioInfo.tiktokHandle,
      url: studioInfo.tiktokUrl,
      description: 'Process videos, stencil placement reveals, needle prep, and studio art sessions.',
      icon: <Video className="w-6 h-6 text-cyan-400" />,
      tag: 'Video Reels',
      color: 'hover:border-cyan-500/50'
    },
    {
      name: 'WhatsApp',
      handle: studioInfo.whatsappNumber || studioInfo.whatsappPlaceholder,
      url: studioInfo.whatsappNumber ? `https://wa.me/${studioInfo.whatsappNumber.replace(/[^0-9]/g, '')}` : '#',
      description: 'Direct inquiry channel for reference checks, pricing consultation, and appointment queries.',
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      tag: 'Direct Chat',
      color: 'hover:border-emerald-500/50'
    }
  ];

  return (
    <section id="socials" className="py-20 bg-[#08080a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] uppercase tracking-widest text-[#c59b27] font-semibold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Stay Connected</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase mb-4">
            Follow the Studio
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Witness our latest tattoo creations in Lusaka, watch flash release drops, and explore client journeys on our official channels.
          </p>
        </div>

        {/* 4 Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((social) => (
            <div
              key={social.name}
              className={`group flex flex-col justify-between p-6 rounded-lg bg-[#0e0e11] border border-zinc-800 transition-all duration-300 hover:-translate-y-1 ${social.color} shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    {social.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                    {social.tag}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-white mb-1 group-hover:text-[#c59b27] transition-colors">
                  {social.name}
                </h3>
                <p className="text-xs font-mono text-[#c59b27] mb-3">
                  {social.handle}
                </p>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
                  {social.description}
                </p>
              </div>

              <div>
                <a
                  href={social.url}
                  onClick={(e) => {
                    if (social.url === '#' || social.url.endsWith('instagram.com/')) {
                      // Prompt or open settings if placeholder
                      if (!studioInfo.isOwnerCustomized) {
                        e.preventDefault();
                        onOpenSettings();
                      }
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-[#c59b27] hover:text-black rounded border border-zinc-800 transition-colors"
                >
                  <span>Follow on {social.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Small studio owner reminder */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-zinc-500">
            Studio owner: You can update your exact social handles and WhatsApp phone anytime in{' '}
            <button
              onClick={onOpenSettings}
              className="text-[#c59b27] hover:underline font-medium"
            >
              Studio Settings
            </button>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
