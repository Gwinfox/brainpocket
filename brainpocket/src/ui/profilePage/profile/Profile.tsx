import type { ProfileProps } from "../../../bll/types/profileTypes";
import styles from "./Profile.module.css";

export function Profile({ profile }: ProfileProps) {
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <img
          src={profile?.photos.profileHeader ? profile.photos.profileHeader : "/img/defaultHeader.jpg"}
          alt="profile_header"
        />
      </div>
    </div>
  );
}
