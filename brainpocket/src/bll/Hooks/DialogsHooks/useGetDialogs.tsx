import { useEffect, useState } from "react";
import { dialogsAPI } from "../../../dal/api";
import type { Dialogs } from "../../types/dialogsTypes";
import { useGetError } from "../useGetError";

export function useGetDialogs(userId: number | undefined) {
  const { setError } = useGetError();
  const [dialogs, setDialogs] = useState<Dialogs | null>(null);
  useEffect(() => {
    userId &&
      dialogsAPI
        .getDialogs(userId)
        .then((res) => setDialogs(res))
        .catch((err) => setError(err));
  }, []);
  return { dialogs };
}
