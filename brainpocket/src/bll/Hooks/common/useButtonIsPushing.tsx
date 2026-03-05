import { useState } from "react";

export function useButtonIsPushing() {
  const [buttonsIsPushing, setButtonsIsPushing] = useState<number[]>([]);
  const isPushing = (id: number) => {
    setButtonsIsPushing([...buttonsIsPushing, id]);
  };
  const isNotPushing = (id: number) => {
    setButtonsIsPushing(buttonsIsPushing.filter((b) => b !== id));
  };
  const disabledButton = (id: number) => {
    return buttonsIsPushing.some((b) => id === b);
  };
  return { isPushing, isNotPushing, disabledButton };
}
