import { useState, useEffect } from 'react';
import { StudioInfo, GalleryItem, ServiceItem } from './types';
import { DEFAULT_STUDIO_INFO, DEFAULT_SERVICES, DEFAULT_GALLERY } from './data/defaultData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Contact from './components/Contact';
import SocialSection from './components/SocialSection';
import Footer from './components/Footer';
import StudioSettingsModal from './components/StudioSettingsModal';

export default function App() {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(() => {
    try {
      const saved = localStorage.getItem('chelstone_studio_info');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_STUDIO_INFO;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('chelstone_gallery');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_GALLERY;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>();
  const [selectedReferenceTitle, setSelectedReferenceTitle] = useState<string | undefined>();

  // Persist studio info changes
  const handleSaveStudioInfo = (updated: StudioInfo) => {
    setStudioInfo(updated);
    try {
      localStorage.setItem('chelstone_studio_info', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Reset to default info
  const handleResetDefaults = () => {
    setStudioInfo(DEFAULT_STUDIO_INFO);
    setGalleryItems(DEFAULT_GALLERY);
    try {
      localStorage.removeItem('chelstone_studio_info');
      localStorage.removeItem('chelstone_gallery');
    } catch {
      // ignore
    }
  };

  // Add custom gallery item
  const handleAddGalleryItem = (item: GalleryItem) => {
    const updated = [item, ...galleryItems];
    setGalleryItems(updated);
    try {
      localStorage.setItem('chelstone_gallery', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Delete gallery item
  const handleDeleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter((i) => i.id !== id);
    setGalleryItems(updated);
    try {
      localStorage.setItem('chelstone_gallery', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select service from card
  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceTitle(service.title);
    setSelectedReferenceTitle(undefined);
    scrollToSection('booking');
  };

  // Select piece from gallery
  const handleEnquireWork = (item: GalleryItem) => {
    setSelectedReferenceTitle(`${item.title} (${item.styleTag})`);
    setSelectedServiceTitle(undefined);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 selection:bg-[#c59b27] selection:text-black font-sans">
      {/* Navigation */}
      <Navbar
        studioInfo={studioInfo}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onBookClick={() => scrollToSection('booking')}
      />

      {/* Main Website Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          studioInfo={studioInfo}
          onBookClick={() => scrollToSection('booking')}
          onViewWorkClick={() => scrollToSection('gallery')}
        />

        {/* About the Studio Section */}
        <About
          studioInfo={studioInfo}
          onBookClick={() => scrollToSection('booking')}
        />

        {/* Services Section */}
        <Services
          services={DEFAULT_SERVICES}
          onSelectService={handleSelectService}
        />

        {/* Portfolio / Gallery Section */}
        <Gallery
          galleryItems={galleryItems}
          onEnquireWork={handleEnquireWork}
          onOpenOwnerSettings={() => setIsSettingsOpen(true)}
        />

        {/* Booking & Enquiry Section */}
        <BookingForm
          studioInfo={studioInfo}
          selectedServiceTitle={selectedServiceTitle}
          selectedReferenceTitle={selectedReferenceTitle}
          onClearPreselect={() => {
            setSelectedServiceTitle(undefined);
            setSelectedReferenceTitle(undefined);
          }}
        />

        {/* Contact & Map Section */}
        <Contact
          studioInfo={studioInfo}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Social Media Section */}
        <SocialSection
          studioInfo={studioInfo}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        studioInfo={studioInfo}
        onBookClick={() => scrollToSection('booking')}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Studio Settings & Owner Customizer Modal */}
      <StudioSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        studioInfo={studioInfo}
        onSaveStudioInfo={handleSaveStudioInfo}
        onResetDefaults={handleResetDefaults}
        galleryItems={galleryItems}
        onAddGalleryItem={handleAddGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
      />
    </div>
  );
}
