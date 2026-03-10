import type { ServerAuthResponse } from "./appTypes";

export type LoginProps = {
  isAuth: boolean;
  loginError: string | null;
  handleLogin: (data: ServerAuthResponse) => void;
};
export type LoginFormData = {
  login: string;
  password: string;
  rememberMe: boolean;
};