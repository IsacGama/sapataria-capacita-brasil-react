import React, { useEffect, useState } from "react";
import { Banner } from "../../Componentes/Banner/Banner";
import ProdutoCard from "../../Componentes/produtos/cardProduto/cardProduto";
import { Link } from "react-router-dom";
import { getSapatos } from "../../utils/requestJson";
import styles from "./Home.module.css";

export function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const data = await getSapatos();
      setProdutos(data.slice(0, 3));
    }
    carregarProdutos();
  }, []);

  const imagens = [
    "https://blog.brooksfield.com.br/wp-content/uploads/2023/05/SEO_Banner_770-314_TXT-1.jpg",
    "https://blog.brooksfield.com.br/wp-content/uploads/2023/10/SEO_Banner_1903-500_DESK-6.jpg",
    "https://blog.brooksfield.com.br/wp-content/uploads/2023/06/SEO_Banner_1903-500_DESK.jpg",
  ];

  return (
    <div>
      <Banner imagens={imagens} />

      <section className={styles.homeProdutos}>
        <h2 className={styles.titulo}>Destaques da Coleção</h2>

        <div className={styles.gridHomeProdutos}>
          {produtos.map((produto) => (
            <div className={styles.cardWrapper} key={produto.id}>
              <ProdutoCard produto={produto} />
            </div>
          ))}
        </div>

        <Link to="/produtos" className={styles.btnVerTodos}>
          Ver todos os produtos
        </Link>
      </section>
    </div>
  );
}
