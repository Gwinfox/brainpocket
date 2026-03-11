import { useEffect, useState } from "react";
import { usersAPI } from "../../../dal/api";
import type { Users } from "../../types/usersTypes";
import { useGetError } from "../useGetError";

export function useGetUsers(
  loginUserId: number,
  friends: number[],
  setFriends: (friends: number[]) => void,
  isPushing: (id: number) => void,
  isNotPushing: (id: number) => void
) {
  const { setGlobalError } = useGetError();
  const [usersList, setUsersList] = useState<Users | null>(null);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
  const onPageChanged = (currentPage: number, pageSize: number) => {
    usersAPI
      .getUsers(currentPage, pageSize)
      .then((res) => setUsersList(res.items))
      .catch((err) => setGlobalError(err));
  };
  const unfollow = (userId: number) => {
    const newFriends = friends.filter((f) => f !== userId);
    isPushing(userId);
    setFriends(newFriends);
    usersAPI
      .unfollow(newFriends, loginUserId)
      .then((res) => {
        if (res.resultCode === 0) {
          isNotPushing(userId);
        }
      })
      .catch((err) => setGlobalError(err));
  };
  const follow = (userId: number) => {
    const newFriends = [...friends, userId];
    isPushing(userId);
    setFriends(newFriends);
    usersAPI
      .follow(newFriends, loginUserId)
      .then((res) => {
        if (res.resultCode === 0) {
          isNotPushing(userId);
        }
      })
      .catch((err) => setGlobalError(err));
  };
  useEffect(() => {
    usersAPI
      .getUsers()
      .then((res) => {
        setUsersList(res.items);
        setTotalUsersCount(res.totalCount);
      })
      .catch((err) => setGlobalError(err));
  }, []);
  return { usersList, totalUsersCount, onPageChanged, unfollow, follow };
}
