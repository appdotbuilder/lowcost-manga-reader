<?php

namespace Database\Factories;

use App\Models\Story;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chapter>
 */
class ChapterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(2, 6));
        $content = fake()->paragraphs(random_int(5, 15), true);
        
        return [
            'story_id' => Story::factory(),
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'chapter_number' => fake()->randomFloat(1, 1, 100),
            'content' => $content,
            'word_count' => str_word_count($content),
            'page_count' => random_int(15, 30),
            'is_premium' => fake()->boolean(10), // 10% chance
            'is_published' => true,
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }

    /**
     * Indicate that the chapter is for a manga story.
     */
    public function manga(): static
    {
        return $this->state(fn (array $attributes) => [
            'content' => null,
            'images' => [
                '/placeholder-manga-page-1.jpg',
                '/placeholder-manga-page-2.jpg',
                '/placeholder-manga-page-3.jpg',
                '/placeholder-manga-page-4.jpg',
            ],
            'word_count' => 0,
            'page_count' => count([
                '/placeholder-manga-page-1.jpg',
                '/placeholder-manga-page-2.jpg',
                '/placeholder-manga-page-3.jpg',
                '/placeholder-manga-page-4.jpg',
            ]),
        ]);
    }

    /**
     * Indicate that the chapter is premium.
     */
    public function premium(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_premium' => true,
        ]);
    }
}