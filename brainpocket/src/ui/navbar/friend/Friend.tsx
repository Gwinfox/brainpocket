import { NavLink } from "react-router-dom";
import styles from "./Friend.module.css";
import type { FriendProps } from "../../../bll/types/navbarTypes";

export function Friend({ friend }: FriendProps) {
  return (
    <NavLink className={styles.friend} to={"/profile/" + friend.id}>
      <img
        className={styles.avatar}
        src={friend.photos.avatar ? friend.photos.avatar : "/img/unnamed.png"}
        alt={friend.firstName}
      ></img>
      <span className={styles.friendName}>{friend.firstName.toLowerCase()}</span>
    </NavLink>
  );
}
