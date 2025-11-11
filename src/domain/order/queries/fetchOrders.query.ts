import { Order } from "@/domain/order/entities/order.entity";

export async function fetchOrders(): Promise<Order[]> {
  try {
    const res = await fetch("/api/orders");
    if (!res.ok) throw new Error("Failed to fetch orders");
    const data: Order[] = await res.json();
    return data;
  } catch (err) {
    console.error("Error in fetchOrders:", err);
    return [];
  }
}