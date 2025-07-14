import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export function Footer() {
  const instagram = "/assets/RedeSociais/instagram.png";
  const twitter = "/assets/RedeSociais/twitter.png";
  const facebook = "/assets/RedeSociais/facebook.png"
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <h2 className={styles.brand}>Sapataria Capacita</h2>
          <p className={styles.slogan}>Elegância em cada passo.</p>
        </div>

        <div>
          <h3 className={styles.title}>Links Rápidos</h3>
          <ul className={styles.list}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/sobre">Sobre</Link>
            </li>
            <li>
              <Link to="/produtos">Produtos</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Newsletter</h3>
          <p className={styles.text}>
            Assine para receber novidades e ofertas exclusivas.
          </p>
          <form className={styles.form}>
            <input type="email" placeholder="Seu email" />
            <button type="submit">Assinar</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Sapataria Capacita. Todos os direitos reservados.</p>
        <div className={styles.social}>
          <img src={instagram} alt="Instagram" className={styles.icon} />
          <img src={twitter} alt="Twitter" className={styles.icon} />
          <img src={facebook} alt="Facebook" className={styles.icon} />
        </div>
      </div>
    </footer>
  );
}
