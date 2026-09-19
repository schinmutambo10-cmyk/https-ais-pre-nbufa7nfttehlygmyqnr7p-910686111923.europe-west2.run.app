import { useState, useEffect } from 'react';
import { StudioInfo, BookingInquiry, GalleryItem } from '../types';
import { X, Save, RotateCcw, Phone, MessageSquare, Instagram, Facebook, Video, MapPin, Clock, ListOrdered, CheckCircle, ImagePlus, Trash2 } from 'lucide-react';

interface StudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  studioInfo: StudioInfo;
  onSaveStudioInfo: (updated: StudioInfo) => void;
  onResetDefaults: () => void;
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string) => void;
}

export default function StudioSettingsModal({
  isOpen,
  onClose,
  studioInfo,
  onSaveStudioInfo,
  onResetDefaults,
  galleryItems,
  onAddGalleryItem,
  onDeleteGalleryItem
}: StudioSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'gallery' | 'inquiries'>('contact');
  const [formData, setFormData] = useState<StudioInfo>(studioInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);

  // New photo form state
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<'black-grey' | 'fine-line' | 'artistic' | 'cover-up'>('black-grey');
  const [newPhotoStyle, setNewPhotoStyle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');

  useEffect(() => {
    setFormData(studioInfo);
  }, [studioInfo]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('chelstone_inquiries') || '[]');
        setInquiries(stored);
      } catch {
        setInquiries([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveStudioInfo({
      ...formData,
      isOwnerCustomized: true
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleAddNewPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl) {
      alert('Please provide an image URL or photo upload.');
      return;
    }
    const newItem: GalleryItem = {
      id: 'custom-' + Date.now(),
      title: newPhotoTitle || 'Custom Studio Piece',
      category: newPhotoCategory,
      styleTag: newPhotoStyle || 'Studio Custom',
      imageUrl: newPhotoUrl,
      description: newPhotoDesc || 'Original tattoo work crafted at Chelstone Ink Art & Tattoos.'
    };
    onAddGalleryItem(newItem);
    setNewPhotoTitle('');
    setNewPhotoUrl('');
    setNewPhotoStyle('');
    setNewPhotoDesc('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#0e0e12] border border-zinc-700/80 rounded-xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
              <h2 className="font-cinzel text-lg font-bold text-white uppercase tracking-wider">
                Studio Customizer (Owner Mode)
              </h2>
            </div>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              Edit studio contact numbers, social links, and real tattoo portfolio items.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/60 px-5 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-[#c59b27] text-[#c59b27]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Contact & Socials
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'gallery'
                ? 'border-[#c59b27] text-[#c59b27]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Portfolio Photos ({galleryItems.length})
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-4 border-b-2 transition-colors ${
              activeTab === 'inquiries'
                ? 'border-[#c59b27] text-[#c59b27]'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Client Enquiries ({inquiries.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: Contact & Socials */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Studio Phone Number</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +260 97 123 4567"
                    value={formData.phoneRaw}
                    onChange={(e) => setFormData({ ...formData, phoneRaw: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                  />
                  <span className="text-[10px] text-zinc-500">Replaces the phone placeholder</span>
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Number (with country code)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +260971234567"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                  />
                  <span className="text-[10px] text-zinc-500">Powering direct WhatsApp booking</span>
                </div>

                {/* Instagram Handle */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    <span>Instagram Handle / Link</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @chelstoneinkart or full URL"
                    value={formData.instagramHandle}
                    onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                {/* Facebook Handle */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Facebook className="w-3.5 h-3.5 text-blue-500" />
                    <span>Facebook Page / Link</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chelstone Ink Art & Tattoos"
                    value={formData.facebookHandle}
                    onChange={(e) => setFormData({ ...formData, facebookHandle: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                {/* TikTok Handle */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                    <span>TikTok Handle / Link</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @chelstoneink"
                    value={formData.tiktokHandle}
                    onChange={(e) => setFormData({ ...formData, tiktokHandle: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Street & Area</span>
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                  />
                </div>
              </div>

              {/* Operating Hours */}
              <div>
                <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Studio Hours Notice</span>
                </label>
                <input
                  type="text"
                  value={formData.openingHours}
                  onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Gallery Management */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Add New Photo Form */}
              <form onSubmit={handleAddNewPhoto} className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <ImagePlus className="w-4 h-4 text-[#c59b27]" />
                  <span>Add Real Studio Tattoo Photo</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-400 block mb-1">Piece Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Healed Lion Forearm"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Category</label>
                    <select
                      value={newPhotoCategory}
                      onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                    >
                      <option value="black-grey">Black & Grey</option>
                      <option value="fine-line">Fine Line</option>
                      <option value="cover-up">Cover-Up</option>
                      <option value="artistic">Artistic & Canvas</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-zinc-400 block mb-1">Image URL or Data URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://... or upload link"
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Style Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Realism, Fine Line"
                      value={newPhotoStyle}
                      onChange={(e) => setNewPhotoStyle(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">Short Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Custom session on forearm"
                      value={newPhotoDesc}
                      onChange={(e) => setNewPhotoDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-200 focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c59b27] text-black font-semibold rounded hover:bg-[#d8ae35] transition-colors"
                >
                  Add to Gallery
                </button>
              </form>

              {/* Existing Gallery List */}
              <div className="space-y-2">
                <p className="font-semibold text-zinc-300">Current Gallery Items ({galleryItems.length})</p>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {galleryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 rounded bg-zinc-950 border border-zinc-800"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-10 h-10 object-cover rounded bg-black shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="truncate">
                          <p className="font-medium text-white truncate">{item.title}</p>
                          <span className="text-[10px] text-zinc-500 uppercase">{item.styleTag}</span>
                        </div>
                      </div>
                      {galleryItems.length > 3 && (
                        <button
                          type="button"
                          onClick={() => onDeleteGalleryItem(item.id)}
                          className="p-1 text-zinc-500 hover:text-red-400"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Client Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-zinc-200 flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4 text-[#c59b27]" />
                  <span>Received Appointment Enquiries</span>
                </p>
                {inquiries.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear local inquiry log?')) {
                        localStorage.removeItem('chelstone_inquiries');
                        setInquiries([]);
                      }
                    }}
                    className="text-[11px] text-red-400 hover:underline"
                  >
                    Clear log
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="p-8 text-center bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-500">
                  No appointment enquiries received yet. When visitors fill the booking form, their requests will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{inq.name}</span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(inq.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-zinc-300 space-y-0.5">
                        <p><strong className="text-zinc-500">Phone:</strong> {inq.phone}</p>
                        <p><strong className="text-zinc-500">Email:</strong> {inq.email}</p>
                        <p><strong className="text-zinc-500">Preferred Date/Time:</strong> {inq.preferredDate} ({inq.preferredTime})</p>
                      </div>
                      <div className="p-2.5 rounded bg-zinc-900 text-zinc-300 whitespace-pre-line text-[11px]">
                        {inq.description}
                      </div>
                      {inq.referenceImage && (
                        <div className="mt-2">
                          <p className="text-[10px] text-zinc-500 mb-1">Attached Reference:</p>
                          <img
                            src={inq.referenceImage}
                            alt="Reference"
                            className="w-20 h-20 object-cover rounded border border-zinc-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset contact placeholders back to standard studio defaults?')) {
                onResetDefaults();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-red-400"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b27] hover:bg-[#d8ae35] rounded shadow-md transition-colors"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
