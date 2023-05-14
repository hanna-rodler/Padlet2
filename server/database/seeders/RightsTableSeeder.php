<?php

namespace Database\Seeders;

use App\Models\Padlet;
use App\Models\Right;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RightsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = User::find(1);
        $user3 = User::find(3);
        $padlet3 = Padlet::find(3);

        $right1 = new Right();
        $right1->user()->associate($user3);
        $right1->padlet()->associate($padlet3);
        $right1->isInvitationPending = true;
        $right1->save();

        //
    }
}
