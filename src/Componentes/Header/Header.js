import styles from "./Header.module.css";
import React, { useState } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../Header/Logo/logo-sapataria.png";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img
            src={Logo}
            alt="Sapataria Capacita Logo"
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.navDesktop}>
          <Link to="/">Início</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/produtos">Produtos</Link>
        </nav>

        <div className={styles.actions}>
          <Search className={`${styles.icon} ${styles.desktopOnly}`} />
          <User className={`${styles.icon} ${styles.desktopOnly}`} />
          <Link to="/carrinho" onClick={() => setMenuOpen(false)}> 
            <ShoppingCart className={`${styles.icon} ${styles.desktopOnly}`} />
          </Link>
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
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Início
        </Link>
        <Link to="/sobre" onClick={() => setMenuOpen(false)}>
          Sobre
        </Link>
        <Link to="/produtos" onClick={() => setMenuOpen(false)}>
          Produtos
        </Link>
        <div className={styles.mobileIcons}>
          <Search className={styles.icon} />
          <User className={styles.icon} />
          <Link to="/carrinho" onClick={() => setMenuOpen(false)}> 
            <ShoppingCart className={styles.icon} />
          </Link>
        </div>
      </div>
    </header>
  );
}
