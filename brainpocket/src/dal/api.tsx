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
  setContacts(data: Contacts, userId:number) {
    return instance.put("/profile/contacts", { data, userId }).then((res) => res.data);
  },
};
