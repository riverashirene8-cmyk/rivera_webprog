const Footer = () => {
  return (
    <footer className="mt-12 border-t-2 border-zinc-900 bg-zinc-50 px-6 py-10">

      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col items-center text-center gap-2">

          <h3 className="text-xl font-bold text-zinc-900">
            Shirene Rivera
          </h3>

          <p className="text-sm text-zinc-600 max-w-md">
            React Article Website — a simple project built using React Router, components, and modern UI layout.
          </p>

        </div>

        <div className="my-6 border-t border-zinc-300"></div>

        {/* Centered footer text */}
        <div className="flex items-center justify-center text-center">
          <p className="text-xs text-zinc-500">
            © 2026 All Rights Reserved
          </p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;