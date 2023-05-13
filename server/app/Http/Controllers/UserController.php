<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Mockery\Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;


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
            $user->password = Hash::make($user->password);
            $user->save();
            DB::commit();
            return response()->json($user, 201);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("Registering user failed: ",
                $e->getMessage(), 420);
        }
    }
}
