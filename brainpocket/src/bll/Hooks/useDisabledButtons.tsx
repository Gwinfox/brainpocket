import { useState } from "react";

export function useDisabledButtons(addLike: (id: number) => Promise<void>) {
  const [buttonIsPushing, setButtonIsPushing] = useState<number[]>([]);
  function addLikeBtn(id: number) {
    setButtonIsPushing([...buttonIsPushing, id]);
    addLike(id).then(() => {
      setButtonIsPushing(buttonIsPushing.filter((btnId: number) => btnId !== id));
    });
  }
  return { addLikeBtn, buttonIsPushing };
}
