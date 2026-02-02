import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { authAPI } from "../../api/api";
import { Navigate } from "react-router-dom";
import type { UserData } from "../../App";

type Props = {
  isAuth: boolean;
  handleLogin: (data: UserData) => void;
};
export type LoginFormData = {
  login: string;
  password: string;
  rememberMe: boolean;
};

function Login({ isAuth, handleLogin }: Props) {
  const [formData, setFormData] = useState<null | LoginFormData>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmit = (data: LoginFormData):void => {
    setFormData(data);
  };
  useEffect(() => {
    formData && authAPI.Login(formData).then((res) => handleLogin(res));
  }, [formData]);
  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.enterhow}>Войти как</div>
      <div>
        <input
          className={styles.inputText}
          placeholder="Login"
          type="text"
          {...register("login", {
            required: "Поле 'login' обязательно",
            maxLength: { value: 30, message: "Длина не должна превышать 30 символов" },
          })}
        />
      </div>
      <div>
        <input
          className={styles.inputText}
          placeholder="Password"
          type="password"
          {...register("password", {
            required: "Поле 'password' обязательно",
            maxLength: { value: 30, message: "Длина не должна превышать 30 символов" },
          })}
        />
      </div>
      <div>
        <input className={styles.checkbox} type="checkbox" {...register("rememberMe", { required: false })} />
        <span className={styles.rememberMe}>Запомни меня</span>
      </div>
      <div>
        <button className={styles.btn_enterLogin}>Войти</button>
      </div>
    </form>
  );
}
export default Login;
