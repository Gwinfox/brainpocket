import { useState } from "react";

export type UserData = {
    data: {
      userId: number;
      email: string;
      login: string;
      friends: Array<number>;
      avatar: string;
    };
    messages: Array<string>;
    resultCode: number;
  };

export function useUserInit() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [userData, setUserData] = useState<null | UserData>(null);
    const handleLogin = (data: UserData): void => {
      if (data.resultCode === 0) {
        setUserData(data);
        setIsAuth(true);
      }
    };
    return {isAuth, userData, handleLogin};
  }