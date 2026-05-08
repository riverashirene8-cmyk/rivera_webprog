import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';

function ArticlePage() {
  const { name } = useParams();

  const article = articles.find(article => article.name === name);

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-50 p-10 text-center shadow-lg">

          <h1 className="text-4xl font-bold text-zinc-900">
            Article Not Found
          </h1>

          <p className="mt-4 text-zinc-600">
            The article you are looking for does not exist.
          </p>

          <Button to="/articles" className="mt-6">
            Back to Articles
          </Button>

        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">

      {/* HERO SECTION */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl">

          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            React Article
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
            {article.title}
          </h1>

        </div>

      </section>

      {/* ARTICLE CONTENT */}
      <section className="bg-zinc-100 px-4 py-8 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-50 shadow-lg">

          {/* IMAGE */}
          <div className="flex h-[420px] w-full items-center justify-center overflow-hidden border-b-2 border-zinc-900 bg-zinc-200 p-4">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="space-y-6 p-8">

            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-8 text-zinc-700"
              >
                {paragraph}
              </p>
            ))}

            {/* ONLY ONE BUTTON */}
            <div className="pt-6">
              <Button to="/articles">
                Back to Articles
              </Button>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default ArticlePage;