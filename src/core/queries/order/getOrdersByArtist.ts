import { query } from "@/lib/db";
import { Artwork } from "@/server/shared/types/artwork.types";
import { OrderItem } from "@/server/shared/types/order.types";

interface OrdersByArtwork {
  artwork: Artwork;
  orders: OrderItem[];
}

export async function getOrdersByArtist(artistId: string): Promise<OrdersByArtwork[]> {
  // 1️⃣ Hol die Artworks des Künstlers
  const artworks = await query<Artwork>(
    "SELECT * FROM artworks WHERE artist_id = $1",
    [artistId]
  );

  if (!artworks.length) return [];

  // 2️⃣ Hol die Orders zu allen Artwork IDs
  const artworkIds = artworks.map(a => a.id);
  const orders = await query<OrderItem>(
    `SELECT * FROM order_items WHERE artwork_id = ANY($1::int[])`,
    [artworkIds]
  );

  // 3️⃣ Gruppiere Orders nach Artwork
  return artworks.map(artwork => ({
    artwork,
    orders: orders.filter(order => order.artwork_id === Number(artwork.id)),
  }));
}