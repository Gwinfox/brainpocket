import { NavLink } from "react-router-dom";
import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.NF_border}>
      <div className={styles.number}>404</div>
      <div className={styles.NF}>СТРАНИЦА НЕ НАЙДЕНА</div>
      <NavLink className={styles.link} to="/profile">
        <div className={styles.btn_back}>вернуться</div>
      </NavLink>
    </div>
  );
}
