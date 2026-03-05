import type { UserData } from "./appTypes";

//Пропсы
export type FriendsProps = {
  userData: UserData;
  setFriends: (friends: number[]) => void;
};
export type FriendsElementProps = {
  friend: Friend;
  unfollow: (id: number) => void;
  disabledButton: (id: number) => boolean;
};

export type Friends = Friend[];

export type Friend = {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  location: Location;
  photos: Photos;
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
