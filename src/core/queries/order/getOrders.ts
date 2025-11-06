import { query } from "@/lib/db";
import { Order } from "@/server/shared/types/order.types";

/**
 * Fetch all orders from the database.
 * Returns an array of Order objects.
 */
export const getOrders = async (): Promise<Order[]> => {
  return await query<Order>(
    `SELECT id, user_id, amount, status, created_at
     FROM orders
     ORDER BY created_at DESC`
  );
};
