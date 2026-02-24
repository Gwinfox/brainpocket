import { useEffect, useState } from "react";
import { authAPI } from "../../dal/api";
import type { ServerAuthResponse, UserData } from "../types/appTypes";

export function useUserInit() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | UserData>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
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
    authAPI.me().then((res) => handleCoockies(res));
  }, []);
  return { isAuth, userData, loginError, handleLogin };
}
