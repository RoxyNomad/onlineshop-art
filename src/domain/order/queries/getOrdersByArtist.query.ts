import { OrderItem } from "@/domain/order/entities/order.entity";
import { Artwork } from "@/domain/artworks/entities/artwork.entity";
import { OrderRepository } from "@/infrastructure/repositories/order.repository";

export interface OrdersByArtworkDTO {
  artwork: Artwork;
  orders: OrderItem[];
}

export async function getOrdersByArtistQuery(artistId: string): Promise<OrdersByArtworkDTO[]> {
  const repo = new OrderRepository();
  const data = await repo.getOrdersGroupedByArtwork(artistId);
  return data;
}
