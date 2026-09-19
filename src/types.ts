export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  isCustomizable?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'black-grey' | 'fine-line' | 'artistic' | 'cover-up';
  imageUrl: string;
  beforeImageUrl?: string; // Optional for before/after cover-up showcase
  description: string;
  styleTag: string;
}

export interface StudioInfo {
  name: string;
  tagline: string;
  location: string;
  street: string;
  city: string;
  country: string;
  mapsUrl: string;
  phonePlaceholder: string;
  phoneRaw: string;
  whatsappPlaceholder: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookHandle: string;
  facebookUrl: string;
  tiktokHandle: string;
  tiktokUrl: string;
  openingHours: string;
  isOwnerCustomized: boolean;
}

export interface BookingInquiry {
  name: string;
  phone: string;
  email: string;
  serviceId?: string;
  serviceName?: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  placement?: string;
  sizeEstimate?: string;
  referenceImage?: string; // base64 or object URL
  submittedAt: string;
}
