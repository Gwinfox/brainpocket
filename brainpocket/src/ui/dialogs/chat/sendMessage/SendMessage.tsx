import { useForm } from "react-hook-form";
import styles from "./SendMessage.module.css";
import type { addMessageForm, SendMessageProps } from "../../../../bll/types/dialogsTypes";

export function SendMessage({ addMessage}: SendMessageProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addMessageForm>();
  const onSubmit = (data:addMessageForm) => {
    console.log(data)
    addMessage(data.newMessage);
    reset();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {errors.newMessage && <span className={styles.error}>{errors.newMessage.message}</span>}
      <textarea
        placeholder="Введите сообщение..."
        className={styles.textarea + " " + (errors.newMessage ? styles.errArea : null)}
        {...register("newMessage", {
          required: "Нельзя отправить пустое сообщение",
          maxLength: { value: 200, message: "Сообщение не должно превышать длину в 200 символов" },
        })}
      ></textarea>
      <button className={styles.btnSend}>ОТПРАВИТЬ</button>
    </form>
  );
}

export default SendMessage;
