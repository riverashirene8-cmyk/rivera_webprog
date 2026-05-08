import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';
import Footer from "../components/Footer";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* HERO SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-900">
          Articles
        </p>

        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Explore Modern React Articles
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          A collection of React learning topics presented in simple cards with images, summaries, and full article views.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>

      </section>

      {/* ARTICLES SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        <div className="mb-6">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-900">
            Featured Articles
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Latest Article Collection
          </h2>

        </div>

        <ArticleList articles={articles} />

      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default ArticleListPage;