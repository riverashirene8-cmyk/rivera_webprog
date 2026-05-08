import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      {articles.map((article, index) => (
        <article
          key={article.name}
          className="overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-50 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >

          {/* ARTICLE IMAGE */}
          <div className="flex h-56 w-full items-center justify-center overflow-hidden border-b-2 border-zinc-900 bg-zinc-200 p-3">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="p-5">

            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Article {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-3 text-xl font-bold leading-snug text-zinc-900">
              {article.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              {article.content[0].substring(0, 140)}...
            </p>

            <div className="mt-5">
              <Link to={`/articles/${article.name}`}>
                <Button>
                  Read More
                </Button>
              </Link>
            </div>

          </div>

        </article>
      ))}

    </div>
  );
};

export default ArticleList;