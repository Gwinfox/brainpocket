import styles from "./Navbar.module.css"
import { navbarLinks } from "../../dal/navbtns"
import { NavLink } from "react-router-dom"

function Navbar() {
    return <div className={styles.navbar}>
        {navbarLinks.map(elem => (
            <div key={elem.id}>
                <NavLink to={elem.link}>
                    <span>{elem.name}</span>
                </NavLink>
            </div>
        ))}
    </div>
}

export default Navbar