import { IOrderRepository } from "../repositories/order.repository";
import { Order } from "../entities/order.entity";

export class GetOrdersByUserQuery {
  constructor(private readonly repo: IOrderRepository) {}

  async execute(userId: string): Promise<Order[]> {
    return await this.repo.getOrdersByUserId(userId);
  }
}
