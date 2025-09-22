import React, { useEffect, useState } from "react";
import { Banner } from "../../Componentes/Banner/Banner";
import ProdutoCard from "../../Componentes/produtos/cardProduto/cardProduto";
import { Link } from "react-router-dom";
import { getProdutos } from "../../utils/requestJson";
import styles from "./Home.module.css";
import { ApresentaçãoLoja } from "../Sobre/ApresentaçãoLoja";

export function Home() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarProdutos() {
      const data = await getProdutos();
      setProdutos(data.slice(0, 3));
      setCarregando(false);
    }
    carregarProdutos();
  }, []);

  const imagens = [
    "https://blog.brooksfield.com.br/wp-content/uploads/2023/10/SEO_Banner_1903-500_DESK-6.jpg",
    "https://blog.brooksfield.com.br/wp-content/uploads/2023/06/SEO_Banner_1903-500_DESK.jpg",
    "https://blog.voraxacessorios.com.br/wp-content/uploads/2023/09/Como_usC3A1-los.jpg",
    "https://blog.voraxacessorios.com.br/wp-content/uploads/2023/09/Como_usar_Oxfords_masculinos.jpg",
    "https://down-br.img.susercontent.com/file/sg-11134201-7req1-m82u70vwy4r507",
  ];

  return (
    <div>
      <Banner imagens={imagens} />
      <ApresentaçãoLoja />

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

      <a
        href="https://wa.me/5599999999999"
        className={styles.whatsappButton}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
          alt="whatsapp"
        />
      </a>
    </div>
  );
}
