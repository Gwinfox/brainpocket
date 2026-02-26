import type { UserData } from "./appTypes";

//Пропсы
export type ProfilePageProps = {
  userData: UserData | null;
};
export type ProfileProps = {
  profile: Profile;
  loginUserId: number;
};
export type AvatarProps = {
  avatar: string | null;
  userId: number;
  loginUserId: number;
};
export type UsernameProps = {
  name: string;
};
export type StatusProps = {
  status: string;
  userId: number;
  loginUserId: number;
};
export type EditStatusProps = {
  setNewStatus: () => void;
  handleChangeStatus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusText: string;
};
export type ContactsProps = {
  userId: number;
  loginUserId: number;
  contacts: Contacts;
};
export type ContactProps = {
  contact: string;
  value: string | null;
};
export type ContactsFormProps = {
  contacts: Contacts;
  loginUserId: number;
  closeSettings: (contacts: Contacts) => void;
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
export type Contacts = {
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
