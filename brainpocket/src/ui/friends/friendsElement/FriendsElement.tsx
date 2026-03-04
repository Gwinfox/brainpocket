import { NavLink } from "react-router-dom";
import type { FriendsElementProps } from "../../../bll/types/friendsTypes";
import styles from "./FriendsElement.module.css";

export function FriendsElement({ friend, loginUserId, unfollow }: FriendsElementProps) {
  return (
    <div className={styles.usrObj}>
      <div className={styles.user_info}>
        <NavLink className={styles.fullname} to={"/profile/" + friend.id}>
          {friend.firstName + " " + friend.lastName}
          <div className={styles.status}>{friend.status}</div>
          <div className={styles.location}>
            местоположение:{" "}
            <span>{friend.location ? friend.location.city + " " + friend.location.country : "Не указано"}</span>
          </div>
        </NavLink>
        <div>
          <button
            className={styles.btnunfollow}
            onClick={() => unfollow(loginUserId)}
            // disabled={props.usersIsPushing.some((id) => id === props.id)}
          >
            удалить из друзей
          </button>
        </div>
      </div>
      <NavLink className={styles.user_avatar} to={"/profile/" + friend.id}>
        <img
          className={styles.avatar}
          src={friend.photos.avatar ? friend.photos.avatar : undefined}
          alt={friend.firstName}
        />
      </NavLink>
    </div>
  );
}
