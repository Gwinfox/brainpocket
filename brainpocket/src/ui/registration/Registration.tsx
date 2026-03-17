import styles from "./Registration.module.css";
import { useForm } from "react-hook-form";
import type { RegistrationFormFields, RegistrationProps } from "../../bll/types/registrationTypes";
import { inputField } from "../../bll/inputRegistrationField";
import { useGetCanvasReg } from "../../bll/Hooks/RegistrationHooks/useGetCanvasReg";
import { useGetCompressedPhoto } from "../../bll/Hooks/RegistrationHooks/useGetCompressedPhoto";
import { useGetHandleSubmit } from "../../bll/Hooks/RegistrationHooks/useGetHandleSubmit";
import { useNavigate } from "react-router-dom";

export function Registration({ setUserData, setIsAuth }: RegistrationProps) {
  const { drawImageToCanvas, canvasRef } = useGetCanvasReg();
  const { compressedFile, isCompressing, handleFileChange } = useGetCompressedPhoto(drawImageToCanvas);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationFormFields>();
  const navigate = useNavigate();
  const { onSubmit } = useGetHandleSubmit(compressedFile, setError, setUserData, navigate, setIsAuth);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div className={styles.enterData}>Введите свои данные</div>
      <div>
        {inputField(errors.firstName ? styles.errArea : styles.inputText, "text", "имя", "firstName", 50, register)}
        {errors.firstName && <div className={styles.error}>{errors.firstName.message}</div>}
      </div>
      <div>
        {inputField(errors.lastName ? styles.errArea : styles.inputText, "text", "фамилия", "lastName", 50, register)}
        {errors.lastName && <div className={styles.error}>{errors.lastName.message}</div>}
      </div>
      <div>
        {inputField(errors.login ? styles.errArea : styles.inputText, "text", "login", "login", 30, register)}
        {errors.login && <div className={styles.error}>{errors.login.message}</div>}
      </div>
      <div>
        {inputField(
          errors.password ? styles.errArea : styles.inputText,
          "password",
          "пароль",
          "password",
          30,
          register
        )}
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
      </div>
      <div>
        {inputField(
          errors.repeatpassword ? styles.errArea : styles.inputText,
          "password",
          "повторите пароль",
          "repeatpassword",
          30,
          register
        )}
        {errors.repeatpassword && <div className={styles.error}>{errors.repeatpassword.message}</div>}
        {errors.root && <div className={styles.error}>{errors.root.message}</div>}
      </div>
      <div className={styles.text}>
        <span>Укажите ваше местоположение</span>
      </div>
      <div>
        {inputField(errors.city ? styles.errArea : styles.inputText, "text", "город", "city", 50, register)}
        {errors.city && <div className={styles.error}>{errors.city.message}</div>}
      </div>
      <div>
        {inputField(errors.country ? styles.errArea : styles.inputText, "text", "страна", "country", 50, register)}
        {errors.country && <div className={styles.error}>{errors.country.message}</div>}
      </div>
      <div className={styles.text}>
        <span>Выберите аватар</span>
      </div>
      <div>
        <input
          className={styles.file}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isCompressing}
        />
      </div>
      <div>
        <canvas ref={canvasRef} className={styles.canvas}></canvas>
      </div>
      <div>
        <button className={styles.btn} disabled={isCompressing}>
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}
