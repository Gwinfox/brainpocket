import { useEffect, useState } from "react";
import type { Friends } from "../../types/friendsTypes";
import { friendsAPI } from "../../../dal/api";

export function useGetRandomFriends(friends: number[]) {
  const [randomFriends, setRandomFriends] = useState<Friends>([]);
  useEffect(() => {
    friendsAPI.getRandomFriends(friends).then((res) => setRandomFriends(res.slice(0, 3)));
  }, []);
  return { randomFriends };
}
