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

        // users
        $user1 = User::find(1);
        $user2 = User::find(2);

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
    }
}
