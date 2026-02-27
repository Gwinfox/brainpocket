import { useEffect, useState } from "react";
import { dialogsAPI } from "../../../dal/api";
import type { Dialogs } from "../../types/DialogsTypes";

export function useGetDialogs(userId: number | undefined) {
  const [dialogs, setDialogs] = useState<Dialogs | null>(null);
  useEffect(() => {
    userId && dialogsAPI.getDialogs(userId).then((res) => setDialogs(res));
  }, []);
  return { dialogs };
}
