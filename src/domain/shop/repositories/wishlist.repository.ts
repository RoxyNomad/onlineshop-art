import { WishlistItem } from "../entities/wishlistItem.entity";

export interface IWishlistRepository {
  getWishlistByUser(userId: string): Promise<WishlistItem[]>;
  addWishlistItem(item: WishlistItem): Promise<void>;
}
