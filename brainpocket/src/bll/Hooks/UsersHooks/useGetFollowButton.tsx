import styles from "../../../ui/users/usersElement/UsersElement.module.css";
import type { User } from "../../types/usersTypes";

export function useGetFollowButton(
  loginUserFriends: number[],
  user: User,
  disabledButton: (id: number) => boolean,
  follow: (id: number) => void,
  unfollow: (id: number) => void
) {
  const button = loginUserFriends.some((f) => f === user.id) ? (
    <button disabled={disabledButton(user.id)} className={styles.btnunfollow} onClick={() => unfollow(user.id)}>
      удалить из друзей
    </button>
  ) : (
    <button
      disabled={disabledButton(user.id)}
      className={styles.btnfollow}
      onClick={() => {
        follow(user.id);
      }}
    >
      добавить в друзья
    </button>
  );
  return { button };
}
