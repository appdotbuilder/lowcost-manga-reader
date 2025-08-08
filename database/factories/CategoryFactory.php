<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Action', 'Adventure', 'Romance', 'Fantasy', 'Sci-Fi', 'Mystery',
            'Horror', 'Comedy', 'Drama', 'Slice of Life', 'Supernatural',
            'Historical', 'Sports', 'School', 'Martial Arts'
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => "Stories in the {$name} genre",
            'color' => fake()->hexColor(),
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the category is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}