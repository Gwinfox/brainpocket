import type { ProfileProps } from "../../../bll/types/profileTypes";
import { Avatar } from "../avatar/Avatar";
import styles from "./Profile.module.css";

export function Profile({ profile, loginUserId }: ProfileProps) {
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <img
          src={profile?.photos.profileHeader ? profile.photos.profileHeader : "/img/defaultHeader.jpg"}
          alt="profile_header"
        />
      </div>
      <Avatar avatar={profile?.photos.avatar} userId={profile?.userId} loginUserId={loginUserId}/>
    </div>
  );
}
