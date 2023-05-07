<?php

namespace Database\Seeders;

use App\Models\Padlet;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PadletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // users
        $user1 = User::find(1);
        $user2 = User::find(2);

        // Padlet 1
        $padlet1 = new Padlet();
        $padlet1->name = 'My first padlet';
        $padlet1->isPublic = true;
        $padlet1->user()->associate($user1);
        $padlet1->save();

        // Padlet 2
        $padlet2 = new Padlet();
        $padlet2->name = 'Movies';
        $padlet2->isPublic = true;
        $padlet2->user()->associate($user2);
        $padlet2->save();

        // Padlet 3
        $padlet3 = new Padlet();
        $padlet3->name = 'My secret Padlet';
        $padlet3->isPublic = false;
        $padlet3->user()->associate($user1);
        $padlet3->save();

        /*DB::table('padlets')->insert([
            'name' => 'My first padlet',
            'public' => true,
            'user_id' => 1,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        DB::table('padlets')->insert([
            'name' => 'My second padlet',
            'public' => false,
            'user_id' => 1,
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);*/

    }
}
