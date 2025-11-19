"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/app/(dashboard)/artist/dashboard/page";
import Image from "next/image";
import styles from "@/ui/styles/artists/orders.module.scss";

// Core
import { getOrdersByArtistQuery, OrdersByArtworkDTO } from "@/domain/order/queries/getOrdersByArtist.query";

const ArtistOrdersPage = () => {
  const { data: session } = useSession();
  const artistId = session?.user?.id;
  const [data, setData] = useState<OrdersByArtworkDTO[]>([]);

  useEffect(() => {
    if (!artistId) return;

    const fetchOrders = async () => {
      const orders = await getOrdersByArtistQuery(artistId);
      setData(orders);
    };

    fetchOrders();
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
                src={artwork.imageUrl}
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
