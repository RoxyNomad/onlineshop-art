"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "@/styles/customer/checkoutButton.module.scss";
import { fetchCurrentUser, User } from "@/domain/shop/queries/fetchCurrentUser.query";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Temporarily hardcoded email — replace with session
  const userEmail = "test@example.com";

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await fetchCurrentUser(userEmail);
      if (!currentUser) setError("User not found");
      else setUser(currentUser);
    };
    loadUser();
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const { sessionId, error: checkoutError, url } = await res.json();

      if (checkoutError) {
        setError(checkoutError);
        setLoading(false);
        return;
      }

      const stripe = await stripePromise;
      if (stripe && sessionId) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        setError("Stripe session failed to load.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Checkout failed.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={styles.checkoutButton}
      >
        {loading ? "Loading..." : "Buy Now"}
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
