import { ICartRepository } from "../repositories/cart.repository";
import { CartItem } from "../entities/cartItem.entity";

export class AddToCartCommand {
  constructor(private readonly repo: ICartRepository) {}

  async execute(item: CartItem) {
    await this.repo.addOrUpdateCartItem(item);
  }
}
