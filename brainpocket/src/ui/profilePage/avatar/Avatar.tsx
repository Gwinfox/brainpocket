import { useChangeAvatar } from "../../../bll/Hooks/ProfilePageHooks/useChangeAvatar";
import { useGetPhoto } from "../../../bll/Hooks/ProfilePageHooks/useGetPhoto";
import type { AvatarProps } from "../../../bll/types/profileTypes";
import { Preloader } from "../../preloader/Preloader";
import styles from "./Avatar.module.css";

export function Avatar({ avatar, userId, loginUserId }: AvatarProps) {
  const { photo, setPhoto } = useGetPhoto(avatar);
  const { ChangePhoto, isCompressing } = useChangeAvatar(loginUserId, setPhoto);
  if (isCompressing) {
    return <Preloader />;
  }
  return (
    <div className={styles.profile_img}>
      {<img className={styles.avatar} src={photo ? photo : "/img/unnamed.png"} alt="avatar" />}
      {loginUserId === userId && (
        <label className={styles.btn_newImg}>
          <input type="file" onChange={ChangePhoto}></input> изменить аватар
        </label>
      )}
    </div>
  );
}
