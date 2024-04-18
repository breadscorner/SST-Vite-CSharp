import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export function Login() {
  const { login, register } = useKindeAuth();
  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          <div className="mb-12 p-4 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white rounded-lg border shadow-lg">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold">Welcome to Post City</h1>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  onClick={() => login()}
                  className="border rounded-lg inline-block w-full bg-primary px-10 py-3 text-sm font-medium uppercase leading-normal text-gray-500 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong hover:shadow-md hover:bg-pink-50 hover:scale-105"
                >
                  Login
                </button>
                <button
                  onClick={() => register()}
                  className="border rounded-lg inline-block w-full bg-primary px-10 py-3 text-sm font-medium uppercase leading-normal text-gray-500 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong hover:shadow-md hover:bg-pink-50 hover:scale-105"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Component = () => {
  const { isAuthenticated } = useKindeAuth();
  if (!isAuthenticated) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  component: Component,
});
