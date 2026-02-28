export const formatRussianDateMSK = (dateString:string) => {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ]; // Русские месяцы
    const date = new Date(dateString); // Преобразуем строку в объект даты
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const russianDate = `${day} ${month} ${year} года  ${hours}:${minutes}`;
    return russianDate;
  };
  