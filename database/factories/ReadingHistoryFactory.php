<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Story;
use App\Models\Chapter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReadingHistory>
 */
class ReadingHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'story_id' => Story::factory(),
            'chapter_id' => Chapter::factory(),
            'progress' => fake()->randomFloat(2, 0, 100),
            'bookmark_data' => [
                'scroll_position' => fake()->numberBetween(0, 1000),
                'page' => fake()->numberBetween(1, 50),
            ],
            'last_read_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the reading is just started.
     */
    public function justStarted(): static
    {
        return $this->state(fn (array $attributes) => [
            'progress' => fake()->randomFloat(2, 0, 10),
            'last_read_at' => fake()->dateTimeBetween('-1 day', 'now'),
        ]);
    }

    /**
     * Indicate that the reading is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'progress' => 100.00,
        ]);
    }
}