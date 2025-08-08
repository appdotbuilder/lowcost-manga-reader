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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('User ID');
            $table->string('username')->unique()->nullable()->comment('Unique username');
            $table->string('avatar')->nullable()->comment('Avatar image URL');
            $table->text('bio')->nullable()->comment('User biography');
            $table->date('birth_date')->nullable()->comment('Birth date');
            $table->enum('gender', ['male', 'female', 'other', 'prefer_not_to_say'])->nullable()->comment('Gender');
            $table->string('location')->nullable()->comment('User location');
            $table->string('website')->nullable()->comment('Personal website');
            $table->json('social_links')->nullable()->comment('Social media links');
            $table->json('reading_preferences')->nullable()->comment('Reading preferences');
            $table->boolean('is_author')->default(false)->comment('Author status');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unique('user_id');
            $table->index('username');
            $table->index('is_author');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};