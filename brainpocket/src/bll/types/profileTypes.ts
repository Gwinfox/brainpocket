import type { UserData } from "./appTypes";

//Пропсы
export type ProfilePageProps = {
  userData: UserData | null;
};
export type ProfileProps = {
  profile: Profile | null;
  loginUserId: number;
};
export type AvatarProps = {
  avatar: string | null | undefined;
  userId: number | undefined;
  loginUserId: number;
};

export type Profile = {
  aboutMe: string;
  contacts: Contacts;
  fullName: string;
  userId: number;
  photos: Photos;
  location: Location;
  friends: Array<number>;
};
type Contacts = {
  vk: string;
  email: string | null;
  github: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  facebook: string | null;
  mainlink: string | null;
  instagram: string | null;
};
type Photos = {
  mini: string | null;
  avatar: string | null;
  profileHeader: string | null;
};
type Location = {
  city: string | null;
  country: string | null;
};
