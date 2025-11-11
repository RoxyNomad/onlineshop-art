export interface Order {
  id: string;
  amount: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  amount: number;
  quantity: number;
  price: number;
  createdAt: string;
}

export class Order {
  constructor(
    public readonly id: string,
    public name: string,
    public status: "Bestellt" | "Verschickt" | "Zugestellt"
  ) {}
}