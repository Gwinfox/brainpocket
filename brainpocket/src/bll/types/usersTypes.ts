import type { UserData } from "./appTypes";

// Пропсы
export type UsersProps = {
  userData: UserData | null;
};
export type Users = Array<User>;
export type UsersElementProps = {
  loginUserId: number;
  user: User;
  loginUserFriends: number[];
};
export type PaginatorProps = {
  totalItemsCount: number;
  pageSize: number;
  onPageChanged: (currentPage: number, pageSize: number) => void;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  location: Location | null;
  photos: Photos;
  friends: Array<number>;
};
type Location = {
  city: string;
  country: string;
};
type Photos = {
  mini: string | null;
  avatar: string | null;
  profileHeader: string | null;
};
export type PaginatorOptions = {
  portionNumber: number;
  currentPage: number;
  portionSize: number;
};
