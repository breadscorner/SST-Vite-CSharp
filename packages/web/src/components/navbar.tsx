import NavHomeIcon from "./icons/nav-home-icon";
import NavAPIcon from "./icons/nav-api-icon";
import NavProIcon from "./icons/nav-pro-icon";

export default function NavBar() {
  
  return (
    <div>
      <nav className="mb-4">
        <ul className="flex">
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
    </div>
  );
}
