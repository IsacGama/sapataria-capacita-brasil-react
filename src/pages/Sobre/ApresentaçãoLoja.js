import styles from "./ApresentaLoja.module.css";
import LogoSapataria from "../Sobre/imagens/LogoSapataria/Sapataria Sobre.png";

export function ApresentaçãoLoja() {
  return (
    <section className={styles.apresentacaoLoja}>
      <div className={styles.textoContainer}>
        <img
          src={LogoSapataria}
          alt="Logo Sapataria Capacita"
          className={styles.logoImage}
        />
        <div className={styles.texto}>
          <h1 className={styles.titulo}>Sobre a Sapataria Capacita</h1>
          <p className={styles.texto}>
            A <strong>Sapataria Capacita</strong> nasceu com o propósito de unir
            estilo, inclusão e capacitação profissional. Mais do que uma marca
            de calçados, somos um projeto social que acredita no poder da moda
            como ferramenta de transformação. Trabalhamos com materiais de
            qualidade, design acessível e um compromisso com a formação de
            pessoas. Cada par de sapatos conta uma história de superação,
            aprendizado e oportunidade. Aqui, cada passo tem significado.
          </p>
        </div>
      </div>
    </section>
  );
}
