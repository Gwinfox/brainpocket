import { useChangeAvatar } from "../../../bll/Hooks/ProfilePageHooks/useChangeAvatar";
import type { AvatarProps } from "../../../bll/types/profileTypes";
import { Preloader } from "../../preloader/Preloader";
import styles from "./Avatar.module.css";

export function Avatar({ avatar, userId, loginUserId, changePhoto }: AvatarProps) {
  const { ChangePhoto, isCompressing } = useChangeAvatar(loginUserId, changePhoto);
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
