import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="MangaReader - Your Ultimate Manga & Novel Platform">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
                {/* Header */}
                <header className="relative z-10 px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <nav className="flex items-center justify-between py-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">📚</span>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">MangaReader</h1>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                                📖 Discover Amazing{' '}
                                <span className="text-indigo-600">Manga</span> &{' '}
                                <span className="text-purple-600">Novels</span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Dive into thousands of captivating stories. Read manga with our advanced reader, 
                                explore rich novels, and join a vibrant community of readers and creators.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href={route('stories.index')}
                                    className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                                >
                                    🚀 Start Reading
                                </Link>
                                <Link
                                    href={route('stories.manga')}
                                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
                                >
                                    Browse Manga →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Everything You Need for the Perfect Reading Experience
                            </h2>
                        </div>
                        <div className="mx-auto mt-16 max-w-5xl">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Manga Reader */}
                                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-3xl">📱</span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Manga Reader</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Vertical scroll, page-by-page, lazy loading, and full-screen reading modes for the ultimate manga experience.
                                    </p>
                                </div>

                                {/* Novel Reader */}
                                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-3xl">📖</span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rich Novel Reader</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Adjustable fonts, themes, bookmarks, and auto-save reading progress for comfortable novel reading.
                                    </p>
                                </div>

                                {/* Community */}
                                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-3xl">💬</span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vibrant Community</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Rate stories, leave comments, follow authors, and discuss your favorite series with fellow readers.
                                    </p>
                                </div>

                                {/* Discovery */}
                                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-3xl">🔍</span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Discovery</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Find new favorites with advanced search, genre filters, trending lists, and personalized recommendations.
                                    </p>
                                </div>

                                {/* Authors */}
                                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-3xl">✍️</span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">For Creators</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Upload your manga chapters with images or write novels with rich text editor. Build your audience.
                                    </p>
                                </div>

                                {/* Free Platform */}
                                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <span className="text-3xl">🆓</span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Completely Free</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Access thousands of manga and novels at no cost. Support creators through ratings and engagement.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mx-auto max-w-2xl text-center pb-24">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white mb-6">
                            Ready to Start Your Reading Journey?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                            >
                                📚 Join Free Today
                            </Link>
                            <Link
                                href={route('stories.novels')}
                                className="rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors"
                            >
                                🔖 Browse Novels
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}