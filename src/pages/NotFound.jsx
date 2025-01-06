import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function NotFound() {
  return (
    <div>
      <PageNav />
      <h2>Page not found</h2>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
}
