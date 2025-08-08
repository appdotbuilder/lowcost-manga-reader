import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Story {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string | null;
    type: 'manga' | 'novel';
    status: string;
    rating: number;
    view_count: number;
    favorite_count: number;
    author: {
        name: string;
        profile?: {
            username: string | null;
            avatar: string | null;
        };
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Props {
    featuredStories: Story[];
    trendingStories: Story[];
    recentlyUpdated: Story[];
    popularManga: Story[];
    popularNovels: Story[];
    categories: Category[];
    [key: string]: unknown;
}

export default function Home({ 
    featuredStories, 
    trendingStories, 
    recentlyUpdated, 
    popularManga, 
    popularNovels, 
    categories 
}: Props) {
    const StoryCard = ({ story, showType = false }: { story: Story; showType?: boolean }) => (
        <Link
            href={route('stories.show', story.slug)}
            className="group block rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300 transition-all dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
        >
            <div className="flex space-x-4">
                <div className="flex-shrink-0">
                    <div className="h-24 w-16 rounded-md bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        {story.cover_image ? (
                            <img
                                src={story.cover_image}
                                alt={story.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-2xl">{story.type === 'manga' ? '📖' : '📚'}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition-colors">
                        {story.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        by {story.author.profile?.username || story.author.name}
                    </p>
                    {showType && (
                        <div className="flex items-center space-x-2 mt-2">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                story.type === 'manga'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            }`}>
                                {story.type === 'manga' ? '📖 Manga' : '📚 Novel'}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                            ⭐ {story.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center">
                            👁️ {story.view_count.toLocaleString()}
                        </span>
                        <span className="flex items-center">
                            ❤️ {story.favorite_count.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );

    const FeaturedCard = ({ story }: { story: Story }) => (
        <Link
            href={route('stories.show', story.slug)}
            className="group block rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 hover:shadow-xl hover:ring-gray-300 transition-all dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
        >
            <div className="aspect-[3/4] rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden mb-4">
                {story.cover_image ? (
                    <img
                        src={story.cover_image}
                        alt={story.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-6xl">{story.type === 'manga' ? '📖' : '📚'}</span>
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition-colors">
                    {story.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    by {story.author.profile?.username || story.author.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                    {story.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        story.type === 'manga'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                        {story.type === 'manga' ? '📖 Manga' : '📚 Novel'}
                    </span>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>⭐ {story.rating.toFixed(1)}</span>
                        <span>❤️ {story.favorite_count}</span>
                    </div>
                </div>
            </div>
        </Link>
    );

    return (
        <AppShell>
            <Head title="Home - MangaReader" />
            
            <div className="space-y-12">
                {/* Hero Section */}
                <div className="relative rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-16 text-center text-white overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-4">
                            📚 Welcome to MangaReader
                        </h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Discover amazing manga and novels from talented creators around the world
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href={route('stories.manga')}
                                className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                            >
                                📖 Browse Manga
                            </Link>
                            <Link
                                href={route('stories.novels')}
                                className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                            >
                                📚 Browse Novels
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                </div>

                {/* Categories */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏷️ Browse by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={route('stories.index', { genre: category.name })}
                                className="flex items-center justify-center rounded-lg p-3 text-sm font-medium hover:opacity-80 transition-opacity"
                                style={{ backgroundColor: category.color + '20', color: category.color }}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Featured Stories */}
                {featuredStories.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⭐ Featured Stories</h2>
                            <Link
                                href={route('stories.index')}
                                className="text-indigo-600 hover:text-indigo-500 font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                            {featuredStories.map((story) => (
                                <FeaturedCard key={story.id} story={story} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Trending and Recently Updated */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Trending */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🔥 Trending Now</h2>
                        <div className="space-y-4">
                            {trendingStories.slice(0, 5).map((story) => (
                                <StoryCard key={story.id} story={story} showType={true} />
                            ))}
                        </div>
                    </div>

                    {/* Recently Updated */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🆕 Recently Updated</h2>
                        <div className="space-y-4">
                            {recentlyUpdated.slice(0, 5).map((story) => (
                                <StoryCard key={story.id} story={story} showType={true} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Popular Manga & Novels */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Popular Manga */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">📖 Popular Manga</h2>
                            <Link
                                href={route('stories.manga')}
                                className="text-indigo-600 hover:text-indigo-500 font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {popularManga.slice(0, 4).map((story) => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    </div>

                    {/* Popular Novels */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">📚 Popular Novels</h2>
                            <Link
                                href={route('stories.novels')}
                                className="text-indigo-600 hover:text-indigo-500 font-medium dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {popularNovels.slice(0, 4).map((story) => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}