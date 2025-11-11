import { IWishlistRepository } from "../repositories/wishlist.repository";
import { WishlistItem } from "../entities/wishlistItem.entity";

export class GetWishlistQuery {
  constructor(private readonly repo: IWishlistRepository) {}

  async execute(userId: string): Promise<WishlistItem[]> {
    return await this.repo.getWishlistByUser(userId);
  }
}
