import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface User {
    id: number;
    name: string;
    profile?: {
        username: string | null;
        avatar: string | null;
        bio: string | null;
    };
}

interface Chapter {
    id: number;
    title: string;
    slug: string;
    chapter_number: number;
    is_premium: boolean;
    published_at: string;
}

interface Rating {
    id: number;
    rating: number;
    review: string | null;
    created_at: string;
    user: User;
}

interface Story {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string | null;
    type: 'manga' | 'novel';
    status: string;
    rating: number;
    rating_count: number;
    view_count: number;
    favorite_count: number;
    genres: string[];
    tags: string[];
    author: User;
    chapters: Chapter[];
    ratings: Rating[];
}

interface Props {
    story: Story;
    similarStories: Story[];
    userFavorited: boolean;
    userRating: Rating | null;
    [key: string]: unknown;
}

export default function StoryShow({ story, similarStories, userFavorited, userRating }: Props) {
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [userRatingValue, setUserRatingValue] = useState(userRating?.rating || 0);
    const [userReview, setUserReview] = useState(userRating?.review || '');

    const handleFavorite = () => {
        if (userFavorited) {
            router.delete(route('favorites.destroy'), {
                data: { story_id: story.id },
                preserveScroll: true,
            });
        } else {
            router.post(route('favorites.store'), {
                story_id: story.id,
            }, {
                preserveScroll: true,
            });
        }
    };

    const handleRating = () => {
        router.post(route('ratings.store'), {
            story_id: story.id,
            rating: userRatingValue,
            review: userReview,
        }, {
            onSuccess: () => {
                setShowRatingForm(false);
            },
        });
    };

    const StoryCard = ({ story: relatedStory }: { story: Story }) => (
        <Link
            href={route('stories.show', relatedStory.slug)}
            className="group block rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-gray-300 transition-all dark:bg-gray-800 dark:ring-gray-700 dark:hover:ring-gray-600"
        >
            <div className="aspect-[3/4] rounded-md bg-gray-200 dark:bg-gray-700 overflow-hidden mb-3">
                {relatedStory.cover_image ? (
                    <img
                        src={relatedStory.cover_image}
                        alt={relatedStory.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-4xl">{relatedStory.type === 'manga' ? '📖' : '📚'}</span>
                    </div>
                )}
            </div>
            <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 line-clamp-2 text-sm">
                {relatedStory.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ⭐ {relatedStory.rating.toFixed(1)} • ❤️ {relatedStory.favorite_count}
            </p>
        </Link>
    );

    return (
        <AppShell>
            <Head title={`${story.title} - MangaReader`} />
            
            <div className="space-y-8">
                {/* Story Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cover Image */}
                        <div className="flex-shrink-0">
                            <div className="w-48 h-64 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden mx-auto lg:mx-0">
                                {story.cover_image ? (
                                    <img
                                        src={story.cover_image}
                                        alt={story.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <span className="text-8xl">{story.type === 'manga' ? '📖' : '📚'}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Story Info */}
                        <div className="flex-1">
                            <div className="mb-4">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {story.title}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    by {story.author.profile?.username || story.author.name}
                                </p>
                            </div>

                            {/* Tags and Type */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                    story.type === 'manga'
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                }`}>
                                    {story.type === 'manga' ? '📖 Manga' : '📚 Novel'}
                                </span>
                                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                                    story.status === 'completed' 
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : story.status === 'ongoing'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                }`}>
                                    {story.status === 'completed' ? '✅ Complete' : 
                                     story.status === 'ongoing' ? '🔄 Ongoing' : '⏸️ Hiatus'}
                                </span>
                                {story.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {story.rating.toFixed(1)}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        ⭐ Rating ({story.rating_count})
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {story.view_count.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        👁️ Views
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {story.favorite_count.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        ❤️ Favorites
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {story.chapters.length}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        📄 Chapters
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {story.chapters.length > 0 && (
                                    <Link
                                        href={route('chapters.show', [story.slug, story.chapters[0].slug])}
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                                    >
                                        <span>🚀</span>
                                        <span>Start Reading</span>
                                    </Link>
                                )}
                                
                                <button
                                    onClick={handleFavorite}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                                        userFavorited
                                            ? 'bg-red-600 text-white hover:bg-red-700'
                                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <span>{userFavorited ? '💔' : '❤️'}</span>
                                    <span>{userFavorited ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                                </button>

                                <button
                                    onClick={() => setShowRatingForm(!showRatingForm)}
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center space-x-2"
                                >
                                    <span>⭐</span>
                                    <span>{userRating ? 'Update Rating' : 'Rate Story'}</span>
                                </button>
                            </div>

                            {/* Rating Form */}
                            {showRatingForm && (
                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <h3 className="text-lg font-semibold mb-3">Rate this story</h3>
                                    <div className="flex items-center space-x-2 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setUserRatingValue(star)}
                                                className={`text-2xl ${
                                                    star <= userRatingValue ? 'text-yellow-500' : 'text-gray-300'
                                                }`}
                                            >
                                                ⭐
                                            </button>
                                        ))}
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            {userRatingValue}/5 stars
                                        </span>
                                    </div>
                                    <textarea
                                        value={userReview}
                                        onChange={(e) => setUserReview(e.target.value)}
                                        placeholder="Write a review (optional)..."
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                                    />
                                    <div className="flex justify-end space-x-2 mt-3">
                                        <button
                                            onClick={() => setShowRatingForm(false)}
                                            className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleRating}
                                            disabled={userRatingValue === 0}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Submit Rating
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📖 Description</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {story.description}
                        </p>
                    </div>

                    {/* Tags */}
                    {story.tags && story.tags.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🏷️ Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {story.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Chapters List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">📚 Chapters</h2>
                    
                    {story.chapters.length > 0 ? (
                        <div className="space-y-2">
                            {story.chapters.map((chapter) => (
                                <Link
                                    key={chapter.id}
                                    href={route('chapters.show', [story.slug, chapter.slug])}
                                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all dark:border-gray-700 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Ch. {chapter.chapter_number}
                                            </span>
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {chapter.title}
                                            </h3>
                                            {chapter.is_premium && (
                                                <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                    💎 Premium
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Published {new Date(chapter.published_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-gray-400 dark:text-gray-500">→</span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📭</span>
                            <p className="text-gray-500 dark:text-gray-400">No chapters available yet</p>
                        </div>
                    )}
                </div>

                {/* Reviews */}
                {story.ratings.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">💬 Recent Reviews</h2>
                        
                        <div className="space-y-6">
                            {story.ratings.slice(0, 5).map((rating) => (
                                <div key={rating.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                {rating.user.profile?.avatar ? (
                                                    <img
                                                        src={rating.user.profile.avatar}
                                                        alt={rating.user.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-lg">👤</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {rating.user.profile?.username || rating.user.name}
                                                </h4>
                                                <div className="flex items-center">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-sm ${
                                                                i < rating.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
                                                            }`}
                                                        >
                                                            ⭐
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(rating.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {rating.review && (
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                    {rating.review}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Stories */}
                {similarStories.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">🔍 You Might Also Like</h2>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {similarStories.map((relatedStory) => (
                                <StoryCard key={relatedStory.id} story={relatedStory} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}