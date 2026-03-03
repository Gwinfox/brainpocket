import styles from "./Navbar.module.css";
import { navbarLinks } from "../../bll/navbtns";
import { NavLink } from "react-router-dom";
import { useGetRandomFriends } from "../../bll/Hooks/NavbarHooks/useGetRandomFriends";
import type { NavbarProps } from "../../bll/types/navbarTypes";
import { Friend } from "./friend/Friend";

function Navbar({ userData }: NavbarProps) {
  const { randomFriends } = useGetRandomFriends(userData.friends);
  return (
    <div className={styles.navbar}>
      {navbarLinks.map((elem) => (
        <div className={styles.navRow} key={elem.id}>
          <NavLink to={elem.link} className={(navData) => (navData.isActive ? styles.active : styles.pending)}>
            <img className={styles.icon} src={elem.icon} alt="icon" />
            <span className={styles.navRowText}>{elem.name}</span>
          </NavLink>
        </div>
      ))}
      <div className={styles.friendsBar}>
        <NavLink to="/friends" className={(nav) => (nav.isActive ? styles.active : styles.pending)}>
          Друзья
        </NavLink>
      </div>
      {
        <div className={styles.friends_row}>
          {randomFriends.map((f, i) => (
            <Friend key={i} friend={f} />
          ))}
        </div>
      }
    </div>
  );
}

export default Navbar;
