<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create test user
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create user profiles
        UserProfile::create([
            'user_id' => $admin->id,
            'username' => 'admin',
            'bio' => 'Platform administrator',
            'is_author' => true,
        ]);

        UserProfile::create([
            'user_id' => $testUser->id,
            'username' => 'testuser',
            'bio' => 'Avid manga and novel reader',
            'is_author' => false,
        ]);

        // Seed categories and stories
        $this->call([
            CategorySeeder::class,
            StorySeeder::class,
        ]);
    }
}
