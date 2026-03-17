import type { ProfileProps } from "../../../bll/types/profileTypes";
import { Avatar } from "../avatar/Avatar";
import { Contacts } from "../contacts/Contacts";
import { Status } from "../status/Status";
import { Username } from "../username/Username";
import styles from "./Profile.module.css";

export function Profile({ profile, loginUserId, changePhoto }: ProfileProps) {
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <img
          src={profile.photos.profileHeader ? profile.photos.profileHeader : "/img/defaultHeader.jpg"}
          alt="profile_header"
        />
      </div>
      <Avatar
        avatar={profile.photos.avatar}
        userId={profile.userId}
        loginUserId={loginUserId}
        changePhoto={changePhoto}
      />
      <Username name={profile.fullName} />
      <Status status={profile.aboutMe || "Ваш статус"} userId={profile.userId} loginUserId={loginUserId} />
      <Contacts userId={profile.userId} loginUserId={loginUserId} contacts={profile.contacts || null} />
    </div>
  );
}
