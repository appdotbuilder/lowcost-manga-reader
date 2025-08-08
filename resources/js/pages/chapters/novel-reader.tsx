import React, { useState, useEffect, useRef } from 'react';
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
    content: string;
    word_count: number;
    story: Story;
}

interface Props {
    story: Story;
    chapter: Chapter;
    previousChapter: Chapter | null;
    nextChapter: Chapter | null;
    [key: string]: unknown;
}

type FontSize = 'small' | 'medium' | 'large' | 'xl';
type Theme = 'light' | 'dark' | 'sepia';

export default function NovelReader({ story, chapter, previousChapter, nextChapter }: Props) {
    const [fontSize, setFontSize] = useState<FontSize>('medium');
    const [theme, setTheme] = useState<Theme>('light');
    const [showSettings, setShowSettings] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [bookmarks, setBookmarks] = useState<number[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    // Load user preferences from localStorage
    useEffect(() => {
        const savedFontSize = localStorage.getItem('reader-font-size') as FontSize;
        const savedTheme = localStorage.getItem('reader-theme') as Theme;
        const savedBookmarks = localStorage.getItem(`bookmarks-${story.id}-${chapter.id}`);
        
        if (savedFontSize) setFontSize(savedFontSize);
        if (savedTheme) setTheme(savedTheme);
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    }, [story.id, chapter.id]);

    // Save preferences to localStorage
    useEffect(() => {
        localStorage.setItem('reader-font-size', fontSize);
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('reader-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem(`bookmarks-${story.id}-${chapter.id}`, JSON.stringify(bookmarks));
    }, [bookmarks, story.id, chapter.id]);

    // Handle scroll progress
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const element = contentRef.current;
                const totalHeight = element.scrollHeight - element.clientHeight;
                const currentProgress = (element.scrollTop / totalHeight) * 100;
                setScrollProgress(Math.max(0, Math.min(100, currentProgress)));
                
                // Auto-save reading progress
                const progress = {
                    storyId: story.id,
                    chapterId: chapter.id,
                    scrollProgress: currentProgress,
                    timestamp: Date.now(),
                };
                localStorage.setItem(`reading-progress-${story.id}`, JSON.stringify(progress));
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
            return () => contentElement.removeEventListener('scroll', handleScroll);
        }
    }, [story.id, chapter.id]);

    // Restore scroll position
    useEffect(() => {
        const saved = localStorage.getItem(`reading-progress-${story.id}`);
        if (saved) {
            const progress = JSON.parse(saved);
            if (progress.chapterId === chapter.id && contentRef.current) {
                const element = contentRef.current;
                const totalHeight = element.scrollHeight - element.clientHeight;
                const scrollPosition = (progress.scrollProgress / 100) * totalHeight;
                setTimeout(() => {
                    element.scrollTop = scrollPosition;
                }, 100);
            }
        }
    }, [story.id, chapter.id]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) {
                switch (event.key) {
                    case '=':
                    case '+':
                        event.preventDefault();
                        increaseFontSize();
                        break;
                    case '-':
                        event.preventDefault();
                        decreaseFontSize();
                        break;
                    case 'd':
                        event.preventDefault();
                        setTheme(theme === 'dark' ? 'light' : 'dark');
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [theme]);

    const increaseFontSize = () => {
        const sizes: FontSize[] = ['small', 'medium', 'large', 'xl'];
        const currentIndex = sizes.indexOf(fontSize);
        if (currentIndex < sizes.length - 1) {
            setFontSize(sizes[currentIndex + 1]);
        }
    };

    const decreaseFontSize = () => {
        const sizes: FontSize[] = ['small', 'medium', 'large', 'xl'];
        const currentIndex = sizes.indexOf(fontSize);
        if (currentIndex > 0) {
            setFontSize(sizes[currentIndex - 1]);
        }
    };

    const addBookmark = () => {
        if (contentRef.current) {
            const scrollPosition = contentRef.current.scrollTop;
            if (!bookmarks.includes(scrollPosition)) {
                setBookmarks([...bookmarks, scrollPosition].sort((a, b) => a - b));
            }
        }
    };

    const goToBookmark = (position: number) => {
        if (contentRef.current) {
            contentRef.current.scrollTop = position;
        }
    };

    const removeBookmark = (position: number) => {
        setBookmarks(bookmarks.filter(bookmark => bookmark !== position));
    };

    const getThemeClasses = () => {
        switch (theme) {
            case 'dark':
                return 'bg-gray-900 text-gray-100';
            case 'sepia':
                return 'bg-amber-50 text-amber-900';
            default:
                return 'bg-white text-gray-900';
        }
    };

    const getFontSizeClass = () => {
        switch (fontSize) {
            case 'small':
                return 'text-sm';
            case 'large':
                return 'text-lg';
            case 'xl':
                return 'text-xl';
            default:
                return 'text-base';
        }
    };

    const formatContent = (content: string) => {
        return content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? (
                <p key={index} className="mb-4 leading-relaxed">
                    {paragraph.trim()}
                </p>
            ) : (
                <div key={index} className="mb-4" />
            )
        ));
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
            <Head title={`${chapter.title} - ${story.title}`} />
            
            {/* Header */}
            <div className={`sticky top-0 z-10 border-b backdrop-blur-sm ${
                theme === 'dark' 
                    ? 'bg-gray-900/80 border-gray-700' 
                    : theme === 'sepia'
                    ? 'bg-amber-50/80 border-amber-200'
                    : 'bg-white/80 border-gray-200'
            }`}>
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route('stories.show', story.slug)}
                                className="hover:opacity-70 transition-opacity"
                            >
                                ← Back to Story
                            </Link>
                            <div className="text-sm">
                                <h1 className="font-semibold truncate max-w-xs">{story.title}</h1>
                                <p className="opacity-70">{chapter.title}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {/* Progress Bar */}
                            <div className="hidden sm:flex items-center space-x-2">
                                <div className={`w-24 h-1 rounded-full ${
                                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
                                }`}>
                                    <div 
                                        className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                                        style={{ width: `${scrollProgress}%` }}
                                    />
                                </div>
                                <span className="text-xs opacity-70 min-w-[3rem]">
                                    {Math.round(scrollProgress)}%
                                </span>
                            </div>

                            {/* Settings Button */}
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`p-2 rounded-lg transition-colors ${
                                    theme === 'dark' 
                                        ? 'hover:bg-gray-700' 
                                        : 'hover:bg-gray-100'
                                }`}
                                title="Reader Settings"
                            >
                                ⚙️
                            </button>
                        </div>
                    </div>

                    {/* Settings Panel */}
                    {showSettings && (
                        <div className={`mt-4 p-4 rounded-lg border ${
                            theme === 'dark' 
                                ? 'bg-gray-800 border-gray-700' 
                                : theme === 'sepia'
                                ? 'bg-amber-100 border-amber-300'
                                : 'bg-gray-50 border-gray-200'
                        }`}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Font Size */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-2">Font Size</h3>
                                    <div className="flex space-x-1">
                                        {(['small', 'medium', 'large', 'xl'] as FontSize[]).map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setFontSize(size)}
                                                className={`px-2 py-1 rounded text-xs ${
                                                    fontSize === size
                                                        ? 'bg-indigo-600 text-white'
                                                        : theme === 'dark'
                                                        ? 'bg-gray-700 hover:bg-gray-600'
                                                        : 'bg-white hover:bg-gray-100'
                                                }`}
                                            >
                                                {size.charAt(0).toUpperCase() + size.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs opacity-70 mt-1">Ctrl/Cmd + / -</p>
                                </div>

                                {/* Theme */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-2">Theme</h3>
                                    <div className="flex space-x-1">
                                        {(['light', 'dark', 'sepia'] as Theme[]).map((themeOption) => (
                                            <button
                                                key={themeOption}
                                                onClick={() => setTheme(themeOption)}
                                                className={`px-2 py-1 rounded text-xs ${
                                                    theme === themeOption
                                                        ? 'bg-indigo-600 text-white'
                                                        : theme === 'dark'
                                                        ? 'bg-gray-700 hover:bg-gray-600'
                                                        : 'bg-white hover:bg-gray-100'
                                                }`}
                                            >
                                                {themeOption === 'light' ? '☀️' : themeOption === 'dark' ? '🌙' : '📜'} {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs opacity-70 mt-1">Ctrl/Cmd + D for dark</p>
                                </div>

                                {/* Bookmarks */}
                                <div>
                                    <h3 className="text-sm font-semibold mb-2">Bookmarks</h3>
                                    <button
                                        onClick={addBookmark}
                                        className={`px-2 py-1 rounded text-xs mb-2 ${
                                            theme === 'dark'
                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                : 'bg-white hover:bg-gray-100'
                                        }`}
                                    >
                                        🔖 Add Bookmark
                                    </button>
                                    {bookmarks.length > 0 && (
                                        <div className="space-y-1 max-h-20 overflow-y-auto">
                                            {bookmarks.map((bookmark, index) => (
                                                <div key={bookmark} className="flex items-center justify-between text-xs">
                                                    <button
                                                        onClick={() => goToBookmark(bookmark)}
                                                        className="text-indigo-600 hover:text-indigo-700"
                                                    >
                                                        Bookmark {index + 1}
                                                    </button>
                                                    <button
                                                        onClick={() => removeBookmark(bookmark)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div 
                ref={contentRef}
                className="max-w-4xl mx-auto px-4 py-8 max-h-screen overflow-y-auto"
                style={{ height: 'calc(100vh - 120px)' }}
            >
                {/* Chapter Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold mb-2">{chapter.title}</h1>
                    <div className="flex items-center justify-center space-x-4 text-sm opacity-70">
                        <span>📖 Chapter {chapter.chapter_number}</span>
                        <span>📝 {chapter.word_count.toLocaleString()} words</span>
                        <span>👤 {story.author.profile?.username || story.author.name}</span>
                    </div>
                </div>

                {/* Chapter Content */}
                <div className={`prose prose-lg max-w-none ${getFontSizeClass()} ${
                    theme === 'dark' ? 'prose-invert' : 
                    theme === 'sepia' ? 'prose-amber' : ''
                }`}>
                    {formatContent(chapter.content)}
                </div>

                {/* Chapter Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            {previousChapter ? (
                                <Link
                                    href={route('chapters.show', [story.slug, previousChapter.slug])}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                        theme === 'dark' 
                                            ? 'bg-gray-700 hover:bg-gray-600' 
                                            : theme === 'sepia'
                                            ? 'bg-amber-100 hover:bg-amber-200'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    <span>←</span>
                                    <div className="text-left">
                                        <div className="text-xs opacity-70">Previous</div>
                                        <div className="text-sm font-medium">Ch. {previousChapter.chapter_number}</div>
                                    </div>
                                </Link>
                            ) : (
                                <div className={`px-4 py-2 rounded-lg opacity-50 ${
                                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                                }`}>
                                    <div className="text-sm opacity-70">No previous chapter</div>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <Link
                                href={route('stories.show', story.slug)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                            >
                                📚 All Chapters
                            </Link>
                        </div>

                        <div>
                            {nextChapter ? (
                                <Link
                                    href={route('chapters.show', [story.slug, nextChapter.slug])}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                                        theme === 'dark' 
                                            ? 'bg-gray-700 hover:bg-gray-600' 
                                            : theme === 'sepia'
                                            ? 'bg-amber-100 hover:bg-amber-200'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >
                                    <div className="text-right">
                                        <div className="text-xs opacity-70">Next</div>
                                        <div className="text-sm font-medium">Ch. {nextChapter.chapter_number}</div>
                                    </div>
                                    <span>→</span>
                                </Link>
                            ) : (
                                <div className={`px-4 py-2 rounded-lg opacity-50 ${
                                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                                }`}>
                                    <div className="text-sm opacity-70">No next chapter</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}