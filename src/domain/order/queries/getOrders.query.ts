import { query } from "@/infrastructure/providers/db/db";
import { Order } from "@/domain/order/entities/order.entity";

/**
 * Query to fetch all orders (CQRS Query)
 */
export const getOrders = async (): Promise<Order[]> => {
  const result = await query<Order>(
    `SELECT id, amount, created_at FROM orders ORDER BY created_at DESC`
  );
  return result;
};