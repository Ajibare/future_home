export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment", icon: "building" },
  { value: "house", label: "House", icon: "home" },
  { value: "duplex", label: "Duplex", icon: "layers" },
  { value: "townhouse", label: "Townhouse", icon: "building-2" },
  { value: "penthouse", label: "Penthouse", icon: "crown" },
  { value: "villa", label: "Villa", icon: "home" },
  { value: "commercial", label: "Commercial", icon: "briefcase" },
  { value: "land", label: "Land", icon: "map-pin" },
  { value: "office", label: "Office", icon: "building" },
  { value: "retail", label: "Retail", icon: "shopping-bag" },
  { value: "warehouse", label: "Warehouse", icon: "warehouse" },
] as const;

// Cloudinary Assets - Single source of truth for branding
export const ASSETS = {
  logo: "https://res.cloudinary.com/dhipowibc/image/upload/v1782734313/logo_qwqu5w.png",
} as const;

export const PROPERTY_STATUSES = [
  { value: "for-sale", label: "For Sale", color: "bg-primary-100 text-primary-700" },
  { value: "for-rent", label: "For Rent", color: "bg-blue-100 text-blue-700" },
  { value: "sold", label: "Sold", color: "bg-green-100 text-green-700" },
  { value: "rented", label: "Rented", color: "bg-emerald-100 text-emerald-700" },
  { value: "off-market", label: "Off Market", color: "bg-gray-100 text-gray-700" },
] as const;

export const LISTING_TYPES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
] as const;

export const PROPERTY_CATEGORIES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "luxury", label: "Luxury" },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-asc", label: "Area: Small to Large" },
  { value: "area-desc", label: "Area: Large to Small" },
  { value: "popular", label: "Most Popular" },
  { value: "price-per-sqft-asc", label: "Price/sqft: Low to High" },
  { value: "price-per-sqft-desc", label: "Price/sqft: High to Low" },
] as const;

export const BEDROOM_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
  { value: 5, label: "5+" },
] as const;

export const BATHROOM_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
] as const;

export const PRICE_RANGES_SALE = [
  { min: 0, max: 50000000, label: "Under ₦50M" },
  { min: 50000000, max: 100000000, label: "₦50M - ₦100M" },
  { min: 100000000, max: 200000000, label: "₦100M - ₦200M" },
  { min: 200000000, max: 500000000, label: "₦200M - ₦500M" },
  { min: 500000000, max: 1000000000, label: "₦500M - ₦1B" },
  { min: 1000000000, max: null, label: "Over ₦1B" },
] as const;

export const PRICE_RANGES_RENT = [
  { min: 0, max: 500000, label: "Under ₦500K/yr" },
  { min: 500000, max: 1000000, label: "₦500K - ₦1M/yr" },
  { min: 1000000, max: 2000000, label: "₦1M - ₦2M/yr" },
  { min: 2000000, max: 5000000, label: "₦2M - ₦5M/yr" },
  { min: 5000000, max: 10000000, label: "₦5M - ₦10M/yr" },
  { min: 10000000, max: null, label: "Over ₦10M/yr" },
] as const;

export const NIGERIAN_CITIES = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Kano",
  "Ibadan",
  "Kaduna",
  "Benin City",
  "Enugu",
  "Warri",
  "Calabar",
] as const;

export const LAGOS_NEIGHBORHOODS = [
  "Victoria Island",
  "Ikoyi",
  "Lekki",
  "Ajah",
  "Chevron",
  "Ikate",
  "Banana Island",
  "Eko Atlantic",
  "Oniru",
  "Osborne",
  "Parkview",
  "Magodo",
  "GRA Ikeja",
  "Surulere",
  "Yaba",
  "Ikeja",
  "Maryland",
  "Anthony",
  "Ojodu",
  "Ojota",
] as const;

export const AMENITIES_CATEGORIES = {
  interior: [
    "airConditioning",
    "heating",
    "furnished",
    "kitchenAppliances",
    "washerDryer",
    "walkInCloset",
    "fireplace",
    "balcony",
  ],
  building: [
    "elevator",
    "security",
    "concierge",
    "gym",
    "pool",
    "spa",
    "tennisCourt",
    "basketballCourt",
    "playground",
    "garden",
    "rooftop",
  ],
  utilities: [
    "internet",
    "cableTv",
    "intercom",
    "cctv",
    "backupGenerator",
    "solarPower",
    "waterTreatment",
  ],
  accessibility: [
    "wheelchairAccessible",
    "petFriendly",
  ],
} as const;

export const AMENITY_LABELS: Record<string, string> = {
  airConditioning: "Air Conditioning",
  heating: "Heating",
  furnished: "Furnished",
  kitchenAppliances: "Kitchen Appliances",
  washerDryer: "Washer/Dryer",
  walkInCloset: "Walk-in Closet",
  fireplace: "Fireplace",
  balcony: "Balcony",
  elevator: "Elevator",
  security: "24/7 Security",
  concierge: "Concierge",
  gym: "Gym/Fitness Center",
  pool: "Swimming Pool",
  spa: "Spa",
  tennisCourt: "Tennis Court",
  basketballCourt: "Basketball Court",
  playground: "Playground",
  garden: "Garden",
  rooftop: "Rooftop Terrace",
  internet: "High-speed Internet",
  cableTv: "Cable TV",
  intercom: "Intercom",
  cctv: "CCTV Surveillance",
  backupGenerator: "Backup Generator",
  solarPower: "Solar Power",
  waterTreatment: "Water Treatment",
  wheelchairAccessible: "Wheelchair Accessible",
  petFriendly: "Pet Friendly",
};

export const NEARBY_PLACE_TYPES = [
  { value: "school", label: "Schools", icon: "graduation-cap" },
  { value: "hospital", label: "Hospitals", icon: "hospital" },
  { value: "restaurant", label: "Restaurants", icon: "utensils" },
  { value: "shopping", label: "Shopping", icon: "shopping-bag" },
  { value: "park", label: "Parks", icon: "tree-pine" },
  { value: "transport", label: "Transport", icon: "bus" },
  { value: "bank", label: "Banks", icon: "landmark" },
  { value: "other", label: "Other", icon: "map-pin" },
] as const;

export const INQUIRY_TYPES = [
  { value: "viewing", label: "Schedule Viewing" },
  { value: "info", label: "Request Information" },
  { value: "offer", label: "Make an Offer" },
  { value: "other", label: "Other" },
] as const;

export const COMPANY_INFO = {
  name: "Future Home Properties",
  tagline: "Your Dream Home Awaits",
  description: "It will interest you to know that we are ever near you. Your comfort matters so much to our business and we are dedicated to serving you.",
  address: "18A Onikepo Akande Street, Lekki Phase 1, Lagos, Nigeria",
  phone: "+234 708 806 5449",
  phone2: "+234 808 888 0708",
  email: "info@futurehome.com",
  whatsapp: "+234 808 888 0708",
  hours: {
    weekdays: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed",
  },
  social: {
    facebook: "https://facebook.com/futurehome",
    twitter: "https://twitter.com/futurehome",
    instagram: "https://instagram.com/futurehome",
    linkedin: "https://linkedin.com/company/futurehome",
    youtube: "https://youtube.com/futurehome",
  },
} as const;

export const TEAM_MEMBERS: Array<{
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  order: number;
}> = [
  {
    id: "1",
    name: "Edwin Agbodu",
    role: "MD/CEO",
    bio: "Visionary leader with over 20 years of experience in real estate development and property management. Edwin has successfully delivered numerous landmark projects across Nigeria.",
    image: "/images/team/edwin-agbodu.jpg",
    email: "edwin@futurehome.com",
    phone: "+234 800 123 4567",
    linkedin: "https://linkedin.com/in/edwinagbodu",
    twitter: "https://twitter.com/edwinagbodu",
    instagram: "https://instagram.com/edwinagbodu",
    order: 1,
  },
  {
    id: "2",
    name: "Bar. Femi Sanni",
    role: "Legal Adviser",
    bio: "Seasoned legal practitioner specializing in property law, conveyancing, and real estate transactions. Femi ensures all our deals are legally sound and compliant.",
    image: "/images/team/femi-sanni.jpg",
    email: "femi@futurehome.com",
    phone: "+234 800 123 4568",
    linkedin: "https://linkedin.com/in/femisanni",
    order: 2,
  },
  {
    id: "3",
    name: "Damilola Ashamu",
    role: "Relationship Manager",
    bio: "Client-focused professional dedicated to building lasting relationships. Damilola ensures every client receives personalized service throughout their property journey.",
    image: "/images/team/damilola-ashamu.jpg",
    email: "damilola@futurehome.com",
    phone: "+234 800 123 4569",
    linkedin: "https://linkedin.com/in/damilolaashamu",
    instagram: "https://instagram.com/damilolaashamu",
    order: 3,
  },
  {
    id: "4",
    name: "Precious Aghazie",
    role: "General Manager",
    bio: "Operations expert with a keen eye for detail. Precious oversees daily operations, ensuring seamless service delivery and operational excellence across all departments.",
    image: "/images/team/precious-aghazie.jpg",
    email: "precious@futurehome.com",
    phone: "+234 800 123 4570",
    linkedin: "https://linkedin.com/in/preciousaghazie",
    twitter: "https://twitter.com/preciousaghazie",
    order: 4,
  },
];

export const SERVICES = [
  {
    id: "1",
    title: "Property Sales",
    description: "Expert guidance for buying and selling residential and commercial properties with maximum value realization.",
    icon: "home",
    features: [
      "Free property valuation",
      "Professional marketing",
      "Negotiation expertise",
      "Legal documentation",
      "Closing coordination",
    ],
  },
  {
    id: "2",
    title: "Property Rentals",
    description: "Comprehensive rental services for landlords and tenants with seamless lease management.",
    icon: "key",
    features: [
      "Tenant screening",
      "Lease preparation",
      "Rent collection",
      "Property maintenance",
      "Dispute resolution",
    ],
  },
  {
    id: "3",
    title: "Property Management",
    description: "Full-service property management ensuring your investment is protected and optimized.",
    icon: "building-2",
    features: [
      "Routine inspections",
      "Maintenance coordination",
      "Financial reporting",
      "Tenant relations",
      "Regulatory compliance",
    ],
  },
  {
    id: "4",
    title: "Investment Advisory",
    description: "Strategic real estate investment guidance for portfolio growth and wealth creation.",
    icon: "trending-up",
    features: [
      "Market analysis",
      "ROI projections",
      "Portfolio optimization",
      "Risk assessment",
      "Exit strategies",
    ],
  },
  {
    id: "5",
    title: "Property Development",
    description: "End-to-end development services from concept to completion for residential and commercial projects.",
    icon: "hammer",
    features: [
      "Feasibility studies",
      "Design & planning",
      "Construction management",
      "Quality assurance",
      "Project delivery",
    ],
  },
  {
    id: "6",
    title: "Legal & Conveyancing",
    description: "Expert legal services for all property transactions ensuring peace of mind.",
    icon: "scale",
    features: [
      "Title verification",
      "Contract drafting",
      "Due diligence",
      "Registration",
      "Dispute resolution",
    ],
  },
] as const;

export const STATISTICS = [
  { id: "1", label: "Properties Sold", value: "2,500+", prefix: "", suffix: "+" },
  { id: "2", label: "Happy Clients", value: "1,800+", prefix: "", suffix: "+" },
  { id: "3", label: "Years Experience", value: "15", prefix: "", suffix: "+" },
  { id: "4", label: "Awards Won", value: "25", prefix: "", suffix: "+" },
] as const;

export const WHY_CHOOSE_US = [
  {
    id: "1",
    title: "Expert Knowledge",
    description: "Our team possesses deep market insights and local expertise to guide you through every decision.",
    icon: "brain",
  },
  {
    id: "2",
    title: "Transparent Process",
    description: "We believe in complete transparency. No hidden fees, no surprises - just honest, straightforward service.",
    icon: "eye",
  },
  {
    id: "3",
    title: "Personalized Service",
    description: "Every client is unique. We tailor our approach to match your specific needs and preferences.",
    icon: "user-check",
  },
  {
    id: "4",
    title: "Proven Track Record",
    description: "With thousands of successful transactions, our results speak for themselves.",
    icon: "award",
  },
  {
    id: "5",
    title: "Tech-Enabled",
    description: "Leveraging cutting-edge technology for virtual tours, digital documents, and seamless communication.",
    icon: "monitor",
  },
  {
    id: "6",
    title: "After-Sale Support",
    description: "Our relationship doesn't end at closing. We provide ongoing support for all your property needs.",
    icon: "heart-handshake",
  },
] as const;

export const NAVIGATION_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Buy",
    href: "/properties?listingType=sale",
    children: [
      { label: "Houses for Sale", href: "/properties?listingType=sale&type=house" },
      { label: "Apartments for Sale", href: "/properties?listingType=sale&type=apartment" },
      { label: "Land for Sale", href: "/properties?listingType=sale&type=land" },
      { label: "Commercial for Sale", href: "/properties?listingType=sale&category=commercial" },
      { label: "Luxury Properties", href: "/properties?listingType=sale&category=luxury" },
      { label: "New Developments", href: "/properties?listingType=sale&status=new" },
    ],
  },
  {
    label: "Rent",
    href: "/properties?listingType=rent",
    children: [
      { label: "Houses for Rent", href: "/properties?listingType=rent&type=house" },
      { label: "Apartments for Rent", href: "/properties?listingType=rent&type=apartment" },
      { label: "Commercial for Rent", href: "/properties?listingType=rent&category=commercial" },
      { label: "Short-term Rentals", href: "/properties?listingType=rent&duration=short" },
    ],
  },
  {
    label: "Sell/Rent",
    href: "/list-property",
    children: [
      { label: "Sell Your Property", href: "/list-property?type=sale" },
      { label: "Rent Your Property", href: "/list-property?type=rent" },
      { label: "Property Valuation", href: "/valuation" },
      { label: "Marketing Packages", href: "/marketing-packages" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Property Management", href: "/services/property-management" },
      { label: "Investment Advisory", href: "/services/investment-advisory" },
      { label: "Property Development", href: "/services/property-development" },
      { label: "Legal & Conveyancing", href: "/services/legal-conveyancing" },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Market Reports", href: "/market-reports" },
      { label: "Guides", href: "/guides" },
      { label: "FAQ", href: "/faq" },
    ],
  },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about#team" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  buy: [
    { label: "Houses for Sale", href: "/properties?listingType=sale&type=house" },
    { label: "Apartments for Sale", href: "/properties?listingType=sale&type=apartment" },
    { label: "Land for Sale", href: "/properties?listingType=sale&type=land" },
    { label: "Luxury Properties", href: "/properties?listingType=sale&category=luxury" },
  ],
  rent: [
    { label: "Houses for Rent", href: "/properties?listingType=rent&type=house" },
    { label: "Apartments for Rent", href: "/properties?listingType=rent&type=apartment" },
    { label: "Commercial for Rent", href: "/properties?listingType=rent&category=commercial" },
  ],
  services: [
    { label: "Property Management", href: "/services/property-management" },
    { label: "Investment Advisory", href: "/services/investment-advisory" },
    { label: "Property Development", href: "/services/property-development" },
    { label: "Legal Services", href: "/services/legal-conveyancing" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Market Reports", href: "/market-reports" },
    { label: "Property Guides", href: "/guides" },
    { label: "FAQ", href: "/faq" },
    { label: "Property Valuation", href: "/valuation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
} as const;