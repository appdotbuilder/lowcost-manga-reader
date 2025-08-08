import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
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

interface PaginatedStories {
    data: Story[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    stories: PaginatedStories;
    categories: Category[];
    filters: {
        type?: string;
        status?: string;
        genre?: string;
        search?: string;
        sort?: string;
    };
    [key: string]: unknown;
}

export default function StoriesIndex({ stories, categories, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleSearch = () => {
        router.get(route('stories.index'), {
            ...filters,
            search: searchQuery,
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(route('stories.index'), {
            ...filters,
            [key]: value === filters[key as keyof typeof filters] ? undefined : value,
        });
    };

    const StoryCard = ({ story }: { story: Story }) => (
        <Link
            href={route('stories.show', story.slug)}
            className="group block rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300 transition-all dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
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
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {story.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    by {story.author.profile?.username || story.author.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                    {story.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            story.type === 'manga'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}>
                            {story.type === 'manga' ? '📖 Manga' : '📚 Novel'}
                        </span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            story.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                            {story.status === 'completed' ? '✅ Complete' : '🔄 Ongoing'}
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{story.rating.toFixed(1)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <span>👁️</span>
                        <span>{story.view_count.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <span>❤️</span>
                        <span>{story.favorite_count.toLocaleString()}</span>
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <AppShell>
            <Head title="Stories - MangaReader" />
            
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        📚 Discover Stories
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Browse our collection of manga and novels
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search stories, authors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-400"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-400">🔍</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Search
                        </button>
                    </div>

                    {/* Filter Buttons */}
                    <div className="space-y-4">
                        {/* Type Filter */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Type</h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleFilterChange('type', 'manga')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        filters.type === 'manga'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    📖 Manga
                                </button>
                                <button
                                    onClick={() => handleFilterChange('type', 'novel')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        filters.type === 'novel'
                                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    📚 Novel
                                </button>
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Status</h3>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleFilterChange('status', 'ongoing')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        filters.status === 'ongoing'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    🔄 Ongoing
                                </button>
                                <button
                                    onClick={() => handleFilterChange('status', 'completed')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        filters.status === 'completed'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    ✅ Completed
                                </button>
                            </div>
                        </div>

                        {/* Genre Filter */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Genre</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => handleFilterChange('genre', category.name)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            filters.genre === category.name
                                                ? 'text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                        style={filters.genre === category.name ? { backgroundColor: category.color } : {}}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort Options */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Sort by</h3>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { key: 'latest', label: '🆕 Latest' },
                                    { key: 'popular', label: '❤️ Most Popular' },
                                    { key: 'rating', label: '⭐ Highest Rated' },
                                    { key: 'views', label: '👁️ Most Viewed' },
                                ].map((option) => (
                                    <button
                                        key={option.key}
                                        onClick={() => handleFilterChange('sort', option.key)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                            (filters.sort || 'latest') === option.key
                                                ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            Showing {((stories.current_page - 1) * stories.per_page) + 1} - {Math.min(stories.current_page * stories.per_page, stories.total)} of {stories.total} stories
                        </p>
                    </div>

                    {stories.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {stories.data.map((story) => (
                                <StoryCard key={story.id} story={story} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📭</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No stories found</h3>
                            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {stories.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {Array.from({ length: Math.min(stories.last_page, 10) }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={route('stories.index', { ...filters, page })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    page === stories.current_page
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}