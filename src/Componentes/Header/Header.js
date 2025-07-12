import styles from "./Header.module.css";
import React, { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5899/5899460.png"
            alt="Logo Sapataria Capacita"
            className={styles.logoImage}
          />
          Sapataria Capacita
        </div>

        <nav className={styles.navDesktop}>
          <a href="#">Inicio</a>
          <a href="#">Sobre</a>
          <a href="#">Produtos</a>
        </nav>

        <div className={styles.actions}>
          <Search className={`${styles.icon} ${styles.desktopOnly}`} />
          <User className={`${styles.icon} ${styles.desktopOnly}`} />
          <ShoppingCart className={`${styles.icon} ${styles.desktopOnly}`} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles.menuToggle}
            aria-label="Abrir menu"
          >
            {menuOpen ? (
              <X className={styles.icon} />
            ) : (
              <Menu className={styles.icon} />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`${styles.navMobile} ${menuOpen ? styles.open : ""}`}>
        <a href="#">Inicio</a>
        <a href="#">Sobre</a>
        <a href="#">Produtos</a>
        <div className={styles.mobileIcons}>
          <Search className={styles.icon} />
          <User className={styles.icon} />
          <ShoppingCart className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
