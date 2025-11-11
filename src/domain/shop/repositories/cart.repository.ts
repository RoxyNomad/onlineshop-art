import { CartItem } from "../entities/cartItem.entity";

export interface ICartRepository {
  getCartByUser(userId: string): Promise<CartItem[]>;
  addOrUpdateCartItem(item: CartItem): Promise<void>;
}
