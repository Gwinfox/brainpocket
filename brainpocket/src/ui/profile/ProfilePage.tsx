import styles from "./Profile.module.css";
import type { ProfilePageProps } from "../../bll/types/profileTypes";
import { useProfileData } from "../../bll/Hooks/useProfileData";


function ProfilePage({ userData }: ProfilePageProps) {
  const profile = useProfileData(userData);
  return <div className={styles.profile}>PROFILE</div>;
}
export default ProfilePage;
