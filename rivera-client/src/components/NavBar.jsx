import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-zinc-100/95 backdrop-blur">
      
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <NavLink to="/" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="logo" className="w-12 sm:w-16 h-auto" />
        </NavLink>

        {/* DESKTOP MENU */}
        <div className="hidden sm:flex items-center gap-6">

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

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 text-zinc-900"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="sm:hidden border-t-2 border-zinc-900 bg-zinc-100 px-4 py-4 space-y-3">
          {/* Mobile Links */}
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => [
                  "block px-4 py-2 rounded-lg text-sm font-semibold transition",
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900",
                ].join(" ")}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Auth Actions */}
          <div className="flex flex-col gap-2 border-t-2 border-zinc-200 pt-3">
            <Link
              to="/auth/signin"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-center text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-200"
            >
              Sign In
            </Link>

            <Link
              to="/auth/signup"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-center rounded-full bg-zinc-900 text-sm font-semibold text-white hover:bg-zinc-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;