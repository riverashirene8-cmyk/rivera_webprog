import Button from '../components/Button';
import homepage from "../assets/homepage.jpg";
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

                    <div>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            Shirene Rivera
                        </h1>

                        <p className="mt-4 max-w-lg text-sm leading-7 text-black sm:text-base">
                            I am an IT student who is interested in web and mobile development.
                            I enjoy learning new technologies and improving my skills to create simple and useful applications.
                        </p>

                        <div className="mt-6">
                            <Button to="/about" variant="primary">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <img
                            src={homepage}
                            alt="Profile Picture"
                            className="w-72 h-72 object-cover rounded-full border-4 border-black shadow-md"
                        />
                    </div>

                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Tech Stack
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">MERN</p>
                        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            MongoDB, Express.js, React, Node.js
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">FLUTTER</p>
                        <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Dart
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">HTML / CSS</p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">JAVA</p>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        2024 - 2026
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Projects
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img
                            src={home1}
                            className="w-full h-[160px] object-cover rounded-[1.25rem]"
                            alt="Project 1"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                            Portfolio Website Design
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                           A personal portfolio website showcasing projects, skills, and basic information.
                           Built using HTML, CSS, and React, with a focus on clean UI design, responsiveness, and user-friendly navigation.
                        </p>
                        <Button className="mt-4" variant="primary">
                            View More
                        </Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img
                            src={home2}
                            className="w-full h-[160px] object-cover rounded-[1.25rem]"
                            alt="Project 2"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                            Login UI Design
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                           A modern login interface designed with a clean and user-friendly layout.
                           Developed using Flutter (Dart), demonstrating skills in mobile UI design and component structuring.
                        </p>
                        <Button className="mt-4" variant="primary">
                            View More
                        </Button>
                    </article>

                    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
                        <img
                            src={home3}
                            className="w-full h-[160px] object-cover rounded-[1.25rem]"
                            alt="Project 3"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                            Dashboard Layout System
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-zinc-600">
                            A responsive dashboard layout featuring organized sections such as charts, statistics, and navigation panels.
                            Built using React, HTML, and CSS, focusing on reusable components and effective UI structuring.
                        </p>
                        <Button className="mt-4" variant="primary">
                            View More
                        </Button>
                    </article>

                </div>
            </section>

        </div>
    );
};

export default HomePage;
