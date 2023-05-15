<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(UsersTableSeeder::class);
        $this->call(PadletsTableSeeder::class);
        $this->call(EntriesTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(RightsTableSeeder::class);
        $this->call(RatingsTableSeeder::class);
    }
}
