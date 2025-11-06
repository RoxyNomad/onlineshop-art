// Interface for representing a cart item
export interface CartItem {
  artwork_id: string;  // Unique identifier for the artwork
  user_id: string;  // Reference to the user who added the item to the cart
  size_id: string;  // Reference to the selected size
  frame_id: string;  // Reference to the selected frame
  quantity: number;  // Quantity of the item
  artwork_name: string;  // Name of the artwork
  price: number;  // Price of a single item
  total_price: number;  // Total price for the quantity of items
}