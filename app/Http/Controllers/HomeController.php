<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Story;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured content.
     */
    public function index()
    {
        // Get featured stories
        $featuredStories = Story::with(['author.profile'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('is_featured', true)
            ->take(6)
            ->get();

        // Get trending stories (by view count)
        $trendingStories = Story::with(['author.profile'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('view_count', 'desc')
            ->take(10)
            ->get();

        // Get recently updated stories
        $recentlyUpdated = Story::with(['author.profile', 'chapters' => function ($query) {
                $query->where('is_published', true)->whereNotNull('published_at')->latest()->take(1);
            }])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->whereHas('chapters', function ($query) {
                $query->where('is_published', true)->whereNotNull('published_at');
            })
            ->orderBy('updated_at', 'desc')
            ->take(12)
            ->get();

        // Get popular manga
        $popularManga = Story::with(['author.profile'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('type', 'manga')
            ->orderBy('favorite_count', 'desc')
            ->take(8)
            ->get();

        // Get popular novels
        $popularNovels = Story::with(['author.profile'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('type', 'novel')
            ->orderBy('favorite_count', 'desc')
            ->take(8)
            ->get();

        // Get categories
        $categories = Category::active()
            ->orderBy('name')
            ->get();

        return Inertia::render('home', [
            'featuredStories' => $featuredStories,
            'trendingStories' => $trendingStories,
            'recentlyUpdated' => $recentlyUpdated,
            'popularManga' => $popularManga,
            'popularNovels' => $popularNovels,
            'categories' => $categories,
        ]);
    }
}