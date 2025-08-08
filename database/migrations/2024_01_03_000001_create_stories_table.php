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
        Schema::create('stories', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Story title');
            $table->string('slug')->unique()->comment('SEO-friendly story slug');
            $table->text('description')->comment('Story description');
            $table->string('cover_image')->nullable()->comment('Cover image URL');
            $table->enum('type', ['manga', 'novel'])->comment('Story type - manga or novel');
            $table->enum('status', ['ongoing', 'completed', 'hiatus', 'dropped'])->default('ongoing')->comment('Story status');
            $table->unsignedBigInteger('author_id')->comment('Author user ID');
            $table->json('genres')->nullable()->comment('Array of genre names');
            $table->json('tags')->nullable()->comment('Array of tag names');
            $table->decimal('rating', 3, 2)->default(0)->comment('Average rating');
            $table->unsignedInteger('rating_count')->default(0)->comment('Number of ratings');
            $table->unsignedInteger('view_count')->default(0)->comment('Total view count');
            $table->unsignedInteger('favorite_count')->default(0)->comment('Total favorite count');
            $table->boolean('is_featured')->default(false)->comment('Featured story status');
            $table->boolean('is_published')->default(false)->comment('Publication status');
            $table->timestamp('published_at')->nullable()->comment('Publication date');
            $table->timestamps();

            $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('slug');
            $table->index('type');
            $table->index('status');
            $table->index('author_id');
            $table->index('is_featured');
            $table->index('is_published');
            $table->index('published_at');
            $table->index('rating');
            $table->index('view_count');
            $table->index(['type', 'status']);
            $table->index(['is_published', 'published_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stories');
    }
};