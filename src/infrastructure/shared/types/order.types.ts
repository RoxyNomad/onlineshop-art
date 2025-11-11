export interface OrderItem {
  id: number;
  order_id: number;
  artwork_id: number;
  quantity: number;
  price: number;
  artwork: string;
  order: string;
}

export interface Order {
  id: number;
  name: string;
  customer: string;
  amount: number;
  status: string;
  created_at: string;
  order_items: string;
}
