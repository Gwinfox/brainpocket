import type { UseFormRegister } from "react-hook-form";
import type { RegistrationFormFields } from "./types/registrationTypes";
export const inputField = (
  className: string,
  type: string,
  placeholder: string,
  fieldName: keyof RegistrationFormFields,
  maximum: number,
  register: UseFormRegister<RegistrationFormFields>
) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      {...register(fieldName, {
        required: "поле обязательно",
        maxLength: { value: maximum, message: `Максимальная длина символов: ${maximum}`},
      })}
    />
  );
};
