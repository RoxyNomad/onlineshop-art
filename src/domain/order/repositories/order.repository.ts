import { Order } from "../entities/order.entity";

export interface IOrderRepository {
  getOrdersByUserId(userId: string): Promise<Order[]>;
}