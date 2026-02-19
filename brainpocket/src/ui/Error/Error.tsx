import type { GlobalError } from "../../bll/Hooks/useUserInit";
import styles from "./Error.module.css";
import { NavLink } from "react-router-dom";

type Props = {
    error: GlobalError
}

const Error = ({ error }:Props) => {
  return (
    <div className={styles.ER_border}>
      <div className={styles.number}>{error.status}</div>
      <div className={styles.message}>{error.message}</div>
      <div className={styles.ER}>Что-то пошло не так...</div>
      <NavLink className={styles.link} to="/">
        <div className={styles.btn_back}>вернуться</div>
      </NavLink>
    </div>
  );
};

export default Error;