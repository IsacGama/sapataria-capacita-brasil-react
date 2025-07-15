import styles from "./Time.module.css";

const equipe = [
  {
    nome: "Isac Dias",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://avatars.githubusercontent.com/u/87917139?v=4",
  },
  {
    nome: "Beatriz Castro",
    cargo: "Desenvolvedora Full Stack",
    foto: "https://avatars.githubusercontent.com/u/136024712?v=4",
  },
  {
    nome: "Bruno Erick",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://avatars.githubusercontent.com/u/141072611?v=4",
  },
  {
    nome: "Ramiro Dantas",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://avatars.githubusercontent.com/u/58824534?v=4",
  },
  {
    nome: "José Cleudiano",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://avatars.githubusercontent.com/u/202461120?v=4",
  },
  {
    nome: "Adison",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://avatars.githubusercontent.com/u/208545833?v=4",
  },
];

export function Time() {
  return (
    <section className={styles.timeSection}>
      <h2 className={styles.title}>Nosso Time</h2>
      <div className={styles.cardsContainer}>
        {equipe.map((membro, index) => (
          <div key={index} className={styles.card}>
            <img src={membro.foto} alt={membro.nome} className={styles.foto} />
            <h3 className={styles.nome}>{membro.nome}</h3>
            <p className={styles.cargo}>{membro.cargo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
