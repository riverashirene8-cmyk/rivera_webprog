import { NavLink, Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-zinc-900 bg-zinc-900 text-zinc-50"
      : "border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur">
      
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-16 h-auto" />
        </NavLink>

        {/* RIGHT SIDE GROUP */}
        <div className="flex items-center gap-6">

          {/* Main Links */}
          <nav className="flex gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/auth/signin"
              className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              Sign In
            </Link>

            <Link
              to="/auth/signup"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
            >
              Sign Up
            </Link>
          </div>

        </div>

      </div>
    </header>
  );
};

export default NavBar;