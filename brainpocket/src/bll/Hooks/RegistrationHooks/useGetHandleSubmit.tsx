import type { UseFormSetError } from "react-hook-form";
import { authAPI } from "../../../dal/api";
import type { RegistrationFormFields } from "../../types/registrationTypes";
import { useGetError } from "../useGetError";

export function useGetHandleSubmit(compressedFile: File | null, setError: UseFormSetError<RegistrationFormFields>) {
  const { setGlobalError } = useGetError();
  const onSubmit = (data: RegistrationFormFields) => {
    if (data.password !== data.repeatpassword) {
      setError("root", {
        type: "manual",
        message: "пароли не совпадают",
      });
      return;
    }
    authAPI.registration({ ...data, file: compressedFile }).catch((err) => setGlobalError(err));
  };
  return { onSubmit };
}
