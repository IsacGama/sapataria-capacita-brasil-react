import { Time } from "./Time";
import styles from "./Sobre.module.css";
import { ApresentaçãoLoja } from "./ApresentaçãoLoja";

export function Sobre() {
  return (
    <section className={styles.sobre}>
      <div className={styles.equipeContainer}>
        <ApresentaçãoLoja />
        <Time />
      </div>
    </section>
  );
}
