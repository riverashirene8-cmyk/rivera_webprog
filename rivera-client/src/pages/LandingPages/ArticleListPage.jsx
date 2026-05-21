import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList";
import articles from "../../assets/article-content.js";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* HEADER */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>

        <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
          React Articles
        </h1>

        <p className="mt-4 max-w-lg text-sm text-zinc-600">
          Browse React tutorials and learning resources.
        </p>

        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>

      </section>

      {/* ARTICLE LIST */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">

        <ArticleList articles={articles} />

      </section>

    </div>
  );
};

export default ArticleListPage;