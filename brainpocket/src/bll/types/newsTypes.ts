import type { UserData } from "./appTypes";

// Пропсы
export type NewsProps = {
  userData: UserData;
};
export type NewsElementProps = {
  post: string;
  avatar: string | null;
  fullName: string;
  date: string;
};

export type News = Array<NewsItem>;
type NewsItem = {
  id: number;
  author: number;
  date: string;
  firstName: string;
  lastName: string;
  likes: number;
  photos: PhotosType;
  post: string;
};
type PhotosType = {
  avatar: string | null;
  mini: string | null;
  profileHeader: string | null;
};
