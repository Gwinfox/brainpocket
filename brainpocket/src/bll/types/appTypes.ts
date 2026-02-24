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
export interface withAuthRedirectProps {
  component: React.ReactNode;
  isAuth: boolean;
  redirectPath?: string;
}
