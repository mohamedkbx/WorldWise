import { NavLink } from "react-router-dom";

export default function PageNav() {
  return (
    <nav>
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
