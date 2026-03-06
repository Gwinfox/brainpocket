import { useChangeAvatar } from "../../../bll/Hooks/ProfilePageHooks/useChangeAvatar";
import type { AvatarProps } from "../../../bll/types/profileTypes";
import { Preloader } from "../../Preloader/Preloader";
import styles from "./Avatar.module.css";

export function Avatar({ avatar, userId, loginUserId }: AvatarProps) {
  const { ChangePhoto, isCompressing } = useChangeAvatar(loginUserId);
  if (isCompressing) {
    return <Preloader />;
  }
  return (
    <div className={styles.profile_img}>
      {<img className={styles.avatar} src={avatar ? avatar : "/img/unnamed.png"} alt="avatar" />}
      {loginUserId === userId && (
        <label className={styles.btn_newImg}>
          <input type="file" onChange={ChangePhoto}></input> изменить аватар
        </label>
      )}
    </div>
  );
}
