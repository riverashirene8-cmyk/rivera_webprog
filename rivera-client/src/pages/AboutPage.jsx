import Button from '../components/Button';
import profileAbout from "../assets/profile_about.jpg";
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import about3 from "../assets/about3.png";
import about4 from "../assets/about4.png";

const AboutPage = () => {
    return (
        <div className="flex w-full flex-col gap-6">

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

                    <div>
                        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                            About Me
                        </h1>

                       <p className="mt-4 max-w-lg text-sm leading-7 text-black sm:text-base">
                            I am a 21-year-old third-year BSIT student majoring in Mobile and Web Applications
                            at National University Manila. I currently live in Sta. Mesa, Manila.
                            I am interested in learning how to build simple and useful web and mobile applications.
                            I am still improving my skills in programming and exploring different tools and technologies.
                            I am willing to learn, practice, and gain more experience to become a better developer in the future.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button to="/" variant="primary">
                                Back to Home
                            </Button>
                            <Button to="/articles">
                                Open Articles
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <img
                            src={profileAbout}
                            alt="Profile Picture"
                            className="h-72 w-72 rounded-full border-4 border-black object-cover shadow-md"
                        />
                    </div>

                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Profile Overview
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                        Key Highlights
                    </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">03</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Years Learning IT
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">06</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Academic Projects
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">04</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            Core Skills
                        </p>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-2xl font-bold text-zinc-900">02</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                            UI / UX Tools
                        </p>
                    </div>

                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Section Flow
                        </p>

                        <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
                            My Learning Journey
                        </h2>

                        <div className="mt-6 space-y-4">

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Education Background
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Currently studying BSIT major in Mobile and Web Applications at
                                    National University Manila, developing strong foundations in software and web development.
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Skills & Technologies
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Experienced in MERN Stack, Flutter, HTML/CSS, Java, and responsive UI design,
                                    with growing knowledge in front-end and back-end development.
                                </p>
                            </article>

                            <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    Career Goals
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">
                                    Aspiring to become a full-stack developer focused on creating
                                    practical, user-friendly, and meaningful digital solutions.
                                </p>
                            </article>

                        </div>
                    </div>

                    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                            Visual Grid
                        </p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                            <img src={about1} alt="Project 1" className="h-full w-full rounded-[1.25rem] object-cover" />
                            <img src={about2} alt="Project 2" className="h-full w-full rounded-[1.25rem] object-cover" />
                            <img src={about3} alt="Project 3" className="h-full w-full rounded-[1.25rem] object-cover" />
                            <img src={about4} alt="Project 4" className="h-full w-full rounded-[1.25rem] object-cover" />
                        </div>

                        <Button className="mt-5">
                            View Section
                        </Button>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default AboutPage;

