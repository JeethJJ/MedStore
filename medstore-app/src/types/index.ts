export interface ProductVariant {
  color?: string;
  type?: string;
  label: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number; // percentage
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: string;
  images: string[];
  variants: ProductVariant[];
  offers: Offer[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CustomerDetails {
  name: string;
  whatsapp: string;
  address: string;
  notes: string;
}
