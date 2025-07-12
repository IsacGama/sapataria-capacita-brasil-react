import React from "react";
import styles from "./Footer.module.css";

export function Footer() {
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
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Sobre</a>
            </li>
            <li>
              <a href="#">Produtos</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.title}>Ajuda</h3>
          <ul className={styles.list}>
            <li>
              <a href="#">Contato</a>
            </li>
            <li>
              <a href="#">Política de Privacidade</a>
            </li>
            <li>
              <a href="#">Termos de Serviço</a>
            </li>
            <li>
              <a href="#">FAQs</a>
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
          <a href="#">🌐</a>
          <a href="#">📷</a>
          <a href="#">🐦</a>
        </div>
      </div>
    </footer>
  );
}
