import type { Dispatch, SetStateAction } from "react";
import type { UserData } from "./appTypes";

// Пропсы
export type RegistrationProps = {
  setUserData: Dispatch<SetStateAction<UserData | null>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export type RegistrationFormFields = {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  repeatpassword: string;
  city: string;
  country: string;
  file: File | null;
};
