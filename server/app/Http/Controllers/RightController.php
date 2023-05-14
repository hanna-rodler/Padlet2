<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Collection;
use Mockery\Exception;
use App\Models\Right;



class RightController extends Controller
{
    public function invite(Request $request): JsonResponse {
        DB::beginTransaction();
        try {
            $right = Right::create($request->all());
            //var_dump($right);
            DB::commit();
            return response()->json($right, 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("saving padlet failed: ", $e->getMessage
            (), 420);
        }
    }

    public function userInvitations(number | string $userId): JsonResponse {
        $rights = Right::where('user_id', $userId)->where('isInvitationPending', false)
            ->with('padlet', 'user')->get();
        return $rights !== null ? response()->json($rights, 200) : response
        ()->json(null, 200);
    }
}
