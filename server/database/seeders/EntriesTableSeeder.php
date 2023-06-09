<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\Padlet;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EntriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // padlets
        $padlet1 = Padlet::find(1);
        $padlet2 = Padlet::find(2);
        $padlet3 = Padlet::find(3);
        $padlet4 = Padlet::find(4);

        // users
        $user1 = User::find(1);
        $user2 = User::find(2);
        $user4 = User::find(4);
        $user6 = User::find(6);
        $user7 = User::find(7);

        // ENTRY 1
        $entry1 = new Entry();
        $entry1->title = "Title for my first Padlet ever";
        $entry1->text = 'I am excited to be part of this first Padlet ever';
        $entry1->padlet()->associate($padlet1);
        $entry1->user()->associate($user1);
        $entry1->save();

        // ENTRY 2
        $entry2 = new Entry();
        $entry2->title = "Title for my second Padlet";
        $entry2->text = 'This is my second entry in the first Padlet';
        $entry2->padlet()->associate($padlet1);
        $entry2->user()->associate($user1);
        $entry2->save();


        // ENTRY 3 for Padlet 2
        $entry3 = new Entry();
        $entry3->title="Very Secret";
        $entry3->text = 'Secret Entry for Secret Padlet';
        $entry3->padlet()->associate($padlet3);
        $entry3->user()->associate($user1);
        $entry3->save();

        $entry4 = new Entry();
        $entry4->title="Picnic in the park";
        $entry4->text="Enjoy a beautiful day outside with your significant other by having a picnic in a nearby park. Bring a blanket, your favorite snacks, and maybe even some board games to make the most of your time together.";
        $entry4->padlet()->associate($padlet4);
        $entry4->user()->associate($user4);
        $entry4->save();

        $entry5 = new Entry();
        $entry5->title="go swimming";
        $entry5->text="In the lake or at a nearby pool";
        $entry5->padlet()->associate($padlet4);
        $entry5->user()->associate($user7);
        $entry5->save();

        $entry6 = new Entry();
        $entry6->title="Wine and paint night";
        $entry6->text="Take a class together where you can enjoy a glass of wine and learn how to paint. This is a great way to bond over a new experience and create something special to remember your date.";
        $entry6->padlet()->associate($padlet4);
        $entry6->user()->associate($user6);
        $entry6->save();
    }
}
