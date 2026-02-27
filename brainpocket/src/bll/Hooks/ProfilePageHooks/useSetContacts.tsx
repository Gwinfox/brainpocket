import { profileAPI } from "../../../dal/api";
import type { Contacts } from "../../types/profileTypes";

export function useSetContacts(loginUserId: number, closeSettings: (contacts:Contacts) => void) {
  const onSubmit = (data: Contacts) => {
    profileAPI.setContacts(data, loginUserId);
    closeSettings(data);
  };
  return { onSubmit };
}
