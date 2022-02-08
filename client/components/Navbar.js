import { Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
const NavbarMenu = () => {
  return <div className={styles.navbar}>
    <div className={styles.navbar_brand}>Profile</div>
    <div className={styles.navbar_link}>
        <Link href="/">
            <a className={styles.navbar_link_item}>Home</a>
        </Link>
        <Link href="/projects">
            <a className={styles.navbar_link_item}>Projects</a>
        </Link>
        <Link href="/contact">
            <a className={styles.navbar_link_item}>Contact</a>
        </Link>
    </div>
  </div>;
};
export default NavbarMenu;
