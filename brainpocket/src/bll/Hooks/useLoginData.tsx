import { useEffect, useState } from "react";
import { authAPI } from "../../dal/api";
import type { ServerAuthResponse } from "../types/appTypes";
import type { LoginFormData } from "../types/loginTypes";
import { useGetError } from "./useGetError";

export function useLoginData(handleLogin: (data: ServerAuthResponse) => void) {
  const [formData, setFormData] = useState<null | LoginFormData>(null);
  const [captcha, setCaptcha] = useState<string | null>(null);
  const { setGlobalError } = useGetError();
  useEffect(() => {
    formData &&
      authAPI
        .Login(formData)
        .then((res) => {
          if (res.resultCode === 0) {
            handleLogin(res);
          } else {
            authAPI.getCaptcha().then((res) => setCaptcha(res));
          }
        })
        .catch((err) => setGlobalError(err));
  }, [formData]);
  const onSubmit = (data: LoginFormData): void => {
    setFormData(data);
  };
  return { onSubmit, captcha };
}
