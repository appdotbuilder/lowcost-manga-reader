import React, { useState, useEffect, useCallback } from 'react';
import { Head, Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    profile?: {
        username: string | null;
        avatar: string | null;
    };
}

interface Story {
    id: number;
    title: string;
    slug: string;
    author: User;
}

interface Chapter {
    id: number;
    title: string;
    slug: string;
    chapter_number: number;
    images: string[];
    page_count: number;
    story: Story;
}

interface Props {
    story: Story;
    chapter: Chapter;
    previousChapter: Chapter | null;
    nextChapter: Chapter | null;
    [key: string]: unknown;
}

export default function MangaReader({ story, chapter, previousChapter, nextChapter }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [readingMode, setReadingMode] = useState<'scroll' | 'page'>('scroll');

    // Auto-hide controls in fullscreen
    useEffect(() => {
        if (isFullscreen) {
            const timer = setTimeout(() => setShowControls(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isFullscreen, showControls]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    if (readingMode === 'page' && currentPage > 0) {
                        setCurrentPage(prev => prev - 1);
                    }
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    if (readingMode === 'page' && currentPage < chapter.images.length - 1) {
                        setCurrentPage(prev => prev + 1);
                    }
                    break;
                case 'f':
                case 'F11':
                    event.preventDefault();
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (isFullscreen) {
                        exitFullscreen();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, chapter.images.length, readingMode, isFullscreen]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setIsFullscreen(false);
    };

    const handleImageClick = useCallback((event: React.MouseEvent<HTMLImageElement>) => {
        if (readingMode === 'page') {
            const rect = event.currentTarget.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const imageWidth = rect.width;
            
            // Click on left half = previous page, right half = next page
            if (clickX < imageWidth / 2) {
                if (currentPage > 0) {
                    setCurrentPage(prev => prev - 1);
                }
            } else {
                if (currentPage < chapter.images.length - 1) {
                    setCurrentPage(prev => prev + 1);
                }
            }
        }
    }, [readingMode, currentPage, chapter.images.length]);

    const saveReadingProgress = () => {
        // Save progress to localStorage for cost-effective tracking
        const progress = {
            storyId: story.id,
            chapterId: chapter.id,
            page: currentPage,
            timestamp: Date.now(),
        };
        localStorage.setItem(`reading-progress-${story.id}`, JSON.stringify(progress));
    };

    useEffect(() => {
        saveReadingProgress();
    }, [currentPage, story.id, chapter.id]);

    // Load saved reading progress
    useEffect(() => {
        const saved = localStorage.getItem(`reading-progress-${story.id}`);
        if (saved) {
            const progress = JSON.parse(saved);
            if (progress.chapterId === chapter.id && readingMode === 'page') {
                setCurrentPage(progress.page || 0);
            }
        }
    }, [story.id, chapter.id, readingMode]);

    return (
        <div className={`min-h-screen bg-black text-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
            <Head title={`${chapter.title} - ${story.title}`} />
            
            {/* Header Controls */}
            <div className={`bg-black/80 backdrop-blur-sm transition-all duration-300 ${
                showControls || !isFullscreen ? 'translate-y-0' : '-translate-y-full'
            } ${isFullscreen ? 'fixed top-0 left-0 right-0 z-10' : ''}`}>
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('stories.show', story.slug)}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            ← Back to Story
                        </Link>
                        <div className="text-sm">
                            <h1 className="font-semibold">{story.title}</h1>
                            <p className="text-gray-300">{chapter.title}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Reading Mode Toggle */}
                        <div className="flex rounded-lg overflow-hidden">
                            <button
                                onClick={() => setReadingMode('scroll')}
                                className={`px-3 py-1 text-sm ${
                                    readingMode === 'scroll' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                📜 Scroll
                            </button>
                            <button
                                onClick={() => setReadingMode('page')}
                                className={`px-3 py-1 text-sm ${
                                    readingMode === 'page' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                }`}
                            >
                                📄 Page
                            </button>
                        </div>

                        {/* Fullscreen Toggle */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                            title="Toggle Fullscreen (F)"
                        >
                            {isFullscreen ? '🗙' : '⛶'}
                        </button>
                    </div>
                </div>

                {/* Page Counter for Page Mode */}
                {readingMode === 'page' && (
                    <div className="px-4 pb-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-300">
                                Page {currentPage + 1} of {chapter.images.length}
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                    disabled={currentPage === 0}
                                    className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    ← Prev
                                </button>
                                <button
                                    onClick={() => setCurrentPage(Math.min(chapter.images.length - 1, currentPage + 1))}
                                    disabled={currentPage === chapter.images.length - 1}
                                    className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    Next →
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Reader Content */}
            <div 
                className={`${isFullscreen ? 'pt-20' : 'pt-4'}`}
                onMouseMove={() => {
                    if (isFullscreen) {
                        setShowControls(true);
                    }
                }}
            >
                {readingMode === 'scroll' ? (
                    /* Scroll Mode */
                    <div className="max-w-4xl mx-auto px-4 space-y-2">
                        {chapter.images.map((image, index) => (
                            <div key={index} className="text-center">
                                <img
                                    src={image}
                                    alt={`Page ${index + 1}`}
                                    className="w-full max-w-full h-auto rounded-lg shadow-lg"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Page Mode */
                    <div className="flex items-center justify-center min-h-[80vh]">
                        <div className="max-w-4xl w-full px-4">
                            <div className="text-center">
                                <img
                                    src={chapter.images[currentPage]}
                                    alt={`Page ${currentPage + 1}`}
                                    className="w-full max-w-full h-auto rounded-lg shadow-lg cursor-pointer"
                                    onClick={handleImageClick}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chapter Navigation */}
            <div className={`bg-black/80 backdrop-blur-sm py-4 ${
                isFullscreen ? 'fixed bottom-0 left-0 right-0' : ''
            }`}>
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div>
                            {previousChapter ? (
                                <Link
                                    href={route('chapters.show', [story.slug, previousChapter.slug])}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                    <span>←</span>
                                    <div className="text-left">
                                        <div className="text-xs text-gray-300">Previous</div>
                                        <div className="text-sm font-medium">Ch. {previousChapter.chapter_number}</div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="px-4 py-2 bg-gray-800 rounded-lg opacity-50">
                                    <div className="text-sm text-gray-400">No previous chapter</div>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <Link
                                href={route('stories.show', story.slug)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                            >
                                📚 All Chapters
                            </Link>
                        </div>

                        <div>
                            {nextChapter ? (
                                <Link
                                    href={route('chapters.show', [story.slug, nextChapter.slug])}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                    <div className="text-right">
                                        <div className="text-xs text-gray-300">Next</div>
                                        <div className="text-sm font-medium">Ch. {nextChapter.chapter_number}</div>
                                    </div>
                                    <span>→</span>
                                </Link>
                            ) : (
                                <div className="px-4 py-2 bg-gray-800 rounded-lg opacity-50">
                                    <div className="text-sm text-gray-400">No next chapter</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Help Text */}
            {!isFullscreen && (
                <div className="text-center py-8 text-gray-400 text-sm">
                    <p>💡 Tips: Use arrow keys to navigate • Press F for fullscreen • Click left/right on page to navigate in page mode</p>
                </div>
            )}
        </div>
    );
}