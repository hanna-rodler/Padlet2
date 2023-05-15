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
        $user4 = User::find(4);
        $user6 = User::find(6);
        $user7 = User::find(7);
        $padlet3 = Padlet::find(3);
        $padlet4 = Padlet::find(4);

        $right1 = new Right();
        $right1->user()->associate($user3);
        $right1->padlet()->associate($padlet4);
        $right1->isInvitationPending = true;
        $right1->save();

        $right2 = new Right();
        $right2->user()->associate($user4);
        $right2->padlet()->associate($padlet3);
        $right2->isInvitationPending = false;
        $right2->isInvitationAccepted = true;
        $right2->save();

        $right3 = new Right();
        $right3->user()->associate($user6);
        $right3->padlet()->associate($padlet4);
        $right3->permission = 'write';
        $right3->isInvitationPending = false;
        $right3->isInvitationAccepted = true;
        $right3->save();

        $right4 = new Right();
        $right4->user()->associate($user7);
        $right4->permission = 'create';
        $right4->padlet()->associate($padlet4);
        $right4->isInvitationPending = false;
        $right4->isInvitationAccepted = true;
        $right4->save();

        $right5 = new Right();
        $right5->user()->associate($user1);
        $right5->permission = 'delete';
        $right5->padlet()->associate($padlet4);
        $right5->isInvitationPending = false;
        $right5->isInvitationAccepted = true;
        $right5->save();
    }
}
