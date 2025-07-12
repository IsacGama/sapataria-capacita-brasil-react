import React, { useEffect, useState } from "react";
import { Banner } from "../../Componentes/Banner/Banner";
import ProdutoCard from "../../Componentes/produtos/cardProduto/cardProduto";
import { Link } from "react-router-dom";
import { getSapatos } from "../../utils/requestJson";
import styles from "./Home.module.css";

export function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarProdutos() {
      const data = await getSapatos();
      setProdutos(data.slice(0, 3));
      setCarregando(false);
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
      <h2>Destaques da Coleção</h2>

      <div className={styles.gridHomeProdutos}>
        {produtos.map((produto) => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>

      <Link to="/produtos" className={styles.btnVerTodos}>
        Ver todos os produtos
      </Link>
    </section>

    {/* Botão WhatsApp fixo */}
    <a
      href="https://wa.me/5599999999999" // substitua pelo seu número com DDI
      className={styles.whatsappButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
        alt="WhatsApp"
      />
    </a>
  </div>
);

      

}
