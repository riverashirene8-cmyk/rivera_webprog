import Button from '../components/Button';
import img1 from "../assets/article1.png";
import img2 from "../assets/article2.png";
import img3 from "../assets/article3.png";
import img4 from "../assets/article4.png";

const ArticlePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">

            {/* HEADER SECTION */}
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Articles
                </p>

                <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                    Featured Articles
                </h1>

                <p className="mt-4 max-w-lg text-sm leading-7 text-black sm:text-base">
                    A collection of simple and informative articles about web development,
                    UI design, and programming basics, each with a short description and a clear action button.
                </p>

                <div className="mt-6">
                    <Button to="/">Back Home</Button>
                </div>
            </section>

            {/* GRID SECTION */}
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Featured Article
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Article Card Grid
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* CARD 1 */}
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img src={img1} alt="Article 1" className="w-full h-36 object-cover rounded-[1.25rem]" />

                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 1
                        </p>

                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Getting Started with Web Development
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            A beginner-friendly overview of web development, including tools, languages,
                            and steps to start building your first website.
                        </p>

                        <Button className="mt-4">Read More</Button>
                    </article>

                    {/* CARD 2 */}
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img src={img2} alt="Article 2" className="w-full h-36 object-cover rounded-[1.25rem]" />

                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 2
                        </p>

                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Basic Principles of Clean UI Design
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Learn how to design clean user interfaces using spacing, typography,
                            layout balance, and simple design principles.
                        </p>

                        <Button className="mt-4">Read More</Button>
                    </article>

                    {/* CARD 3 */}
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img src={img3} alt="Article 3" className="w-full h-36 object-cover rounded-[1.25rem]" />

                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 3
                        </p>

                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Introduction to HTML and CSS Layouts
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Learn how HTML structures web pages and how CSS styles layouts using grids,
                            sections, and responsive design.
                        </p>

                        <Button className="mt-4">Read More</Button>
                    </article>

                    {/* CARD 4 */}
                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img src={img4} alt="Article 4" className="w-full h-36 object-cover rounded-[1.25rem]" />

                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Article 4
                        </p>

                        <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                            Simple Tips for Building User-Friendly Apps
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            Improve usability with clear navigation, simple layouts, and better user experience design.
                        </p>

                        <Button className="mt-4">Read More</Button>
                    </article>

                </div>
            </section>
        </div>
    );
};

export default ArticlePage;