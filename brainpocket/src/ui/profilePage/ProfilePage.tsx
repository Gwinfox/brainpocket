import styles from "./ProfilePage.module.css";
import type { ProfilePageProps } from "../../bll/types/profileTypes";
import { useProfileData } from "../../bll/Hooks/useProfileData";
import { Profile } from "./profile/Profile";

function ProfilePage({ userData }: ProfilePageProps) {
  const { profile } = useProfileData(userData);
  return (
    <div className={styles.profilePage}>
      <Profile profile={profile} />
    </div>
  );
}
export default ProfilePage;
