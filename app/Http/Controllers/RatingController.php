<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use App\Models\Story;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Store or update a rating.
     */
    public function store(Request $request)
    {
        $request->validate([
            'story_id' => 'required|exists:stories,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);

        $rating = Rating::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'story_id' => $request->story_id,
            ],
            [
                'rating' => $request->rating,
                'review' => $request->review,
            ]
        );

        // Update story rating
        $this->updateStoryRating($request->story_id);

        return redirect()->back()->with('success', 'Rating submitted successfully!');
    }

    /**
     * Update the average rating for a story.
     *
     * @param int $storyId
     * @return void
     */
    protected function updateStoryRating($storyId)
    {
        $ratings = Rating::where('story_id', $storyId)->get();
        
        $averageRating = $ratings->avg('rating');
        $ratingCount = $ratings->count();

        Story::where('id', $storyId)->update([
            'rating' => round($averageRating, 2),
            'rating_count' => $ratingCount,
        ]);
    }
}