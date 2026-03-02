import { useState } from "react";
import styles from "../../../ui/users/usersElement/UsersElement.module.css";
import { usersAPI } from "../../../dal/api";

export function useGetFollowButton(loginUserFriends: number[], userId: number) {
  const [userFriends, setUserFriends] = useState<number[]>(loginUserFriends);
  const [buttonsIsPushing, setButtonsIsPushing] = useState<number[]>([]);
  const isPushing = (id: number) => {
    setButtonsIsPushing([...buttonsIsPushing, id]);
  };
  const follow = (oldFriends: number[], userId: number) => {
    const friends = [...oldFriends, userId];
    usersAPI
      .follow(friends, userId)
      .then((res) => setUserFriends(res.friends))
      .then(() => setButtonsIsPushing(buttonsIsPushing.filter((b) => b !== userId)));
  };
  const unfollow = (oldFriends: number[], userId: number) => {
    const friends = oldFriends.filter((f) => f !== userId);
    usersAPI
      .unfollow(friends, userId)
      .then((res) => setUserFriends(res.friends))
      .then(() => setButtonsIsPushing(buttonsIsPushing.filter((b) => b !== userId)));
  };
  const button = userFriends.some((f) => f === userId) ? (
    <button
      disabled={buttonsIsPushing.some((b) => b === userId)}
      className={styles.btnunfollow}
      onClick={() => {
        unfollow(userFriends, userId);
        isPushing(userId);
      }}
    >
      удалить из друзей
    </button>
  ) : (
    <button
      disabled={buttonsIsPushing.some((b) => b === userId)}
      className={styles.btnfollow}
      onClick={() => {
        follow(userFriends, userId);
        isPushing(userId);
      }}
    >
      добавить в друзья
    </button>
  );
  return { button };
}
