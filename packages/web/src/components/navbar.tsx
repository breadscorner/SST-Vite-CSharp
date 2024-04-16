import NavHomeIcon from "./icons/nav-home-icon";
import NavAPIcon from "./icons/nav-api-icon";
import NavProIcon from "./icons/nav-pro-icon";
import { Link } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function NavBar() {
  const { isAuthenticated } = useKindeAuth();

  if (!isAuthenticated) {
    return;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <NavHomeIcon />
          </Link>
        </li>
        <li>
          <Link to="/create-post">
            <NavAPIcon />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <NavProIcon />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
