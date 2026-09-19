import { useState } from 'react';
import { GalleryItem } from '../types';
import { X, ZoomIn, ArrowLeft, ArrowRight, Sparkles, SlidersHorizontal, ImagePlus } from 'lucide-react';

interface GalleryProps {
  galleryItems: GalleryItem[];
  onEnquireWork: (item: GalleryItem) => void;
  onOpenOwnerSettings: () => void;
}

export default function Gallery({ galleryItems, onEnquireWork, onOpenOwnerSettings }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Before/After interactive slider state for cover-up card
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'black-grey', label: 'Black & Grey' },
    { id: 'fine-line', label: 'Fine Line' },
    { id: 'cover-up', label: 'Before & After / Cover-Ups' },
    { id: 'artistic', label: 'Artistic & Canvas' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#0c0c0e] relative border-t border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#c59b27] block mb-2">
              Visual Portfolio
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Selected Studio Work
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={onOpenOwnerSettings}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 hover:text-[#c59b27] bg-zinc-900 border border-zinc-800 rounded transition-colors"
              title="Studio Owner: Replace placeholder imagery with your real tattoos"
            >
              <ImagePlus className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Owner: Replace Photos</span>
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-[#c59b27] text-black shadow-lg shadow-[#c59b27]/20 font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Before & After Spotlight when Cover-up filter or viewed */}
        {selectedCategory === 'cover-up' && (
          <div className="mb-14 p-6 rounded-lg bg-zinc-950 border border-zinc-800">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white">
                  <SlidersHorizontal className="w-4 h-4 text-[#c59b27]" />
                  <span className="font-cinzel text-sm sm:text-base font-semibold">
                    Interactive Cover-Up Transformation Slider
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400">Drag slider to compare</span>
              </div>

              {/* Before/After Visual Comparison Frame */}
              <div
                className="relative h-[360px] sm:h-[420px] rounded-lg overflow-hidden border border-zinc-800 select-none cursor-ew-resize group"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                  setSliderPosition((x / rect.width) * 100);
                }}
              >
                {/* AFTER Image (Full background) */}
                <img
                  src="https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=1200&q=80"
                  alt="After cover up tattoo"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 right-4 bg-black/80 px-2.5 py-1 rounded text-[11px] font-bold tracking-widest text-[#c59b27] border border-[#c59b27]/30 uppercase">
                  After (Cover-Up Art)
                </span>

                {/* BEFORE Image (Clipped overlay) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1590246814883-5783361494e8?auto=format&fit=crop&w=1200&q=80"
                    alt="Before tattoo cover up"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', minWidth: '100%' }}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 rounded text-[11px] font-bold tracking-widest text-zinc-300 border border-zinc-700 uppercase">
                    Before (Original)
                  </span>
                </div>

                {/* Slider divider line */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#c59b27] shadow-[0_0_10px_#c59b27]"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#c59b27] flex items-center justify-center text-[#c59b27] shadow-xl">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <p className="mt-3 text-xs text-zinc-400 text-center font-light">
                Have an old, faded, or regretful tattoo? Bring it to Chelstone Ink Art & Tattoos for a cover-up consultation.
              </p>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800/80 hover:border-[#c59b27]/60 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#c59b27]/10 flex flex-col"
            >
              {/* Image Aspect Box */}
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Style badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider bg-black/80 text-[#c59b27] border border-[#c59b27]/30 backdrop-blur-sm">
                  {item.styleTag}
                </span>

                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/70 border border-[#c59b27] flex items-center justify-center text-[#c59b27] transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Information bar below */}
              <div className="p-4 border-t border-zinc-900 bg-[#0e0e11]">
                <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-[#c59b27] transition-colors truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 font-light line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div
            id="gallery-lightbox-modal"
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              id="lightbox-close-btn"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#c59b27] transition-colors z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev & Next navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#c59b27] transition-colors hidden sm:flex"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-[#c59b27] transition-colors hidden sm:flex"
              aria-label="Next image"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Modal Dialog Content */}
            <div
              className="relative max-w-4xl w-full max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="md:w-3/5 bg-black flex items-center justify-center p-2">
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain rounded"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Details side */}
              <div className="md:w-2/5 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#c59b27] block mb-1">
                    {activeLightboxItem.styleTag}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white mb-3">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {activeLightboxItem.description}
                  </p>
                  <div className="p-3.5 rounded bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                    <p className="text-zinc-200 font-medium">Studio Custom Piece</p>
                    <p>Each design is adapted to anatomical flow and individual narrative.</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800 space-y-3">
                  <button
                    onClick={() => {
                      const item = activeLightboxItem;
                      setLightboxIndex(null);
                      onEnquireWork(item);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b27] hover:bg-[#d8ae35] rounded transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Enquire About Similar Piece</span>
                  </button>

                  <p className="text-[11px] text-zinc-500 text-center">
                    Image {lightboxIndex !== null ? lightboxIndex + 1 : 1} of {filteredItems.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
