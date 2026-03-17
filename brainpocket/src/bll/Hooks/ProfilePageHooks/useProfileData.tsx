import { useState, useEffect } from "react";
import { profileAPI } from "../../../dal/api";
import type { Profile } from "../../types/profileTypes";
import type { UserData } from "../../types/appTypes";
import { useParams } from "react-router-dom";
import { useGetError } from "../useGetError";

export function useProfileData(userData: UserData) {
  const [profile, setProfile] = useState<null | Profile>(null);
  const { setGlobalError } = useGetError();
  const { userId } = useParams();
  const changePhoto = (photo: string) => {
    setProfile((prev) => {
      if (!prev) return prev;
      return { ...prev, photos: { ...prev.photos, avatar: photo } };
    });
  };
  useEffect(() => {
    profileAPI
      .getProfile(userId || userData.userId)
      .then((res) => setProfile(res))
      .catch((err) => {
        setGlobalError(err);
      });
  }, [userId]);
  return { profile, changePhoto };
}
