<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\NovelController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Api\ChapterCommentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - main manga/novel platform
Route::get('/', [HomeController::class, 'index'])->name('home');

// Stories
Route::get('/stories', [StoryController::class, 'index'])->name('stories.index');
Route::get('/manga', [MangaController::class, 'index'])->name('stories.manga');
Route::get('/novels', [NovelController::class, 'index'])->name('stories.novels');
Route::get('/stories/{story:slug}', [StoryController::class, 'show'])->name('stories.show');

// Chapters
Route::get('/stories/{story:slug}/{chapter:slug}', [ChapterController::class, 'show'])->name('chapters.show');
Route::get('/api/chapters/{chapter}/comments', [ChapterCommentController::class, 'index'])->name('chapters.comments');

// Comments (API)
Route::middleware('auth')->group(function () {
    Route::post('/api/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::put('/api/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
    Route::delete('/api/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

// Favorites
Route::middleware('auth')->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/favorites', [FavoriteController::class, 'destroy'])->name('favorites.destroy');
});

// Ratings
Route::middleware('auth')->group(function () {
    Route::post('/ratings', [RatingController::class, 'store'])->name('ratings.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';