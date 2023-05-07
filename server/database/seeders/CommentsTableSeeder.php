<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
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
        $rating1 = new Comment();
        $rating1->text = 'Good Point';
        $rating1->user()->associate($user1);
        $rating1->entry()->associate($entry1);
        $rating1->save();

        // RATING 2
        $rating2 = new Comment();
        $rating2->text = 'I agree';
        $rating2->user()->associate($user2);
        $rating2->entry()->associate($entry1);
        $rating2->save();


        // RATING 2
        $rating3 = new Comment();
        $rating3->text = 'same';
        $rating3->user()->associate($user2);
        $rating3->entry()->associate($entry2);
        $rating3->save();

        // RATING 2
        $rating4 = new Comment();
        $rating4->text = 'mhm';
        $rating4->user()->associate($user2);
        $rating4->entry()->associate($entry3);
        $rating4->save();


        // RATING 3
        $rating4 = new Comment();
        $rating4->text = 'totally!';
        $rating4->user()->associate($user1);
        $rating4->entry()->associate($entry3);
        $rating4->save();

        // RATING 4
        $rating4 = new Comment();
        $rating4->text = 'sounds good';
        $rating4->user()->associate($user1);
        $rating4->entry()->associate($entry3);
        $rating4->save();
    }
}
