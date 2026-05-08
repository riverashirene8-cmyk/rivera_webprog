import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6">

      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-50 p-10 text-center shadow-lg">

        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-zinc-200"></div>
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-zinc-300"></div>

        <p className="relative text-[12px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Error 404
        </p>

        <h1 className="relative mt-4 text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl">
          Page Not Found
        </h1>

        <p className="relative mx-auto mt-5 max-w-lg text-base leading-7 text-zinc-600">
          The page you are looking for may have been removed, renamed,
          or is temporarily unavailable.
        </p>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/"
            className="rounded-full border-2 border-zinc-900 bg-zinc-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-50 transition hover:bg-zinc-700"
          >
            Back Home
          </Link>

          <Link
            to="/articles"
            className="rounded-full border-2 border-zinc-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-900 transition hover:bg-zinc-200"
          >
            View Articles
          </Link>

        </div>

      </div>

    </div>
  );
};

export default NotFoundPage;