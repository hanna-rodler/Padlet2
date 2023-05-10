<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function getUser($id) {
        $user = User::where('id',$id)->first();
        return $user != null ? response()->json($user, 200) :
            response()->json(null, 200);
    }
}
