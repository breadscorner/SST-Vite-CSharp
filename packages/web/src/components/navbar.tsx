import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function NavBar() {
  const { isAuthenticated } = useKindeAuth();
  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav>
      <div className="relative">
        <button onClick={toggleDropDown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-gray-600 cursor-pointer transform duration-300 ${
              dropDown ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ transition: "transform 300ms ease-in-out" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <ul
          className={`absolute right-8 top-0 gap-4 transition-all ${
            dropDown ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{ transitionDuration: "300ms" }}
        >
          <li className="mb-2">
            <Link to="/" onClick={toggleDropDown}>
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/create-post" onClick={toggleDropDown}>
              Create
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={toggleDropDown}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
