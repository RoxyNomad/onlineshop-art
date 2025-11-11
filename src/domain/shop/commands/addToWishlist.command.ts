import { IWishlistRepository } from "../repositories/wishlist.repository";
import { WishlistItem } from "../entities/wishlistItem.entity";

export class AddToWishlistCommand {
  constructor(private readonly repo: IWishlistRepository) {}

  async execute(item: WishlistItem) {
    await this.repo.addWishlistItem(item);
  }
}
