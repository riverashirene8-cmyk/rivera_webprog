import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-zinc-100 px-4 py-10 text-zinc-900">

      <main className="w-full max-w-2xl">

        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-10 shadow-sm">

          <Outlet />

        </div>

      </main>

    </section>
  );
};

export default AuthLayout;