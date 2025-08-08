<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Story;
use App\Models\Chapter;
use App\Models\ReadingHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChapterController extends Controller
{
    /**
     * Display the specified chapter.
     */
    public function show(Story $story, Chapter $chapter)
    {
        // Verify chapter belongs to story
        if ($chapter->story_id !== $story->id) {
            abort(404);
        }

        $chapter->load(['story.author.profile']);

        // Get navigation chapters
        $previousChapter = Chapter::where('story_id', $story->id)
            ->published()
            ->where('chapter_number', '<', $chapter->chapter_number)
            ->orderBy('chapter_number', 'desc')
            ->first();

        $nextChapter = Chapter::where('story_id', $story->id)
            ->published()
            ->where('chapter_number', '>', $chapter->chapter_number)
            ->orderBy('chapter_number', 'asc')
            ->first();

        // Update reading history for authenticated users
        if (auth()->check()) {
            ReadingHistory::updateOrCreate(
                [
                    'user_id' => auth()->id(),
                    'story_id' => $story->id,
                ],
                [
                    'chapter_id' => $chapter->id,
                    'last_read_at' => now(),
                ]
            );
        }

        $renderPage = $story->type === 'manga' ? 'chapters/manga-reader' : 'chapters/novel-reader';

        return Inertia::render($renderPage, [
            'story' => $story,
            'chapter' => $chapter,
            'previousChapter' => $previousChapter,
            'nextChapter' => $nextChapter,
        ]);
    }


}