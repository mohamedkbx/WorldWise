import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">products</NavLink>
        </li>
      </ul>
    </nav>
  );
}
