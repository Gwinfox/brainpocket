import { useEffect, useState } from "react";
import { authAPI, friendsAPI, usersAPI } from "../../../dal/api";
import type { Friends } from "../../types/friendsTypes";

export function useGetFriends(friends: number[]) {
  const [friendsList, setFriendsList] = useState<Friends | null>(null);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const onPageChanged = (currentPage: number, pageSize: number) => {
    friendsAPI.getFriends(friends, currentPage, pageSize).then((res) => setFriendsList(res.items));
  };
  const unfollow = (userId: number) => {
    const newFriends = friends.filter((f) => f !== userId);
    usersAPI.unfollow(newFriends, userId).then(() => {
      authAPI.me().then((res) => setFriendsList(res.data.friends));
    });
  };
  useEffect(() => {
    friendsAPI.getFriends(friends).then((res) => {
      setFriendsList(res.items);
      setTotalItemsCount(res.totalCount);
    });
  }, [friends]);
  return { friendsList, totalItemsCount, onPageChanged, unfollow };
}
