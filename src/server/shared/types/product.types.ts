// Interface for representing a product
export interface Product {
  name: string;  // Name of the product
  artist: string;  // Artist of the product
  price: string;  // Price of the product
  image_url: string;  // URL of the product's image
  description: string;  // Description of the product
}

// Interface for the props of the product page component
export interface ProductPageProps {
  product: Product | null;  // The product to display (could be null if not found)
}