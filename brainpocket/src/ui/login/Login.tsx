import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { Navigate } from "react-router-dom";
import type { ServerAuthResponse } from "../../bll/Hooks/useUserInit";
import { useLoginData, type LoginFormData } from "../../bll/Hooks/useLoginData";

type Props = {
  isAuth: boolean;
  error: string | null;
  handleLogin: (data: ServerAuthResponse) => void;
};

function Login({ isAuth, error, handleLogin }: Props) {
  const onSubmit  = useLoginData(handleLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

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
      {errors.login && <div className={styles.error}>{errors.login.message}</div>}
      {errors.password && <div className={styles.error}>{errors.password.message}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}
export default Login;
