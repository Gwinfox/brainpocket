import { useEffect, useState } from "react";
import type { Friends } from "../../types/friendsTypes";
import { friendsAPI } from "../../../dal/api";
import { useGetError } from "../useGetError";

export function useGetRandomFriends(friends: number[]) {
  const { setError } = useGetError();
  const [randomFriends, setRandomFriends] = useState<Friends>([]);
  useEffect(() => {
    friendsAPI
      .getRandomFriends(friends)
      .then((res) => setRandomFriends(res.slice(0, 3)))
      .catch((err) => setError(err));
  }, []);
  return { randomFriends };
}
