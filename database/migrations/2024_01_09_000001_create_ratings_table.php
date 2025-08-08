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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('User ID');
            $table->unsignedBigInteger('story_id')->comment('Story ID');
            $table->unsignedTinyInteger('rating')->comment('Rating value 1-5');
            $table->text('review')->nullable()->comment('User review');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('story_id')->references('id')->on('stories')->onDelete('cascade');
            $table->unique(['user_id', 'story_id']);
            $table->index('story_id');
            $table->index('rating');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};