import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-zinc-900">

      <NavBar />

      {/* IMPORTANT: padding-top for fixed navbar */}
      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default Layout;