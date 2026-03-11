import axios from "axios";
import type { LoginFormData } from "../bll/types/loginTypes";
import type { Contacts } from "../bll/types/profileTypes";
import type { SimplifiedError } from "../bll/types/errorTypes";
import type { RegistrationFormFields } from "../bll/types/registrationTypes";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
//Ловим ошибки, формируем упрощенную ошибку
instance.interceptors.response.use(
  (response) => {
    return response; // Возвращаем res если все хорошо
  },
  (error) => {
    // Если ошибка
    const simplifiedError: SimplifiedError = {
      // Создаем базовый объект ошибки
      message: "Упс, всё сломалось",
    };
    if (error.response) {
      // Если сервер вернул ошибку
      simplifiedError.status = error.response.status; // Берем код ошибки
      if (error.response.data?.error) {
        simplifiedError.message = error.response.data.error; // Если есть сообщение, берем и его
      }
    } else if (error.request) {
      // Если нет соединения с сервером
      simplifiedError.status = error.request.status;
      simplifiedError.message = "Нет связи с сервером";
    } else {
      simplifiedError.message = "Неизвестная ошибка";
    }
    return Promise.reject(simplifiedError);
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
  registration(data: RegistrationFormFields) {
    const formData = new FormData();
    data.file && formData.append("avatar", data.file);
    for (let field in data) {
      if (field !== "file") {
        formData.append(field, data[field as keyof RegistrationFormFields] as string);
      }
    }
    return instance.put("/auth/registration", formData).then((response) => response.data);
  },
};
export const profileAPI = {
  getProfile(userId: string | number) {
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
  addPost(id: number, post: string) {
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
