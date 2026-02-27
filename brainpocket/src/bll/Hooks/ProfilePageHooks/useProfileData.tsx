import { useState, useEffect } from "react";
import { profileAPI } from "../../../dal/api";
import type { Profile } from "../../types/profileTypes";
import type { UserData } from "../../types/appTypes";

export function useProfileData(userData: UserData | null) {
  const [profile, setProfile] = useState<null | Profile>(null);
  useEffect(() => {
    profileAPI.getProfile(userData?.userId).then((res) => setProfile(res));
  }, []);
  return { profile };
}
