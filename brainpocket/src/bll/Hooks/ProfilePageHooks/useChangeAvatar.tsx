import imageCompression from "browser-image-compression";
import { useState } from "react";
import { profileAPI } from "../../../dal/api";
import type { ChangeEvent } from "react";

export function useChangeAvatar(loginUserId: number) {
  const [isCompressing, setIsCompressing] = useState(false);
  // Функция для сжатия фото
  const compressImage = async (file: File | undefined) => {
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
      if (file) {
        const compressed = await imageCompression(file, options);
        return compressed;
      }
    } catch (error) {
      return file; // Если не получилось, возвращаем оригинал
    } finally {
      setIsCompressing(false);
    }
  };
  const ChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target && target instanceof HTMLInputElement) {
      const selectedPhoto = target.files?.[0];
      const compressedPhoto = await compressImage(selectedPhoto);
      if (compressedPhoto) {
        profileAPI.updateUserAvatar(compressedPhoto, loginUserId);
      }
    }
  };
  return { ChangePhoto, isCompressing };
}
