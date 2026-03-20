import { useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { Navigate, NavLink } from "react-router-dom";
import { useLoginData } from "../../bll/Hooks/useLoginData";
import type { LoginFormData, LoginProps } from "../../bll/types/loginTypes";
import Captcha from "./captcha/Captcha";

function Login({ isAuth, loginError, handleLogin }: LoginProps) {
  const { onSubmit, captcha } = useLoginData(handleLogin);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className={styles.window}>
      <NavLink className={styles.btn_reg} to="/registration">
        Регистрация
      </NavLink>
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
        {loginError && <div className={styles.error}>{loginError}</div>}
        {captcha && (
          <div>
            <div className={styles.captchaBlock}>
              <Captcha captcha={captcha} />
              <input className={styles.captchaInput} {...register("captcha", { required: true })} />
            </div>
            <div className={styles.entercap}>Введите каптчу</div>
          </div>
        )}
      </form>
    </div>
  );
}
export default Login;
