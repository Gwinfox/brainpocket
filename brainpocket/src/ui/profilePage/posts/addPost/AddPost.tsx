import { useForm } from "react-hook-form";
import styles from "./AddPost.module.css";
import type { AddPostProps, PostForm } from "../../../../bll/types/profileTypes";

export function AddPost({ addPost, loginUserId }: AddPostProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostForm>();
  const onSubmit = (data:PostForm) => {
    addPost(loginUserId, data.newPost);
    reset();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {errors.newPost && <span className={styles.error}>{errors.newPost.message}</span>}
      <textarea
        className={styles.textArea + " " + (errors.newPost ? styles.errArea : null)}
        placeholder={"Напишите, что у вас нового..."}
        {...register("newPost", {
          required: "Вы забыли написать сам пост",
          maxLength: { value: 400, message: "Длина сообщения не должна превышать 400 символов" },
        })}
      ></textarea>
      <button className={styles.btn_addPost}>добавить пост</button>
    </form>
  );
}
