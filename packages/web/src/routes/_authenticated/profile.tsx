import { createFileRoute } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import NavBar from "../../components/navbar";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { logout, user } = useKindeAuth();

  return (
    <div className="p-5 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">
            {user?.given_name}&apos;s Profile
          </h1>
        </div>
        <div className="flex items-center">
          <NavBar />
        </div>
      </div>

      <div className="mt-8 py-4 bg-white rounded-lg border-gray-200 shadow-lg w-2/5 mx-auto">
        <div className="flex flex-col items-center text-lg mt-8">
          <div className="font-semibold">
            {user?.given_name} {user?.family_name}
          </div>
          <div>{user?.email}</div>
        </div>
        <div className="flex justify-center my-8">
          <button
            className="px-4 py-2 w-[50%] text-white font-semibold rounded-md bg-[#ff96ed] hover:bg-[#db7ac9] hover:scale-105 shadow-md transition duration-300 ease-in-out"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
