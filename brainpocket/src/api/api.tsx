import axios from "axios";
import type { LoginFormData } from "../ui/login/Login";

const instance = axios.create({
  baseURL: "http://192.168.1.200/api",
  withCredentials: true,
});

export const authAPI = {
  Login(data: LoginFormData) {
    return instance.post("auth/login", { data }).then((res) => res.data);
  },
};
