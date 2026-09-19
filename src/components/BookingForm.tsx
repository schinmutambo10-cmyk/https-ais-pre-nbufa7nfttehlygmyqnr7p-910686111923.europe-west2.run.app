import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import { StudioInfo, BookingInquiry } from '../types';
import { Calendar, Clock, Upload, CheckCircle2, AlertCircle, MessageSquare, Send, X, FileImage, ShieldAlert } from 'lucide-react';

interface BookingFormProps {
  studioInfo: StudioInfo;
  selectedServiceTitle?: string;
  selectedReferenceTitle?: string;
  onClearPreselect?: () => void;
}

export default function BookingForm({
  studioInfo,
  selectedServiceTitle,
  selectedReferenceTitle,
  onClearPreselect
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    tattooIdea: '',
    preferredDate: '',
    preferredTime: 'Afternoon (14:00 - 17:00)',
    placement: '',
    sizeEstimate: 'Medium (approx palm size)',
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<BookingInquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const timeSlots = [
    'Morning (10:00 - 13:00)',
    'Afternoon (14:00 - 17:00)',
    'Evening (17:30 - 19:30)',
    'Consultation Discussion Only',
  ];

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert('Image size exceeds 8MB. Please choose a smaller image.');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullDescription = [
      selectedServiceTitle ? `[Service: ${selectedServiceTitle}]` : '',
      selectedReferenceTitle ? `[Inspiration Reference: ${selectedReferenceTitle}]` : '',
      formData.placement ? `[Placement: ${formData.placement}]` : '',
      formData.sizeEstimate ? `[Approx Size: ${formData.sizeEstimate}]` : '',
      formData.tattooIdea
    ].filter(Boolean).join('\n\n');

    const newInquiry: BookingInquiry = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceName: selectedServiceTitle,
      description: fullDescription,
      preferredDate: formData.preferredDate || 'Flexible / To be confirmed',
      preferredTime: formData.preferredTime,
      placement: formData.placement,
      sizeEstimate: formData.sizeEstimate,
      referenceImage: uploadedImage || undefined,
      submittedAt: new Date().toISOString(),
    };

    // Save inquiry to local storage for the studio owner
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('chelstone_inquiries') || '[]');
      existingInquiries.unshift(newInquiry);
      localStorage.setItem('chelstone_inquiries', JSON.stringify(existingInquiries.slice(0, 30)));
    } catch {
      // ignore storage errors
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedInquiry(newInquiry);
    }, 400);
  };

  const generateWhatsAppMessage = () => {
    if (!submittedInquiry) return '';
    const text = `Hello Chelstone Ink Art & Tattoos!\n\nI just submitted an appointment enquiry on your website.\n\n*Client Name:* ${submittedInquiry.name}\n*Phone:* ${submittedInquiry.phone}\n*Preferred Date:* ${submittedInquiry.preferredDate}\n*Time Preference:* ${submittedInquiry.preferredTime}\n${submittedInquiry.serviceName ? `*Service:* ${submittedInquiry.serviceName}\n` : ''}*Tattoo Idea/Concept:* ${formData.tattooIdea}\n${formData.placement ? `*Placement:* ${formData.placement}\n` : ''}\nCould we discuss availability and schedule a consultation? Thank you!`;
    return encodeURIComponent(text);
  };

  const resetForm = () => {
    setSubmittedInquiry(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      tattooIdea: '',
      preferredDate: '',
      preferredTime: 'Afternoon (14:00 - 17:00)',
      placement: '',
      sizeEstimate: 'Medium (approx palm size)',
    });
    setUploadedImage(null);
    setFileName('');
    if (onClearPreselect) onClearPreselect();
  };

  return (
    <section id="booking" className="py-24 bg-[#08080a] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-semibold tracking-[0.25em] text-[#c59b27] block mb-2">
            Schedule a Session
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-4">
            Book an Appointment
          </h2>
          <div className="w-16 h-0.5 bg-[#c59b27] mx-auto mb-6" />
          <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Share your concept with our studio on Mutanga Avenue, Lusaka. We take the time to review every enquiry carefully.
          </p>
        </div>

        {/* Selected Service / Reference Indicator */}
        {(selectedServiceTitle || selectedReferenceTitle) && (
          <div className="mb-8 p-4 rounded-lg bg-zinc-900 border border-[#c59b27]/40 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-[#c59b27] font-semibold uppercase tracking-wider block">
                Selected Focus
              </span>
              <span className="text-white font-medium">
                {selectedServiceTitle || selectedReferenceTitle}
              </span>
            </div>
            {onClearPreselect && (
              <button
                type="button"
                onClick={onClearPreselect}
                className="text-xs text-zinc-400 hover:text-zinc-200 underline"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* Success Confirmation View */}
        {submittedInquiry ? (
          <div className="rounded-xl bg-[#0e0e11] border border-zinc-800 p-8 sm:p-10 text-center shadow-2xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#c59b27]/10 border border-[#c59b27] text-[#c59b27] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
                Enquiry Received
              </h3>
              <p className="text-zinc-300 text-sm max-w-lg mx-auto font-light leading-relaxed">
                Thank you, <span className="text-white font-medium">{submittedInquiry.name}</span>. Your tattoo enquiry has been recorded. Our artist will review your concept and reach out via phone or email to discuss scheduling and consultation details.
              </p>
            </div>

            {/* Quick WhatsApp Action (Standard in Lusaka/Zambia) */}
            <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-800 max-w-lg mx-auto space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Dispatch</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                For fastest scheduling and immediate communication with the studio in Lusaka, you can also forward your enquiry directly to our WhatsApp:
              </p>
              <a
                href={`https://wa.me/${studioInfo.whatsappNumber.replace(/[^0-9]/g, '') || '260970000000'}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded font-semibold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Enquiry to WhatsApp</span>
              </a>
              <p className="text-[10px] text-zinc-500 italic">
                WhatsApp contact can be customized anytime by the studio owner in Studio Settings.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={resetForm}
                className="text-xs text-zinc-400 hover:text-[#c59b27] underline tracking-wider uppercase font-medium"
              >
                Submit another enquiry
              </button>
            </div>
          </div>
        ) : (
          /* Form */
          <form
            id="appointment-booking-form"
            onSubmit={handleSubmit}
            className="rounded-xl bg-[#0e0e11] border border-zinc-800 p-6 sm:p-10 shadow-2xl space-y-8"
          >
            {/* Contact Details Grid */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                <span>1. Your Contact Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="client-name" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2">
                    Full Name <span className="text-[#c59b27]">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Kondwani Phiri"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c59b27] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="client-phone" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2">
                    Phone Number <span className="text-[#c59b27]">*</span>
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    placeholder="e.g. +260 97X XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c59b27] transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="client-email" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2">
                    Email Address <span className="text-[#c59b27]">*</span>
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    placeholder="e.g. yourname@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c59b27] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Tattoo Idea & Description */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                <span>2. Tattoo Concept & Details</span>
              </h3>
              <div className="space-y-5">
                <div>
                  <label htmlFor="tattoo-idea" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2">
                    Tattoo Idea / Description <span className="text-[#c59b27]">*</span>
                  </label>
                  <textarea
                    id="tattoo-idea"
                    rows={4}
                    required
                    placeholder="Describe your design idea, style preference (black & grey, fine-line, script, floral, custom artwork), any specific elements or story behind it..."
                    value={formData.tattooIdea}
                    onChange={(e) => setFormData({ ...formData, tattooIdea: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c59b27] transition-colors resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="tattoo-placement" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2">
                      Body Placement (Optional)
                    </label>
                    <input
                      id="tattoo-placement"
                      type="text"
                      placeholder="e.g. Forearm, Shoulder, Ribs, Ankle"
                      value={formData.placement}
                      onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c59b27] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="tattoo-size" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2">
                      Approximate Size (Optional)
                    </label>
                    <select
                      id="tattoo-size"
                      value={formData.sizeEstimate}
                      onChange={(e) => setFormData({ ...formData, sizeEstimate: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 focus:outline-none focus:border-[#c59b27] transition-colors"
                    >
                      <option value="Small (under 5 cm / 2 inches)">Small (under 5 cm / 2 inches)</option>
                      <option value="Medium (approx palm size 5-15 cm)">Medium (approx palm size 5-15 cm)</option>
                      <option value="Large (half-sleeve, chest, thigh)">Large (half-sleeve, chest, thigh)</option>
                      <option value="Full Project (full sleeve, back piece)">Full Project (full sleeve, back piece)</option>
                      <option value="Unsure / Need artist advice">Unsure / Need artist advice</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time Preferences */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                <span>3. Preferred Schedule</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="preferred-date" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    id="preferred-date"
                    type="date"
                    value={formData.preferredDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 focus:outline-none focus:border-[#c59b27] transition-colors"
                  />
                  <span className="text-[11px] text-zinc-500 mt-1 block">Studio open Tue - Sat (Sun by appointment)</span>
                </div>

                <div>
                  <label htmlFor="preferred-time" className="block text-xs uppercase font-semibold tracking-wider text-zinc-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    id="preferred-time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded text-sm text-zinc-100 focus:outline-none focus:border-[#c59b27] transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Optional Image Upload Section (Complies with drag-and-drop and click requirement) */}
            <div>
              <h3 className="font-cinzel text-lg font-bold text-white mb-4 pb-2 border-b border-zinc-800 flex items-center gap-2">
                <span>4. Reference Images (Optional)</span>
              </h3>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-file-input"
              />

              {!uploadedImage ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? 'border-[#c59b27] bg-[#c59b27]/10'
                      : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-400">
                    <Upload className="w-5 h-5 text-[#c59b27]" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-200 mb-1">
                    Drag and drop reference images here, or <span className="text-[#c59b27] underline">browse</span>
                  </p>
                  <p className="text-[11px] text-zinc-500 font-light">
                    Supports JPG, PNG, WEBP up to 8MB. Share existing tattoos you like, sketches, or photos for inspiration.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded overflow-hidden border border-zinc-700 bg-black shrink-0">
                      <img
                        src={uploadedImage}
                        alt="Uploaded reference"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-200 truncate max-w-[200px] sm:max-w-xs">
                        {fileName || 'Reference image attached'}
                      </p>
                      <span className="text-[10px] text-[#c59b27] flex items-center gap-1">
                        <FileImage className="w-3 h-3" /> Ready for studio review
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Remove attached image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Required Disclaimer Note */}
            <div className="p-4 rounded-lg bg-zinc-950 border border-amber-900/30 text-xs text-zinc-400 flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-[#c59b27] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-zinc-300 font-medium block mb-0.5">Important Appointment Policy:</strong>
                Submitting this form is an enquiry and request for consultation; it does <strong className="text-zinc-200">not automatically guarantee an appointment</strong>. The studio will review your concept and contact you to confirm availability and discuss consultation details.
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                id="submit-booking-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded font-semibold text-xs sm:text-sm uppercase tracking-widest text-black bg-[#c59b27] hover:bg-[#d8ae35] active:bg-[#a68019] transition-all duration-200 shadow-xl shadow-[#c59b27]/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Booking Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
