import { useRef, useState } from "react";
import styles from "./Registration.module.css";
import imageCompression from "browser-image-compression";
import { useForm } from "react-hook-form";
import type { RegistrationFormFields } from "../../bll/types/registrationTypes";
import { authAPI } from "../../dal/api";
import { inputField } from "../../bll/inputRegistrationField";

export function Registration() {
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  // Ссылка на canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Функция для сжатия фото
  const compressImage = async (file: File) => {
    // Настройки сжатия
    const options = {
      maxSizeMB: 1, // Максимальный размер в Mb
      maxWidthOrHeight: 800, // Максимальные высота или ширина
      useWebWorker: true, // Использовать фоновый процесс для скорости
      fileType: "image/jpeg", // Формат на выходе
    };
    try {
      setIsCompressing(true);
      // Сжимаем изображение
      return await imageCompression(file, options);
    } catch (error) {
      return file; // Если не получилось, возвращаем оригинал
    } finally {
      setIsCompressing(false);
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]; // Получаем файл
    if (file) {
      const compressed = await compressImage(file); // Сжимаем файл перед использованием
      setCompressedFile(compressed);
      // Показываем в canvas
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          drawImageToCanvas(img);
        };
        if (e.target && typeof e.target.result === "string") {
          img.src = e.target.result;
        }
      };
      reader.readAsDataURL(compressed);
    }
  };
  const drawImageToCanvas = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  const onSubmit = (data: RegistrationFormFields) => {
    if (data.password !== data.repeatpassword) {
      setError("root", {
        type: "manual",
        message: "пароли не совпадают",
      });
      return;
    }
    authAPI.registration({ ...data, file: compressedFile }); // Используем сжатый файл вместо оригинального
  };
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationFormFields>();
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
          disabled={isCompressing} // Блокируем при сжатии
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
