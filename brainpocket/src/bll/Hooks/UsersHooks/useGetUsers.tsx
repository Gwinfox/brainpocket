import { useEffect, useState } from "react";
import { usersAPI } from "../../../dal/api";
import type { Users } from "../../types/usersTypes";

export function useGetUsers() {
  const [users, setUsers] = useState<Users>([]);
  const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
  const onPageChanged = (currentPage: number, pageSize: number) => {
    usersAPI.getUsers(currentPage, pageSize).then((res) => setUsers(res.items));
  };
  useEffect(() => {
    usersAPI.getUsers().then((res) => {
      setUsers(res.items);
      setTotalUsersCount(res.totalCount);
    });
  }, []);
  return { users, totalUsersCount, onPageChanged };
}
