import { useState } from "react";
import imageCompression from "browser-image-compression";

export function useGetCompressedPhoto(drawImageToCanvas: (img: HTMLImageElement) => void) {
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
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
  return { compressedFile, isCompressing, handleFileChange };
}
