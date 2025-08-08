<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('User ID');
            $table->unsignedBigInteger('story_id')->nullable()->comment('Story ID if story comment');
            $table->unsignedBigInteger('chapter_id')->nullable()->comment('Chapter ID if chapter comment');
            $table->unsignedBigInteger('parent_id')->nullable()->comment('Parent comment ID for replies');
            $table->text('content')->comment('Comment content');
            $table->boolean('is_approved')->default(true)->comment('Moderation status');
            $table->boolean('is_pinned')->default(false)->comment('Pinned comment status');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('story_id')->references('id')->on('stories')->onDelete('cascade');
            $table->foreign('chapter_id')->references('id')->on('chapters')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('comments')->onDelete('cascade');
            $table->index('user_id');
            $table->index('story_id');
            $table->index('chapter_id');
            $table->index('parent_id');
            $table->index('is_approved');
            $table->index('is_pinned');
            $table->index('created_at');
            $table->index(['story_id', 'is_approved', 'created_at']);
            $table->index(['chapter_id', 'is_approved', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};