"use client"; // Damit useState und useEffect im App Router funktionieren

import styles from '@/styles/customer/sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Neuer App Router Hook
import { logoutUser } from "@/infrastructure/services/auth.service";

const CustomerSidebar = () => {
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
    await logoutUser();
    router.push('/'); // Redirect to homepage after logout
  };

  return (
    <div>
      <div className={styles.sidebar}>
        <Link href="/customer/shop" className={styles.sidebarLink1}>Zum Shop</Link>
        <Link href="/customer/messages" className={styles.sidebarLink2}>Nachrichten</Link>
        <Link href="/customer/myOrders" className={styles.sidebarLink3}>Meine Bestellungen</Link>
        <Link href="/customer/settings" className={styles.sidebarLink4}>Einstellungen</Link>
        <button className={styles.sidebarButton} onClick={handleLogout}>Abmelden</button>
      </div>
    </div>
  );
};

export default CustomerSidebar;
