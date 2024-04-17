import { createFileRoute } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { logout, user } = useKindeAuth();

  return (
    <div
      style={{ minHeight: "calc(100vh - 150px)" }}
      className="min-h-screen flex flex-col justify-center items-center"
    >
      <h1 className="text-4xl font-bold mb-4">Hi {user?.given_name}</h1>
      <div className="text-lg font-semibold">{user?.email}</div>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}
