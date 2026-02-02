import { Navigate } from "react-router-dom";
import styles from "./Profile.module.css";

type Props = {
  isAuth: boolean;
};

function Profile({ isAuth }:Props) {
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return <div className={styles.profile}>PROFILE</div>;
}
export default Profile;
