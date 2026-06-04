import styles from "./Preloader.module.css";
import preloader from "..//../assets/img/preloader.svg";

export function Preloader() {
  return <img className={styles.preloader} src={preloader} alt="preloader" />;
}
