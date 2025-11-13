import { OrderItem } from "@/domain/order/entities/order.entity";
import { Artwork } from "@/domain/artworks/entities/artwork.entity";
import { pool } from "@/infrastructure/providers/db/db";

export class OrderRepository {
  async getOrdersGroupedByArtwork(artistId: string): Promise<{ artwork: Artwork; orders: OrderItem[] }[]> {
    // Alle Artworks vom Künstler holen
    const artworks = await pool.query<Artwork>(
      "SELECT * FROM artworks WHERE artist_id = $1",
      [artistId]
    );

    const result: { artwork: Artwork; orders: OrderItem[] }[] = [];

    for (const artwork of artworks) {
      const orders = await pool.query<OrderItem>(
        "SELECT * FROM orders WHERE artwork_id = $1 ORDER BY created_at DESC",
        [artwork.id]
      );
      result.push({ artwork, orders });
    }

    return result;
  }
}
