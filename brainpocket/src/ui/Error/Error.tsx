import type { AxiosError } from "axios";
import styles from "./Error.module.css";
import { NavLink } from "react-router-dom";

type Props = {
  error: AxiosError;
};

const Error = ({ error }: Props) => {
  return (
    <div className={styles.ER_border}>
      <div className={styles.number}>{error.response?.status}</div>
      <div className={styles.message}>{error.message}</div>
      <div className={styles.ER}>Что-то пошло не так...</div>
      <NavLink className={styles.link} to="/">
        <div className={styles.btn_back}>вернуться</div>
      </NavLink>
    </div>
  );
};

export default Error;
