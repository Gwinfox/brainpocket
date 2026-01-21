import styles from "./Header.module.css"

function Header() {
    return <div className={styles.header}>
        <div className={styles.logo}>
            <img src="/logo.jpg" alt="logo" />
        </div>
        <div className={styles.text}>HEADER</div>
    </div>
}

export default Header