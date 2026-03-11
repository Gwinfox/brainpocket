import { useEffect, useState } from "react";
import { authAPI } from "../../dal/api";
import type { ServerAuthResponse, UserData } from "../types/appTypes";
import { useGetError } from "./useGetError";

export function useUserInit() {
  const { setGlobalError } = useGetError();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | UserData>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const logout = () => {
    authAPI.logout().catch((err) => setGlobalError(err));
    setIsAuth(false);
    setUserData(null);
  };
  const handleLogin = (data: ServerAuthResponse): void => {
    if (data.resultCode === 0) {
      setUserData(data.data);
      setIsAuth(true);
    }
    if (data.resultCode === 1) {
      setLoginError(data.messages[0]);
    }
  };
  const handleCoockies = (data: ServerAuthResponse): void => {
    if (data.resultCode === 0) {
      setUserData(data.data);
      setIsAuth(true);
    }
  };
  useEffect(() => {
    authAPI
      .me()
      .then((res) => handleCoockies(res))
      .catch((err) => setGlobalError(err));
  }, []);
  const setFriends = (newFriends: number[]) => {
    setUserData({ ...userData!, friends: newFriends });
  };
  return { isAuth, userData, loginError, handleLogin, logout, setFriends };
}
