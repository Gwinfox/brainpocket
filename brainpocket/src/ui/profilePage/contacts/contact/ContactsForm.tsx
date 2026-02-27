import { useForm } from "react-hook-form";
import styles from './Contact.module.css';
import type { Contacts, ContactsFormProps } from "../../../../bll/types/profileTypes";
import { useSetContacts } from "../../../../bll/Hooks/ProfilePageHooks/useSetContacts";

export function ContactsForm({ contacts, loginUserId, closeSettings }: ContactsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contacts>({ defaultValues: contacts });
  const {onSubmit} = useSetContacts(loginUserId, closeSettings)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(contacts).map(([key]) => {
        const fieldName = key as keyof typeof contacts;
        return (
          <div key={fieldName} className={styles.active}>
            <input
              className={styles.contactField}
              type="text"
              placeholder={key}
              {...register(fieldName, { maxLength: { value: 30, message: "Длина не должна превышать 40 символов" } })}
            />
            {errors[fieldName] && <div className={styles.error}>{errors[fieldName].message}</div>}
          </div>
        );
      })}
      <button className={styles.btn_contacts}> подтвердить</button>
    </form>
  );
}
