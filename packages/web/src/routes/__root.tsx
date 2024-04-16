import NavBar from "../components/navbar";
import { createRootRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div>
      <div className="my-4">
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
