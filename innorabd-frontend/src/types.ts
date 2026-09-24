export type CategoryType =
  | 'All'
  | 'Luxury Lace'
  | 'Push-Up & Balconette'
  | 'Everyday & T-Shirt'
  | 'Wireless & Bralette'
  | 'Bridal & Red-Gold'
  | 'Silk Sleepwear'
  | 'Matching Panties';

export type LaceType =
  | 'French Chantilly'
  | 'Floral Corded Lace'
  | 'Eyelash Scalloped Lace'
  | 'Vintage Guipure'
  | 'Laser-Cut Seamless'
  | 'Velvet Flocked Lace'
  | 'Pure Mulberry Silk';

export interface ProductColor {
  name: string;
  hex: string;
  accent?: string;
  image: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  sizePurchased: string;
  fitFeedback: 'True to Size' | 'Runs Small' | 'Runs Large';
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isLuxuryLace?: boolean;
  isBridal?: boolean;
  laceType: LaceType;
  fabric: string;
  coverage: 'Full Coverage' | 'Demi / Medium' | 'Plunge / Low' | 'Balconette';
  wired: boolean;
  padding: 'Non-Padded' | 'Lightly Padded' | 'Push-Up Level 1' | 'Push-Up Level 2' | 'Memory Foam';
  bandSizes: number[];
  cupSizes: string[];
  colors: ProductColor[];
  images: string[];
  description: string;
  craftsmanshipNotes: string[];
  careInstructions: string[];
  matchingItemId?: string;
  tags: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedBand: number;
  selectedCup: string;
  quantity: number;
}

export interface PackagingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  iconName: string;
  badge?: string;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  shippingDetails: ShippingDetails;
  packagingOption: PackagingOption;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  packagingPrice: number;
  shippingPrice: number;
  tax: number;
  total: number;
  status: 'Confirmed' | 'Discreetly Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface SizeRecommendation {
  bandSize: number;
  cupSize: string;
  underbustInches: number;
  bustInches: number;
  sisterSizeTight: string;
  sisterSizeLoose: string;
  fitTips: string[];
  recommendedCategory: CategoryType;
}

export interface FilterState {
  category: CategoryType;
  laceType: string;
  bandSize: number | null;
  cupSize: string | null;
  minPrice: number;
  maxPrice: number;
  wired: boolean | null;
  padding: string | null;
  coverage: string | null;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'discount';
  searchQuery: string;
}
