import type { ServerAuthResponse } from "./appTypes";
// Пропсы
export type LoginProps = {
  isAuth: boolean;
  loginError: string | null;
  handleLogin: (data: ServerAuthResponse) => void;
};
export type CaptchaProps = {
  captcha: string;
};

export type LoginFormData = {
  login: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
