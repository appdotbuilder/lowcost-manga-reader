<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chapter;

class ChapterCommentController extends Controller
{
    /**
     * Display comments for a chapter.
     */
    public function index(Chapter $chapter)
    {
        $comments = $chapter->comments()
            ->with(['user.profile', 'replies.user.profile'])
            ->where('is_approved', true)
            ->orderBy('is_pinned', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($comments);
    }
}