import NavHomeIcon from "./icons/nav-home-icon";
import NavAPIcon from "./icons/nav-api-icon";
import NavProIcon from "./icons/nav-pro-icon";

export default function NavBar() {
  
  return (
      <nav>
        <ul>
          <li>
            <a href="/">
              <NavHomeIcon />
            </a>
          </li>
          <li>
            <a href="/create-post">
              <NavAPIcon />
            </a>
          </li>
          <li>
            <a href="/profile">
              <NavProIcon />
            </a>
          </li>
        </ul>
      </nav>
  );
}
