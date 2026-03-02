import { NavLink } from "react-router-dom";
import styles from "./UsersElement.module.css";
import type { UsersElementProps } from "../../../bll/types/usersTypes";

export function UsersElement({ loginUserId, user }: UsersElementProps) {
  return (
    <div className={styles.usrObj}>
      <div className={styles.user_info}>
        <NavLink className={styles.fullname} to={"/profile/" + user.id}>
          {user.lastName ? user.firstName + " " + user.lastName : user.firstName}
          <div className={styles.status}>{user.status}</div>
          <div className={styles.location}>
            местоположение:{" "}
            <span>{user.location ? user.location.city + " " + user.location.country : "Не указано"}</span>
          </div>
        </NavLink>
        {/* <div>{btn}</div> */}
      </div>
      <NavLink className={styles.user_avatar} to={"/profile/" + user.id}>
        <img className={styles.avatar} src={user.photos.avatar ? user.photos.avatar : undefined} alt={user.firstName} />
      </NavLink>
    </div>
  );
}
