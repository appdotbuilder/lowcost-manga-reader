<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    /**
     * Display user's favorite stories.
     */
    public function index()
    {
        $favorites = auth()->user()->favorites()
            ->with(['story.author.profile', 'story.chapters' => function ($query) {
                $query->published()->latest()->take(1);
            }])
            ->latest()
            ->paginate(20);

        return Inertia::render('favorites/index', [
            'favorites' => $favorites,
        ]);
    }

    /**
     * Add a story to favorites.
     */
    public function store(Request $request)
    {
        $request->validate([
            'story_id' => 'required|exists:stories,id',
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id' => auth()->id(),
            'story_id' => $request->story_id,
        ]);

        if ($favorite->wasRecentlyCreated) {
            // Increment favorite count on story
            Story::where('id', $request->story_id)->increment('favorite_count');
        }

        return redirect()->back()->with('success', 'Added to favorites!');
    }

    /**
     * Remove a story from favorites.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'story_id' => 'required|exists:stories,id',
        ]);

        $deleted = Favorite::where([
            'user_id' => auth()->id(),
            'story_id' => $request->story_id,
        ])->delete();

        if ($deleted) {
            // Decrement favorite count on story
            Story::where('id', $request->story_id)->decrement('favorite_count');
        }

        return redirect()->back()->with('success', 'Removed from favorites!');
    }
}