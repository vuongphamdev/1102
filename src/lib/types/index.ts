// Image Types
export interface ImageItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Carousel Types
export interface CarouselItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CarouselResponse {
  items: CarouselItem[];
}

// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  location: string;
  time: string;
  description: string;
  imageFolderId: string;
  images: ImageItem[];
}

export interface ProductsResponse {
  data: Product[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}
