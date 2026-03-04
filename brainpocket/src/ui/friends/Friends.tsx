import { useGetFriends } from "../../bll/Hooks/FriendsHooks/useGetFriends";
import type { FriendsProps } from "../../bll/types/friendsTypes";
import { Paginator } from "../paginator/Paginator";
import styles from "./Friends.module.css";
import { FriendsElement } from "./friendsElement/FriendsElement";

export function Friends({ userData }: FriendsProps) {
  const { friendsList, totalItemsCount, onPageChanged, unfollow } = useGetFriends(userData.friends);
  return (
    <div>
      <div className={styles.userList}>
        {friendsList &&
          friendsList.map((f, i) => (
            <div key={i}>
              <FriendsElement friend={f} loginUserId={userData.userId} unfollow={unfollow} />
            </div>
          ))}
      </div>
      <Paginator totalItemsCount={totalItemsCount} pageSize={5} onPageChanged={onPageChanged} />
    </div>
  );
}
