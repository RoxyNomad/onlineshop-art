'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/ui/dashboard/customer/CustomerSiderbar";
import CheckoutButton from "@/ui/dashboard/customer/CheckoutButton";
import { Artwork } from "@/domain/artworks/entities/artwork.entity";
import { CartItem } from "@/domain/shop/entities/cartItem.entity";
import { WishlistItem } from "@/domain/shop/entities/wishlistItem.entity";
import { ArtworkRepository } from "@/infrastructure/repositories/artwork.repository.impl";
import { CartRepository } from "@/infrastructure/repositories/cart.repository.impl";
import { WishlistRepository } from "@/infrastructure/repositories/wishlist.repository.impl";
import { GetAllArtworksQuery } from "@/domain/artworks/queries/getAllArtworks.query";
import { GetCartQuery } from "@/domain/shop/queries/getCart.query";
import { GetWishlistQuery } from "@/domain/shop/queries/getWishlist.query";
import { AddToCartCommand } from "@/domain/shop/commands/addToCart.command";
import { AddToWishlistCommand } from "@/domain/shop/commands/addToWishlist.command";
import styles from "@/src/styles/customer/shop.module.scss";

const Shop = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const userId = "current-user-id"; // Von Auth Context ersetzen

  // Repositories & Queries/Commands
  const artworkRepo = new ArtworkRepository();
  const cartRepo = new CartRepository();
  const wishlistRepo = new WishlistRepository();

  const getArtworksQuery = new GetAllArtworksQuery(artworkRepo);
  const getCartQuery = new GetCartQuery(cartRepo);
  const getWishlistQuery = new GetWishlistQuery(wishlistRepo);

  const addToCartCommand = new AddToCartCommand(cartRepo);
  const addToWishlistCommand = new AddToWishlistCommand(wishlistRepo);

  useEffect(() => {
    const fetchData = async () => {
      setArtworks(await getArtworksQuery.execute());
      setCart(await getCartQuery.execute(userId));
      setWishlist(await getWishlistQuery.execute(userId));
    };
    fetchData();
  }, [userId]);

  const handleAddToCart = async (artwork: Artwork) => {
    if (!userId) return;
    const item = new CartItem(
      `${artwork.id}-${userId}`, userId, artwork.id, artwork.name, artwork.price, 1, artwork.price
    );
    await addToCartCommand.execute(item);
    setCart(await getCartQuery.execute(userId));
  };

  const handleAddToWishlist = async (artwork: Artwork) => {
    if (!userId) return;
    const item = new WishlistItem(`${artwork.id}-${userId}`, userId, artwork.id, artwork.name);
    await addToWishlistCommand.execute(item);
    setWishlist(await getWishlistQuery.execute(userId));
  };

  return (
    <div className={styles.shopContainer}>
      <Sidebar />
      <div className={styles.productList}>
        {artworks.map(a => (
          <div key={a.id} className={styles.productCard}>
            <img src={a.imageUrl} alt={a.name} width={150} height={150} />
            <h3>{a.name}</h3>
            <p>{a.price} CHF</p>
            <button onClick={() => setSelectedArtwork(a)}>Zum Warenkorb hinzufügen</button>
            <button onClick={() => handleAddToWishlist(a)}>Zur Wunschliste hinzufügen</button>
          </div>
        ))}
      </div>
      {selectedArtwork && <CheckoutButton />}
    </div>
  );
};

export default Shop;
