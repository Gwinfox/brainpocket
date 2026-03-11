import { useEffect, useState } from "react";
import { dialogsAPI } from "../../../dal/api";
import type { Dialogs } from "../../types/dialogsTypes";
import { useGetError } from "../useGetError";

export function useGetDialogs(userId: number | undefined) {
  const { setGlobalError } = useGetError();
  const [dialogs, setDialogs] = useState<Dialogs | null>(null);
  useEffect(() => {
    userId &&
      dialogsAPI
        .getDialogs(userId)
        .then((res) => setDialogs(res))
        .catch((err) => setGlobalError(err));
  }, []);
  return { dialogs };
}
