import type { UsernameProps } from "../../../bll/types/profileTypes";
import styles from "./Username.module.css";

export function Username({ name }: UsernameProps) {
  return (
    <div className={styles.name}>
      <span>{name}</span>
    </div>
  );
}
