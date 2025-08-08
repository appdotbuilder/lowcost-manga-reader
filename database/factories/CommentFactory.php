<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Story;
use App\Models\Chapter;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
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
            'content' => fake()->paragraph(random_int(1, 3)),
            'is_approved' => fake()->boolean(90), // 90% approved
            'is_pinned' => fake()->boolean(5), // 5% pinned
        ];
    }

    /**
     * Indicate that the comment is for a chapter.
     */
    public function forChapter(): static
    {
        return $this->state(fn (array $attributes) => [
            'story_id' => null,
            'chapter_id' => Chapter::factory(),
        ]);
    }

    /**
     * Indicate that the comment is a reply.
     */
    public function reply(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => Comment::factory(),
        ]);
    }

    /**
     * Indicate that the comment is pinned.
     */
    public function pinned(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_pinned' => true,
        ]);
    }
}