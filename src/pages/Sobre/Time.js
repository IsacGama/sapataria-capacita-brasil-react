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
    foto: "https://media.licdn.com/dms/image/v2/D4D03AQE4-xnRdbtZuQ/profile-displayphoto-shrink_800_800/B4DZaH4.ZlG0Ac-/0/1746036583995?e=1758153600&v=beta&t=W_xxx-Zeh32FUk1TVfgIao1mhED7JFjuI25EWrr-VqQ",
  },
  {
    nome: "Bruno Erick",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://media.licdn.com/dms/image/v2/D4D03AQEA6qsZD1nMIA/profile-displayphoto-shrink_800_800/B4DZXdxmyDHwAc-/0/1743182525154?e=1758153600&v=beta&t=TmisEbL5Zl9w7DXncxu_UCTJcexovo2PbA_X6rasPGs",
  },
  {
    nome: "Ramiro Dantas",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://media.licdn.com/dms/image/v2/D4D03AQFaCPlqf3mtCA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728528419934?e=1758153600&v=beta&t=2EPoerhb8p43r5Q2WplVeIYvpD_YU_CWN4ZXiJ8nXR4",
  },
  {
    nome: "José Cleudiano",
    cargo: "Desenvolvedor Full Stack",
    foto: "https://media.licdn.com/dms/image/v2/D4D03AQFNiA5-zwZf3A/profile-displayphoto-shrink_800_800/B4DZYYDXboH4Ac-/0/1744160258224?e=1758153600&v=beta&t=tHl-bMh5HoIX4Tqw-ZccMJmshUgZVebbYNN1y85c6sc",
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
