<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Story>
 */
class StoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(2, 5));
        $genres = ['Action', 'Adventure', 'Romance', 'Fantasy', 'Sci-Fi', 'Mystery', 'Horror', 'Comedy', 'Drama'];
        $tags = ['adventure', 'magic', 'romance', 'action', 'fantasy', 'mystery', 'drama', 'comedy'];

        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'description' => fake()->paragraph(4),
            'type' => fake()->randomElement(['manga', 'novel']),
            'status' => fake()->randomElement(['ongoing', 'completed', 'hiatus']),
            'author_id' => User::factory(),
            'genres' => fake()->randomElements($genres, random_int(1, 3)),
            'tags' => fake()->randomElements($tags, random_int(2, 5)),
            'rating' => fake()->randomFloat(1, 3.0, 5.0),
            'rating_count' => fake()->numberBetween(0, 1000),
            'view_count' => fake()->numberBetween(100, 50000),
            'favorite_count' => fake()->numberBetween(0, 2000),
            'is_featured' => fake()->boolean(20), // 20% chance
            'is_published' => true,
            'published_at' => fake()->dateTimeBetween('-2 years', 'now'),
        ];
    }

    /**
     * Indicate that the story is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    /**
     * Indicate that the story is a manga.
     */
    public function manga(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'manga',
        ]);
    }

    /**
     * Indicate that the story is a novel.
     */
    public function novel(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'novel',
        ]);
    }

    /**
     * Indicate that the story is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
        ]);
    }
}