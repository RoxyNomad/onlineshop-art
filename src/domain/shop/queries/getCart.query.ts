import { ICartRepository } from "../repositories/cart.repository";
import { CartItem } from "../entities/cartItem.entity";

export class GetCartQuery {
  constructor(private readonly repo: ICartRepository) {}

  async execute(userId: string): Promise<CartItem[]> {
    return await this.repo.getCartByUser(userId);
  }
}