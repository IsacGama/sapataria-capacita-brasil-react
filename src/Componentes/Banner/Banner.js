import React, { useState, useEffect } from "react";
import styles from "./Banner.module.css"; // Import correto para CSS Modules

export function Banner({ imagens }) {
  const [indiceAtual, setIndiceAtual] = useState(0);

  const proximaImagem = () => {
    setIndiceAtual((prev) => (prev + 1) % imagens.length);
  };

  const imagemAnterior = () => {
    setIndiceAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  const selecionarImagem = (index) => {
    setIndiceAtual(index);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      proximaImagem();
    }, 5000);

    return () => clearInterval(intervalo);
  }, [imagens.length]);

  return (
    <div className={styles.bannerCarousel}>
      <div className={styles.bannerSlides}>
        {imagens.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`${styles.bannerImg} ${
              index === indiceAtual ? styles.ativo : ""
            }`}
          />
        ))}
      </div>

      <button
        className={`${styles.bannerBtn} ${styles.prev}`}
        onClick={imagemAnterior}
      >
        ❮
      </button>
      <button
        className={`${styles.bannerBtn} ${styles.next}`}
        onClick={proximaImagem}
      >
        ❯
      </button>

      <div className={styles.bannerIndicadores}>
        {imagens.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicador} ${
              index === indiceAtual ? styles.ativo : ""
            }`}
            onClick={() => selecionarImagem(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
