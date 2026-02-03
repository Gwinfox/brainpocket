import styles from "./Navbar.module.css";
import { navbarLinks } from "../../bll/navbtns";
import { NavLink } from "react-router-dom";

function Navbar() {
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
    </div>
  );
}

export default Navbar;
