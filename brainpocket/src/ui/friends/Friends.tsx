import { useButtonIsPushing } from "../../bll/Hooks/common/useButtonIsPushing";
import { useGetFriends } from "../../bll/Hooks/FriendsHooks/useGetFriends";
import type { FriendsProps } from "../../bll/types/friendsTypes";
import { Paginator } from "../paginator/Paginator";
import styles from "./Friends.module.css";
import { FriendsElement } from "./friendsElement/FriendsElement";

export function Friends({ userData, setFriends }: FriendsProps) {
  const { isPushing, isNotPushing, disabledButton } = useButtonIsPushing();
  const { friendsList, totalItemsCount, onPageChanged, unfollow } = useGetFriends(
    userData.friends,
    userData.userId,
    setFriends,
    isPushing,
    isNotPushing
  );
  return (
    <div>
      <div className={styles.userList}>
        {friendsList &&
          friendsList.map((f, i) => (
            <div key={i}>
              <FriendsElement friend={f} unfollow={unfollow} disabledButton={disabledButton} />
            </div>
          ))}
      </div>
      <Paginator totalItemsCount={totalItemsCount} pageSize={5} onPageChanged={onPageChanged} />
    </div>
  );
}
