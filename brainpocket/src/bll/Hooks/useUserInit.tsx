import { useEffect, useState } from "react";
import { authAPI } from "../../dal/api";

export type ServerAuthResponse = {
  data: UserData;
  messages: Array<string>;
  resultCode: number;
};
export type UserData = {
  userId: number;
  email: string;
  login: string;
  friends: Array<number>;
  avatar: string;
};

export function useUserInit() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | UserData>(null);
  const handleLogin = (data: ServerAuthResponse): void => {
    if (data.resultCode === 0) {
      setUserData(data.data);
      setIsAuth(true);
    }
  };
  const handleCoockies = (data: ServerAuthResponse) => {
    if (data.resultCode === 0) {
      setUserData(data.data);
      setIsAuth(true);
    }
  };
  useEffect(() => {
    authAPI.me().then((res) => handleCoockies(res));
  }, []);
  return { isAuth, userData, handleLogin };
}
