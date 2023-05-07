<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\User;
use App\Models\Rating;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // padlets
        $entry1 = Entry::find(1);
        $entry2 = Entry::find(2);
        $entry3 = Entry::find(3);

        // users
        $user1 = User::find(1);
        $user2 = User::find(2);

        // RATING 1
        $rating1 = new Rating();
        $rating1->stars = 5;
        $rating1->user()->associate($user1);
        $rating1->entry()->associate($entry1);
        $rating1->save();

        // RATING 2
        $rating2 = new Rating();
        $rating2->stars = 3;
        $rating2->user()->associate($user2);
        $rating2->entry()->associate($entry1);
        $rating2->save();


        // RATING 2
        $rating3 = new Rating();
        $rating3->stars = 3;
        $rating3->user()->associate($user2);
        $rating3->entry()->associate($entry2);
        $rating3->save();

        // RATING 2
        $rating4 = new Rating();
        $rating4->stars = 4;
        $rating4->user()->associate($user2);
        $rating4->entry()->associate($entry3);
        $rating4->save();

    }
}
