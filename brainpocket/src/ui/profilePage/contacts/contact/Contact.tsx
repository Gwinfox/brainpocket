import type { ContactProps } from "../../../../bll/types/profileTypes";
import styles from "./Contact.module.css";

export function Contact({ contact, value }: ContactProps) {
  return (
    <div className={value === null || value === "" ? styles.pending : styles.active}>
      {contact} <span>{value}</span>
    </div>
  );
}
