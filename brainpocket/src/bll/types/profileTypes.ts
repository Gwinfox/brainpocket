import type { UserData } from "./appTypes";

//Пропсы
export type ProfilePageProps = {
  userData: UserData;
};
export type ProfileProps = {
  profile: Profile;
  loginUserId: number;
  changePhoto: (photo: string) => void;
};
export type AvatarProps = {
  avatar: string | null;
  userId: number;
  loginUserId: number;
  changePhoto: (photo: string) => void;
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
export type PostsProps = {
  loginUserId: number;
  userId: number;
};
export type PostProps = {
  loginUserId: number;
  userId: number;
  post: Post;
  deletePost: (id: number) => void;
  addLike: (id: number) => Promise<void>;
};
export type AddPostProps = {
  addPost: (loginUserId: number, post: string) => void;
  loginUserId: number;
};

export type Post = {
  id: number;
  author: number;
  post: string;
  likes: number;
  date: string;
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
export type PostForm = {
  newPost: string;
};
