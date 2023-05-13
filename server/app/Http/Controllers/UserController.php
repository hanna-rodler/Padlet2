<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Mockery\Exception;


class UserController extends Controller
{
    //
    public function getUser($id) {
        $user = User::where('id',$id)->first();
        return $user != null ? response()->json($user, 200) :
            response()->json(null, 200);
    }

    public function register(Request $request) {
        DB::beginTransaction();
        try {
            $user = User::create($request->all());
            DB::commit();
            return response()->json($user, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("Registering user failed: ",
                $e->getMessage(), 420);
        }
    }
}
