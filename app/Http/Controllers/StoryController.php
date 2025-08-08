<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Story;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryController extends Controller
{
    /**
     * Display a listing of stories.
     */
    public function index(Request $request)
    {
        $query = Story::with(['author.profile'])
            ->published()
            ->latest('published_at');

        // Apply filters
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

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

        $categories = Category::active()->orderBy('name')->get();

        return Inertia::render('stories/index', [
            'stories' => $stories,
            'categories' => $categories,
            'filters' => $request->only(['type', 'status', 'genre', 'search', 'sort']),
        ]);
    }

    /**
     * Display the specified story.
     */
    public function show(Story $story)
    {
        $story->load([
            'author.profile',
            'chapters' => function ($query) {
                $query->published()->orderBy('chapter_number');
            },
            'ratings' => function ($query) {
                $query->with('user')->latest()->take(10);
            }
        ]);

        // Increment view count
        $story->increment('view_count');

        // Get similar stories
        $similarStories = Story::published()
            ->where('id', '!=', $story->id)
            ->where('type', $story->type)
            ->where(function ($query) use ($story) {
                if ($story->genres) {
                    foreach ($story->genres as $genre) {
                        $query->orWhereJsonContains('genres', $genre);
                    }
                }
            })
            ->take(6)
            ->get();

        $userFavorited = false;
        $userRating = null;

        if (auth()->check()) {
            $userFavorited = auth()->user()->favorites()
                ->where('story_id', $story->id)
                ->exists();

            $userRating = auth()->user()->ratings()
                ->where('story_id', $story->id)
                ->first();
        }

        return Inertia::render('stories/show', [
            'story' => $story,
            'similarStories' => $similarStories,
            'userFavorited' => $userFavorited,
            'userRating' => $userRating,
        ]);
    }


}