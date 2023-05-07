<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use DateTime;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        /*DB::table('users')->insert([
            'firstname' => 'Hanna',
            'lastname' => 'Rodler',
            'email' => 'test@rodler.com',
            'password' => base64_encode('testRodler'),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        DB::table('users')->insert([
            'firstname' => 'Samuel',
            'lastname' => 'Solka',
            'email' => 'test@solka.com',
            'password' => base64_encode('testSolka'),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);*/

        DB::table('users')->insert([
            'firstname' => 'Lea',
            'lastname' => 'Bauer',
            'email' => 'test@bauer.com',
            'password' => base64_encode('testBauer'),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);

        DB::table('users')->insert([
            'firstname' => 'Timo',
            'lastname' => 'Schneider',
            'email' => 'test@schneider.com',
            'password' => base64_encode('testSchneider'),
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")
        ]);
    }
}
