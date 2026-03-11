import { profileAPI } from "../../../dal/api";
import type { Contacts } from "../../types/profileTypes";
import { useGetError } from "../useGetError";

export function useSetContacts(loginUserId: number, closeSettings: (contacts: Contacts) => void) {
  const { setGlobalError } = useGetError();
  const onSubmit = (data: Contacts) => {
    profileAPI.setContacts(data, loginUserId).catch((err) => setGlobalError(err));
    closeSettings(data);
  };
  return { onSubmit };
}
