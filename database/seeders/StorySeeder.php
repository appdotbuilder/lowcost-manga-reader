<?php

namespace Database\Seeders;

use App\Models\Story;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Chapter;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample authors
        $authors = [];
        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'name' => "Author {$i}",
                'email' => "author{$i}@example.com",
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);

            UserProfile::create([
                'user_id' => $user->id,
                'username' => "author{$i}",
                'bio' => "Professional manga/novel author with years of experience.",
                'is_author' => true,
            ]);

            $authors[] = $user;
        }

        $mangaStories = [
            [
                'title' => 'Dragon Chronicles',
                'description' => 'An epic tale of a young warrior who discovers his destiny to save the world from ancient dragons.',
                'genres' => ['Action', 'Fantasy', 'Adventure'],
                'tags' => ['dragons', 'magic', 'warrior'],
            ],
            [
                'title' => 'High School Romance',
                'description' => 'A heartwarming story about first love and growing up in modern Japan.',
                'genres' => ['Romance', 'School', 'Slice of Life'],
                'tags' => ['school', 'romance', 'youth'],
            ],
            [
                'title' => 'Cyber Punk 2085',
                'description' => 'In a dystopian future, a hacker fights against corporate control of society.',
                'genres' => ['Sci-Fi', 'Action', 'Drama'],
                'tags' => ['cyberpunk', 'hacker', 'future'],
            ],
            [
                'title' => 'Mystic Academy',
                'description' => 'Students at a magical academy learn to control their supernatural powers.',
                'genres' => ['Fantasy', 'School', 'Supernatural'],
                'tags' => ['magic', 'academy', 'supernatural'],
            ],
            [
                'title' => 'Samurai Legacy',
                'description' => 'The last samurai embarks on a quest to restore honor to his clan.',
                'genres' => ['Historical', 'Action', 'Drama'],
                'tags' => ['samurai', 'honor', 'historical'],
            ],
        ];

        $novelStories = [
            [
                'title' => 'The Awakening Chronicles',
                'description' => 'A young woman discovers she has the power to see into parallel dimensions.',
                'genres' => ['Fantasy', 'Mystery', 'Adventure'],
                'tags' => ['dimensions', 'awakening', 'mystery'],
            ],
            [
                'title' => 'Love in the Digital Age',
                'description' => 'Two people fall in love through an online game, never meeting in real life.',
                'genres' => ['Romance', 'Drama', 'Slice of Life'],
                'tags' => ['online', 'love', 'modern'],
            ],
            [
                'title' => 'The Space Pirates',
                'description' => 'A crew of space pirates searches for the legendary treasure of the Andromeda Galaxy.',
                'genres' => ['Sci-Fi', 'Adventure', 'Action'],
                'tags' => ['space', 'pirates', 'treasure'],
            ],
            [
                'title' => 'Haunted Memories',
                'description' => 'A detective investigates supernatural cases in a city where ghosts walk among the living.',
                'genres' => ['Horror', 'Mystery', 'Supernatural'],
                'tags' => ['detective', 'ghosts', 'supernatural'],
            ],
            [
                'title' => 'The Culinary Masters',
                'description' => 'Young chefs compete in the ultimate cooking competition to become the world\'s best.',
                'genres' => ['Drama', 'Slice of Life', 'Comedy'],
                'tags' => ['cooking', 'competition', 'food'],
            ],
        ];

        // Create manga stories
        foreach ($mangaStories as $index => $storyData) {
            $author = $authors[random_int(0, count($authors) - 1)];
            
            $story = Story::create([
                'title' => $storyData['title'],
                'slug' => Str::slug($storyData['title']),
                'description' => $storyData['description'],
                'type' => 'manga',
                'status' => random_int(0, 1) ? 'ongoing' : 'completed',
                'author_id' => $author->id,
                'genres' => $storyData['genres'],
                'tags' => $storyData['tags'],
                'rating' => round(random_int(350, 500) / 100, 1),
                'rating_count' => random_int(10, 500),
                'view_count' => random_int(1000, 50000),
                'favorite_count' => random_int(50, 2000),
                'is_featured' => random_int(0, 4) === 0, // 20% chance of being featured
                'is_published' => true,
                'published_at' => now()->subDays(random_int(1, 365)),
            ]);

            // Create chapters for manga
            for ($i = 1; $i <= random_int(5, 25); $i++) {
                Chapter::create([
                    'story_id' => $story->id,
                    'title' => "Chapter {$i}: " . fake()->sentence(3),
                    'slug' => "chapter-{$i}",
                    'chapter_number' => $i,
                    'images' => [
                        '/placeholder-manga-page-1.jpg',
                        '/placeholder-manga-page-2.jpg',
                        '/placeholder-manga-page-3.jpg',
                    ],
                    'page_count' => random_int(15, 30),
                    'is_published' => true,
                    'published_at' => $story->published_at->addDays($i - 1),
                ]);
            }
        }

        // Create novel stories
        foreach ($novelStories as $index => $storyData) {
            $author = $authors[random_int(0, count($authors) - 1)];
            
            $story = Story::create([
                'title' => $storyData['title'],
                'slug' => Str::slug($storyData['title']),
                'description' => $storyData['description'],
                'type' => 'novel',
                'status' => random_int(0, 1) ? 'ongoing' : 'completed',
                'author_id' => $author->id,
                'genres' => $storyData['genres'],
                'tags' => $storyData['tags'],
                'rating' => round(random_int(350, 500) / 100, 1),
                'rating_count' => random_int(10, 500),
                'view_count' => random_int(1000, 50000),
                'favorite_count' => random_int(50, 2000),
                'is_featured' => random_int(0, 4) === 0, // 20% chance of being featured
                'is_published' => true,
                'published_at' => now()->subDays(random_int(1, 365)),
            ]);

            // Create chapters for novel
            for ($i = 1; $i <= random_int(10, 50); $i++) {
                $content = implode("\n\n", [
                    fake()->paragraph(10),
                    fake()->paragraph(8),
                    fake()->paragraph(12),
                    fake()->paragraph(6),
                    fake()->paragraph(9),
                ]);

                Chapter::create([
                    'story_id' => $story->id,
                    'title' => "Chapter {$i}: " . fake()->sentence(4),
                    'slug' => "chapter-{$i}",
                    'chapter_number' => $i,
                    'content' => $content,
                    'word_count' => str_word_count($content),
                    'is_published' => true,
                    'published_at' => $story->published_at->addDays($i - 1),
                ]);
            }
        }
    }
}