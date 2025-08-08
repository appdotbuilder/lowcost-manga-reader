<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserProfile>
 */
class UserProfileFactory extends Factory
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
            'username' => fake()->unique()->userName(),
            'bio' => fake()->paragraph(2),
            'birth_date' => fake()->dateTimeBetween('-50 years', '-13 years')->format('Y-m-d'),
            'gender' => fake()->randomElement(['male', 'female', 'other', 'prefer_not_to_say']),
            'location' => fake()->city() . ', ' . fake()->country(),
            'website' => fake()->optional()->url(),
            'social_links' => [
                'twitter' => fake()->optional()->userName(),
                'instagram' => fake()->optional()->userName(),
            ],
            'reading_preferences' => [
                'favorite_genres' => fake()->randomElements(['Action', 'Romance', 'Fantasy'], 2),
                'preferred_length' => fake()->randomElement(['short', 'medium', 'long']),
            ],
            'is_author' => fake()->boolean(30), // 30% chance of being an author
        ];
    }

    /**
     * Indicate that the user profile is for an author.
     */
    public function author(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_author' => true,
            'bio' => 'Professional manga and novel creator with years of experience in storytelling.',
        ]);
    }
}