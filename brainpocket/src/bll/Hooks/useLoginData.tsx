import { useEffect, useState } from "react";
import { authAPI } from "../../dal/api";
import type { ServerAuthResponse } from "./useUserInit";

type handleLogin = (data: ServerAuthResponse) => void;

export type LoginFormData = {
  login: string;
  password: string;
  rememberMe: boolean;
};

export function useLoginData(handleLogin: handleLogin) {
  const [formData, setFormData] = useState<null | LoginFormData>(null);
  useEffect(() => {
    formData && authAPI.Login(formData).then((res) => handleLogin(res));
  }, [formData]);
  const onSubmit = (data: LoginFormData): void => {
    setFormData(data);
  };
  return { formData, onSubmit };
}
