<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Story;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MangaController extends Controller
{
    /**
     * Display manga stories.
     */
    public function index(Request $request)
    {
        $query = Story::with(['author.profile'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where('type', 'manga')
            ->latest('published_at');

        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('genre')) {
            $query->whereJsonContains('genres', $request->genre);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ILIKE', "%{$search}%")
                  ->orWhere('description', 'ILIKE', "%{$search}%")
                  ->orWhereHas('author', function ($authorQuery) use ($search) {
                      $authorQuery->where('name', 'ILIKE', "%{$search}%");
                  });
            });
        }

        // Apply sorting
        switch ($request->get('sort', 'latest')) {
            case 'popular':
                $query->orderBy('favorite_count', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'views':
                $query->orderBy('view_count', 'desc');
                break;
            default:
                $query->latest('published_at');
        }

        $stories = $query->paginate(24);

        $categories = Category::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('stories/index', [
            'stories' => $stories,
            'categories' => $categories,
            'filters' => array_merge($request->only(['status', 'genre', 'search', 'sort']), ['type' => 'manga']),
        ]);
    }
}