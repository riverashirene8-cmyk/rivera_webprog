import { useEffect, useState } from "react";

import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList";
import { fetchArticles } from "../../services/ArticleService";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        setError(err.message || "Unable to load articles.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

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

        {loading ? (
          <p className="text-sm text-zinc-600">Loading articles...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : articles.length ? (
          <ArticleList articles={articles} />
        ) : (
          <p className="text-sm text-zinc-600">No articles available yet.</p>
        )}

      </section>

    </div>
  );
};

export default ArticleListPage;
