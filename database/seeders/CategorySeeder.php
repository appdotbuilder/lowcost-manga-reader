<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Action', 'color' => '#EF4444'],
            ['name' => 'Adventure', 'color' => '#F97316'],
            ['name' => 'Romance', 'color' => '#EC4899'],
            ['name' => 'Fantasy', 'color' => '#8B5CF6'],
            ['name' => 'Sci-Fi', 'color' => '#06B6D4'],
            ['name' => 'Mystery', 'color' => '#6B7280'],
            ['name' => 'Horror', 'color' => '#1F2937'],
            ['name' => 'Comedy', 'color' => '#FBBF24'],
            ['name' => 'Drama', 'color' => '#10B981'],
            ['name' => 'Slice of Life', 'color' => '#3B82F6'],
            ['name' => 'Supernatural', 'color' => '#7C3AED'],
            ['name' => 'Historical', 'color' => '#92400E'],
            ['name' => 'Sports', 'color' => '#059669'],
            ['name' => 'School', 'color' => '#DC2626'],
            ['name' => 'Martial Arts', 'color' => '#B91C1C'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => "Stories in the {$category['name']} genre",
                'color' => $category['color'],
                'is_active' => true,
            ]);
        }
    }
}