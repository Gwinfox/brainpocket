import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/logo.jpg" alt="logo" />
      </div>
      <div className={styles.text}>
        <span className={styles.headerText}>Замечательная социальная сеть </span>
        <span className={styles.nameText}>facekontakt</span>
      </div>
    </div>
  );
}

export default Header;
