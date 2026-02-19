import axios from "axios";
import type { LoginFormData } from "../bll/Hooks/useLoginData";
import { Navigate } from "react-router-dom";

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
