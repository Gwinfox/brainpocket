import type { HeaderProps } from "../../bll/types/headerTypes";
import styles from "./Header.module.css";

function Header({ isAuth, logout }: HeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.jpg" alt="logo" />
      </div>
      <div className={styles.text}>
        <span className={styles.headerText}>Замечательная социальная сеть</span>
        <span className={styles.textlogo}>facekontakt</span>
      </div>
      {isAuth && (
        <div className={styles.loginBlock}>
          <button onClick={logout}>выйти</button>
        </div>
      )}
    </div>
  );
}

export default Header;
