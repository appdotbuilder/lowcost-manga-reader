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
        Schema::create('reading_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('User ID');
            $table->unsignedBigInteger('story_id')->comment('Story ID');
            $table->unsignedBigInteger('chapter_id')->nullable()->comment('Last read chapter ID');
            $table->decimal('progress', 5, 2)->default(0)->comment('Reading progress percentage');
            $table->json('bookmark_data')->nullable()->comment('Bookmark position data');
            $table->timestamp('last_read_at')->comment('Last reading timestamp');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('story_id')->references('id')->on('stories')->onDelete('cascade');
            $table->foreign('chapter_id')->references('id')->on('chapters')->onDelete('set null');
            $table->unique(['user_id', 'story_id']);
            $table->index('user_id');
            $table->index('story_id');
            $table->index('last_read_at');
            $table->index(['user_id', 'last_read_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_history');
    }
};