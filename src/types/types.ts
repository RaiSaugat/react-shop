export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  shippingInformation: string;
  reviews: Review[];
  minimumOrderQuantity: number;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  sku: string;
  tags: string[];
  returnPolicy: string;
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
