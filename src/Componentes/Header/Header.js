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
          <span role="img" aria-label="sapato">
            👞
          </span>
          Sapataria Capacita
        </div>

        <nav className={styles.navDesktop}>
          <a href="#">Novidades</a>
          <a href="#">Coleções</a>
          <a href="">Produtos</a>
          <a href="#">Acessórios</a>
          <a href="#">Sobre</a>
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
        <a href="#">Novidades</a>
        <a href="#">Coleções</a>
        <a href="#">Sapatos</a>
        <a href="#">Acessórios</a>
        <a href="#">Sobre</a>
        <div className={styles.mobileIcons}>
          <Search className={styles.icon} />
          <User className={styles.icon} />
          <ShoppingCart className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
