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
    public function run(){
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
            'firstname'=>'Lea',
            'lastname'=>'Bauer',
            'email'=>'test@bauer.com',
            'image'=>'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
            'password'=>bcrypt('testBauer'),
            'created_at'=>date("Y-m-d H:i:s"),
            'updated_at'=>date("Y-m-d H:i:s")
        ]);

        DB::table('users')->insert([
            'firstname'=>'Timo',
            'lastname'=>'Schneider',
            'email'=>'test@schneider.com',
            'image' => 'https://images.pexels.com/photos/3008355/pexels-photo-3008355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            'password'=>bcrypt('testSchneider'),
            'created_at'=>date("Y-m-d H:i:s"),
            'updated_at'=>date("Y-m-d H:i:s")
        ]);

        DB::table('users')->insert([
            'firstname'=>'Johanna',
            'lastname'=>'Fürst',
            'email'=>'test@fuerst.com',
            'image' => 'https://images.unsplash.com/photo-1606202376066-4bdc077c10b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&w=1000&q=80',
            'password'=>bcrypt('testFuerst'),
            'created_at'=>date("Y-m-d H:i:s"),
            'updated_at'=>date("Y-m-d H:i:s")
        ]);

        DB::table('users')->insert([
            'firstname'=>'Wilhelmine',
            'lastname'=>'Schröder',
            'email'=>'test@schroeder.com',
            'image'=>'https://www.warnermusic.de/uploads/media/800x/01/20471-Wilhelmine_Malli-57.jpg?v=1-4',
            'password'=>bcrypt('testSchroeder'),
            'created_at'=>date("Y-m-d H:i:s"),
            'updated_at'=>date("Y-m-d H:i:s")
        ]);

        DB::table('users')->insert([
            'firstname'=>'Anonymus',
            'lastname'=>'Bird',
            'email'=>'test@bird.com',
            'image' => 'https://live.staticflickr.com/2899/14418137058_8e27762192_z.jpg',
            'password'=>bcrypt('testBird')
        ]);
    }
}
