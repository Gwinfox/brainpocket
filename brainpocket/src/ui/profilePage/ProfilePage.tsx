import styles from "./ProfilePage.module.css";
import type { ProfilePageProps } from "../../bll/types/profileTypes";
import { useProfileData } from "../../bll/Hooks/ProfilePageHooks/useProfileData";
import { Profile } from "./profile/Profile";
import { Posts } from "./posts/Posts";
import { Preloader } from "../preloader/Preloader";

function ProfilePage({ userData }: ProfilePageProps) {
  const { profile, changePhoto } = useProfileData(userData);

  if (!profile) {
    return <Preloader />;
  }
  return (
    <div className={styles.profilePage}>
      <Profile profile={profile} loginUserId={userData.userId} changePhoto={changePhoto} />
      <Posts loginUserId={userData.userId} userId={profile.userId} />
    </div>
  );
}
export default ProfilePage;
