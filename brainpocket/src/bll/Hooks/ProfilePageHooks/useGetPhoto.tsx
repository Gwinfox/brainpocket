import { useState } from "react";

export function useGetPhoto(avatar: string | null) {
  const [photo, setPhoto] = useState<string | null>(avatar);
  return { photo, setPhoto };
}
