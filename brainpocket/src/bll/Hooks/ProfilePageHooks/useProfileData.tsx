import { useState, useEffect } from "react";
import { profileAPI } from "../../../dal/api";
import type { Profile } from "../../types/profileTypes";
import type { UserData } from "../../types/appTypes";
import { useParams } from "react-router-dom";

export function useProfileData(userData: UserData) {
  const [profile, setProfile] = useState<null | Profile>(null);
  const { userId } = useParams();
  useEffect(() => {
    profileAPI.getProfile(userId || userData.userId).then((res) => setProfile(res));
  }, [userId]);
  return { profile };
}
