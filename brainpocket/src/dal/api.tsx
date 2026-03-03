import axios from "axios";
import type { LoginFormData } from "../bll/Hooks/useLoginData";
import type { Contacts } from "../bll/types/profileTypes";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return err;
  }
);
export const authAPI = {
  Login(data: LoginFormData) {
    return instance.post("auth/login", { data }).then((res) => res.data);
  },
  me() {
    return instance.get("auth/me").then((res) => res.data);
  },
  logout() {
    return instance.get("/auth/logout").then((res) => {
      return res.data;
    });
  },
};
export const profileAPI = {
  getProfile(userId: number | undefined) {
    return instance.get("/profile/" + userId).then((res) => res.data);
  },
  updateUserAvatar(file: File, userId: number) {
    const formData = new FormData();
    formData.append("avatar", file);
    return instance
      .put("/profile/photo/" + userId, formData, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => res.data);
  },
  updateStatus(status: string | null, id: number) {
    return instance.post("/profile/status", { id, status });
  },
  setContacts(data: Contacts, userId: number) {
    return instance.put("/profile/contacts", { data, userId }).then((res) => res.data);
  },
  getPosts(id: number) {
    return instance.get("/profile/posts/" + id).then((res) => res.data);
  },
  like(postId: number): Promise<void> {
    return instance.post("/profile/posts/like", { postId });
  },
  deletePost(postId: number) {
    return instance.delete("/profile/deletepost/" + postId);
  },
  addPostAPI(id: number, post: string) {
    return instance.post("/profile/addpost", { id, post });
  },
};
export const dialogsAPI = {
  getDialogs(id: number) {
    return instance.get("/dialogs/" + id).then((res) => res.data);
  },
};
export const newsAPI = {
  getNews(friends: number[], page = 1, limit = 10) {
    return instance.post("/news/list", { friends, page, limit }).then((res) => res.data);
  },
};
export const usersAPI = {
  getUsers(currentPage: number = 1, pageSize: number = 5) {
    return instance.get(`/users?page=${currentPage}$count=${pageSize}`).then((res) => res.data);
  },
  follow(friends: number[], userId: number) {
    return instance.post("/users/follow", { friends, userId }).then((res) => res.data);
  },
  unfollow(friends: number[], userId: number) {
    return instance.post("/users/unfollow", { friends, userId }).then((res) => res.data);
  },
};
export const friendsAPI = {
  getFriends(friends: number[], page: number = 1, count: number = 5) {
    return instance.post("/users/friends", { page, count, friends }).then((res) => res.data);
  },
  getRandomFriends(friends: number[]) {
    return instance.post("/users/friends", { friends }).then((res) => res.data.items.sort(() => 0.5 - Math.random()));
  },
};
