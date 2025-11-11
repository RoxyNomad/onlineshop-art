"use client";

import styles from "@/src/styles/global.module.scss";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/ui/auth/LoginForm";
import RegisterForm from "@/ui/auth/RegisterForm";
import { useState, useEffect } from "react";
import { fetchCategories } from "@/domain/shop/queries/fetchCategories.query";
import { Category } from "@/domain/shop/entities/filter.entity";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // CQRS: Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories(); // Query aus Core
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleLoginClick = () => setShowLoginForm(!showLoginForm);
  const handleSwitchForm = () => setIsLogin(!isLogin);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Suche..."
          aria-label="Search"
          className={styles.search}
        />

        <div className={styles.navLinks}>
          <Link href="/galleryshop/public" className={styles.navLink1}>Home</Link>
          <Link href="/novelties/novelties" className={styles.navLink2}>Neuheiten</Link>

          <div
            className={styles.navItem}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link href="/photography/photography" className={styles.navLink3}>Fotografien</Link>

            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/photography/${category.id}`}
                      className={styles.dropdownItem}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <p className={styles.dropdownItem}>Keine Kategorie verfügbar</p>
                )}
              </div>
            )}
          </div>

          <Link href="/artists" className={styles.navLink4}>Künstler</Link>
        </div>

        <div className={styles.navButtons}>
          <button className={styles.navButton} aria-label="Login" onClick={handleLoginClick}>
            <Image src="/icons/login-icon.png" alt="Login Icon" width={18} height={18} />
          </button>

          {showLoginForm && (
            <>
              <div className={styles.modalOverlay} onClick={handleLoginClick} />
              <div className={styles.modal}>
                {isLogin ? <LoginForm /> : <RegisterForm />}
                <button
                  onClick={handleSwitchForm}
                  className={styles.switchButton}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    backgroundColor: isHovered ? "#333333" : "transparent",
                    color: isHovered ? "#F7E7CE" : "#000000",
                    border: "0.1vh solid #E6BE8A",
                    borderRadius: "1vh",
                    fontSize: "2vh",
                    fontFamily: "var(--font-playfair)",
                    marginTop: "2vh",
                    cursor: "pointer",
                  }}
                >
                  {isLogin ? "Kein Konto? Hier Registrieren!" : "Konto vorhanden? Hier Anmelden!"}
                </button>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
