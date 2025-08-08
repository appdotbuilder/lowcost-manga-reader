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
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('story_id')->comment('Related story ID');
            $table->string('title')->comment('Chapter title');
            $table->string('slug')->comment('SEO-friendly chapter slug');
            $table->decimal('chapter_number', 8, 2)->comment('Chapter number with decimal support');
            $table->longText('content')->nullable()->comment('Chapter content for novels');
            $table->json('images')->nullable()->comment('Array of image URLs for manga');
            $table->unsignedInteger('word_count')->default(0)->comment('Word count for novels');
            $table->unsignedInteger('page_count')->default(0)->comment('Page count for manga');
            $table->boolean('is_premium')->default(false)->comment('Premium chapter status');
            $table->boolean('is_published')->default(false)->comment('Publication status');
            $table->timestamp('published_at')->nullable()->comment('Publication date');
            $table->timestamps();

            $table->foreign('story_id')->references('id')->on('stories')->onDelete('cascade');
            $table->unique(['story_id', 'slug']);
            $table->unique(['story_id', 'chapter_number']);
            $table->index('story_id');
            $table->index('chapter_number');
            $table->index('is_premium');
            $table->index('is_published');
            $table->index('published_at');
            $table->index(['story_id', 'chapter_number']);
            $table->index(['story_id', 'is_published', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};