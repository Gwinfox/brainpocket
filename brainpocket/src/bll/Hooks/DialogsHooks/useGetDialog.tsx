import { useEffect, useState } from "react";
import type {Message } from "../../types/DialogsTypes";

export function useGetDialog(dialog: Message[]) {
  const [actualDialog, setActualDialog] = useState(dialog);
  const addMessage = (message: string) => {
    const newMessage = {
      id: actualDialog.length + 1,
      sender: "me",
      text: message,
    };
    setActualDialog([...actualDialog, newMessage]);
  };
  useEffect(() => {
    setActualDialog(dialog);
  }, [dialog]);
  return { actualDialog, addMessage };
}
