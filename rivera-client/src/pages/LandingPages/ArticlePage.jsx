import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../components/Button.jsx";
import { fetchArticleByName } from "../../services/ArticleService";

function ArticlePage() {
  const { name } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchArticleByName(name);
        setArticle(data);
      } catch (err) {
        setArticle(null);
        setError(err.message || "Article not found.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [name]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-zinc-600">Loading article...</p>
      </div>
    );
  }

  if (!article || error) {
    return (
      <div className="p-6 text-center">

        <h1 className="text-2xl font-bold">
          Article Not Found
        </h1>

        {error ? (
          <p className="mt-2 text-sm text-zinc-600">{error}</p>
        ) : null}

        <div className="mt-4">
          <Button to="/articles">
            Back to Articles
          </Button>
        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-6 py-6">

        <Button to="/articles">
          ← Back
        </Button>

        <h1 className="mt-4 text-3xl font-bold text-zinc-900">
          {article.title}
        </h1>

      </section>

      {/* IMAGE */}
      <section className="px-6 py-6">

        <div className="flex justify-center overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">

          <img
            src={article.image}
            alt={article.title}
            className="max-h-[420px] object-contain"
          />

        </div>

      </section>

      {/* CONTENT */}
      <section className="px-6 pb-10">

        <div className="space-y-5">

          {article.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-8 text-zinc-700"
            >
              {paragraph}
            </p>
          ))}

        </div>

      </section>

    </div>
  );
}

export default ArticlePage;
