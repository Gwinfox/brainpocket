import { useEffect, useState } from "react";
import { friendsAPI, usersAPI } from "../../../dal/api";
import type { Friends } from "../../types/friendsTypes";
import { useGetError } from "../useGetError";

export function useGetFriends(
  friends: number[],
  loginUserId: number,
  setFriends: (friends: number[]) => void,
  isPushing: (id: number) => void,
  isNotPushing: (id: number) => void
) {
  const { setGlobalError } = useGetError();
  const [friendsList, setFriendsList] = useState<Friends | null>(null);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const onPageChanged = (currentPage: number, pageSize: number) => {
    friendsAPI
      .getFriends(friends, currentPage, pageSize)
      .then((res) => setFriendsList(res.items))
      .catch((err) => setGlobalError(err));
  };
  const unfollow = (userId: number) => {
    const newFriends = friends.filter((f) => f !== userId);
    isPushing(userId);
    usersAPI
      .unfollow(newFriends, loginUserId)
      .then((res) => {
        setFriends(res.friends);
        isNotPushing(userId);
      })
      .catch((err) => setGlobalError(err));
  };
  useEffect(() => {
    friendsAPI
      .getFriends(friends)
      .then((res) => {
        setFriendsList(res.items);
        setTotalItemsCount(res.totalCount);
      })
      .catch((err) => setGlobalError(err));
  }, []);
  return { friendsList, totalItemsCount, onPageChanged, unfollow };
}
