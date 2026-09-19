import { ServiceItem, GalleryItem, StudioInfo } from '../types';
import heroStudioImg from '../assets/images/hero_tattoo_studio_1789838889859.jpg';
import tattooDetailImg from '../assets/images/tattoo_art_detail_1789838906259.jpg';
import artisticFlashImg from '../assets/images/artistic_flash_design_1789838930760.jpg';

export const DEFAULT_STUDIO_INFO: StudioInfo = {
  name: 'Chelstone Ink Art & Tattoos',
  tagline: 'INK YOUR STORY.',
  location: 'Chelstone, Lusaka, Zambia',
  street: 'Mutanga Avenue',
  city: 'Lusaka',
  country: 'Zambia',
  mapsUrl: 'https://maps.app.goo.gl/xkJLXKkCdrHDfQWEA',
  phonePlaceholder: '+260 [Add Studio Phone]',
  phoneRaw: '',
  whatsappPlaceholder: '+260 [Add WhatsApp Number]',
  whatsappNumber: '',
  instagramHandle: '@chelstoneinkart',
  instagramUrl: 'https://instagram.com/',
  facebookHandle: 'Chelstone Ink Art & Tattoos',
  facebookUrl: 'https://facebook.com/',
  tiktokHandle: '@chelstoneink',
  tiktokUrl: 'https://tiktok.com/',
  openingHours: 'Tuesday – Saturday: 09:30 – 18:00 | Sunday: By Appointment | Monday: Closed',
  isOwnerCustomized: false,
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'custom-tattoos',
    title: 'Custom Tattoos',
    subtitle: 'Bespoke Body Art',
    description: 'Unique, custom-drawn tattoo concepts tailored specifically to your anatomy, personal narrative, and preferred aesthetic style.',
    features: [
      'Tailored sizing and placement flow',
      'Black & grey, fine-line, or illustrative',
      'Meticulous precision and sterile setup',
      'Comprehensive aftercare guidance'
    ],
    isCustomizable: true
  },
  {
    id: 'tattoo-design',
    title: 'Tattoo Design',
    subtitle: 'Original Concepts & Stencils',
    description: 'Collaborative conceptual design work. We transform rough ideas, references, and sentimental stories into polished, skin-ready tattoo designs.',
    features: [
      'Concept sketching and stencil generation',
      'Reference refinement & creative consultation',
      'Scale and anatomical contour planning',
      'Full creative freedom for your story'
    ],
    isCustomizable: true
  },
  {
    id: 'tattoo-consultations',
    title: 'Tattoo Consultations',
    subtitle: 'In-Depth Concept Planning',
    description: 'One-on-one session to discuss placement, feasibility, style direction, and healing expectations before needle meets skin.',
    features: [
      'Anatomy & skin tone evaluation',
      'Cover-up assessment and rework options',
      'Clear session breakdown and preparation advice',
      'No-pressure artistic dialogue'
    ],
    isCustomizable: true
  },
  {
    id: 'artistic-work',
    title: 'Artistic Work',
    subtitle: 'Original Art & Visual Commission',
    description: 'Beyond skin: custom canvas paintings, illustrative art commissions, and flash design concepts produced by the studio.',
    features: [
      'Original flash artwork & art prints',
      'Custom canvas & illustration commissions',
      'Expressive African and contemporary art styles',
      'Studio exhibition pieces'
    ],
    isCustomizable: true
  }
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Precision Studio Craftsmanship',
    category: 'black-grey',
    imageUrl: heroStudioImg,
    description: 'In-studio session capturing the meticulous needle discipline and sterile environment at Chelstone Ink Art & Tattoos.',
    styleTag: 'Studio Session'
  },
  {
    id: 'gallery-2',
    title: 'Botanical & Geometric Linework',
    category: 'fine-line',
    imageUrl: tattooDetailImg,
    description: 'Crisp fine-line botanical composition combined with delicate stippling and organic flow.',
    styleTag: 'Fine Line & Stippling'
  },
  {
    id: 'gallery-3',
    title: 'Original Studio Flash & Illustration',
    category: 'artistic',
    imageUrl: artisticFlashImg,
    description: 'Hand-drawn custom concept incorporating eagle strength motifs and African flora.',
    styleTag: 'Artistic Concept'
  },
  {
    id: 'gallery-4',
    title: 'Detailed Realism Lion Artwork',
    category: 'black-grey',
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1000&q=80',
    description: 'High-contrast black & grey wildlife portrait showcasing smooth ink gradients and hair texture.',
    styleTag: 'Black & Grey'
  },
  {
    id: 'gallery-5',
    title: 'Delicate Floral Forearm Composition',
    category: 'fine-line',
    imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=1000&q=80',
    description: 'Subtle single-needle micro-botanical piece designed to wrap naturally around the wrist and forearm.',
    styleTag: 'Micro Fine Line'
  },
  {
    id: 'gallery-6',
    title: 'Custom Cover-Up & Re-Artistry',
    category: 'cover-up',
    imageUrl: 'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=1000&q=80',
    beforeImageUrl: 'https://images.unsplash.com/photo-1590246814883-5783361494e8?auto=format&fit=crop&w=1000&q=80',
    description: 'Strategic cover-up transforming a faded, irregular shape into a cohesive, dark organic piece with depth.',
    styleTag: 'Cover-Up Transformation'
  },
  {
    id: 'gallery-7',
    title: 'Bold Illustrative Dark Art Piece',
    category: 'artistic',
    imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?auto=format&fit=crop&w=1000&q=80',
    description: 'Heavy saturation combined with dynamic motion lines and contrast shading for maximum visual impact.',
    styleTag: 'Illustrative Art'
  },
  {
    id: 'gallery-8',
    title: 'Geometric Arm Mandalas',
    category: 'fine-line',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    description: 'Sacred geometry and repeating linework mapped symmetrically to anatomical movement points.',
    styleTag: 'Geometric Line'
  }
];

export const STUDIO_PRINCIPLES = [
  {
    id: 'principle-creativity',
    title: 'Uncompromised Creativity',
    desc: 'Every client is unique. We approach each skin canvas with fresh creative perspective, translating your thoughts and symbols into original art.'
  },
  {
    id: 'principle-professionalism',
    title: 'Strict Professionalism',
    desc: 'Hygienic studio protocols, hospital-grade single-use cartridges, sealed inks, and a calm, clean, respectful studio atmosphere.'
  },
  {
    id: 'principle-detail',
    title: 'Precision & Detail',
    desc: 'From microscopic needle control to long-term healing resilience, every line and gradient is placed with rigorous attention to detail.'
  },
  {
    id: 'principle-experience',
    title: 'Client-Centered Experience',
    desc: 'Getting tattooed is a personal journey. We ensure clear communication, comfortable pacing, and dedicated aftercare support.'
  }
];
