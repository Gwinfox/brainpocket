import styles from "./ProfilePage.module.css";
import type { ProfilePageProps } from "../../bll/types/profileTypes";
import { useProfileData } from "../../bll/Hooks/useProfileData";
import { Profile } from "./profile/Profile";
import { Preloader } from "../Preloader/Preloader";
import { Posts } from "./posts/Posts";

function ProfilePage({ userData }: ProfilePageProps) {
  const { profile } = useProfileData(userData);
  if (!userData) {
    return <Preloader />;
  }
  if (!profile) {
    return null
  }
  return (
    <div className={styles.profilePage}>
      <Profile profile={profile} loginUserId={userData.userId} />
      <Posts loginUserId={userData.userId} userId={profile.userId}/>
    </div>
  );
}
export default ProfilePage;
