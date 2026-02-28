import { NavLink } from "react-router-dom";
import styles from "./Sender.module.css";
import type { SenderProps } from "../../../bll/types/dialogsTypes";
export function Sender({ id, avatar, name }: SenderProps) {
  return (
    <NavLink to={`/dialogs/${id}`} className={(style) => (style.isActive ? styles.active : styles.pending)}>
      <img className={styles.avatar} src={avatar} alt="avatar" />
      {name}
    </NavLink>
  );
}
