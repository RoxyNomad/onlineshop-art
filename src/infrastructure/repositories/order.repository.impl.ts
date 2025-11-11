import { IOrderRepository } from "@/domain/order/repositories/order.repository";
import { Order } from "@/domain/order/entities/order.entity";
import { pool } from "@/lib/db"; // NeonDB connection

export class OrderRepository implements IOrderRepository {
  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const results = await pool.query<Order>(
      "SELECT id, name, status FROM orders WHERE user_id = $1",
      [userId]
    );

    return results.map(r => new Order(r.id, r.name, r.status as Order["status"]));
  }
}
