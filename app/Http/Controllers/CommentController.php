<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Store a new comment.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'story_id' => 'nullable|exists:stories,id',
            'chapter_id' => 'nullable|exists:chapters,id',
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        // Ensure either story_id or chapter_id is provided
        if (!$request->story_id && !$request->chapter_id) {
            return response()->json(['error' => 'Either story_id or chapter_id is required'], 422);
        }

        $comment = Comment::create([
            'user_id' => auth()->id(),
            'story_id' => $request->story_id,
            'chapter_id' => $request->chapter_id,
            'parent_id' => $request->parent_id,
            'content' => $request->content,
            'is_approved' => true, // Auto-approve for now
        ]);

        $comment->load(['user.profile']);

        return response()->json([
            'comment' => $comment,
            'message' => 'Comment posted successfully!',
        ]);
    }

    /**
     * Update a comment.
     */
    public function update(Request $request, Comment $comment)
    {
        // Check if user owns the comment
        if ($comment->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $comment->update([
            'content' => $request->content,
        ]);

        return response()->json([
            'comment' => $comment,
            'message' => 'Comment updated successfully!',
        ]);
    }

    /**
     * Delete a comment.
     */
    public function destroy(Comment $comment)
    {
        // Check if user owns the comment
        if ($comment->user_id !== auth()->id()) {
            abort(403);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted successfully!',
        ]);
    }
}