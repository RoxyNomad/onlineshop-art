"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Artwork } from "@/server/shared/types/artwork.types";
import { OrderItem } from "@/server/shared/types/order.types";
import { getOrdersByArtist } from "@/core/queries/order/getOrdersByArtist";
import Image from "next/image";
import Sidebar from "@/app/(dashboard)/artist/dashboard/page";
import styles from "@/src/styles/artists/orders.module.scss";

interface OrdersByArtwork {
  artwork: Artwork;
  orders: OrderItem[];
}

const ArtistOrdersPage = () => {
  const { data: session } = useSession();
  const artistId = session?.user && 'id' in session.user ? (session.user as { id: string }).id : undefined;
  const [data, setData] = useState<OrdersByArtwork[]>([]);

  useEffect(() => {
    if (!artistId) return;

    const fetchData = async () => {
      try {
        const result = await getOrdersByArtist(artistId);
        setData(result);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchData();
  }, [artistId]);

  if (!session) return <p>Bitte logge dich ein, um deine Bestellungen zu sehen.</p>;

  return (
    <div className={styles.ordersPage}>
      <Sidebar />
      <div className={styles.ordersContainer}>
        {data.length === 0 ? (
          <p>Keine Bestellungen gefunden.</p>
        ) : (
          data.map(({ artwork, orders }) => (
            <div key={artwork.id} className={styles.orderItem}>
              <Image
                src={artwork.image_url}
                alt={artwork.name}
                width={300}
                height={300}
                className={styles.orderImage}
              />
              <h3>{artwork.name}</h3>
              <h4>Bestellungen:</h4>

              {orders.length > 0 ? (
                <ul>
                  {orders.map(order => (
                    <li key={order.id}>
                      Bestellung #{order.order_id} – Menge: {order.quantity} – Preis: {order.price}€
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Keine Bestellungen</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ArtistOrdersPage.displayName = "ArtistOrdersPage";
export default ArtistOrdersPage;
