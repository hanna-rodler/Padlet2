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
            DB::commit();
            return response()->json($right, 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("saving padlet failed: ", $e->getMessage
            (), 420);
        }
    }

    public function pendingInvitations(number | string $userId): JsonResponse {
        $rights = Right::where('user_id', $userId)->where('isInvitationPending', true)
            ->with('padlet', 'padlet.user')->get();
        return $rights !== null ? response()->json($rights, 200) : response
        ()->json(null, 200);
    }

    public function nonPendingInvitations(number | string $userId):
    JsonResponse {
        $rights = Right::where('user_id', $userId)->where('isInvitationPending', false)
            ->with('padlet', 'padlet.user')->get();
        return $rights !== null ? response()->json($rights, 200) : response
        ()->json(null, 200);
    }

    public function updateRight(Request $request): JsonResponse {
        DB::beginTransaction();
        try {
            $right = Right::where('padlet_id', 3)->where('user_id', 3)
                ->first();
            if($right != null) {
                $right->update($request->all());
                echo 'gonna try to save';
                $right->save();
                echo 'saved';

                DB::commit();
                $updatedRight = Right::where('padlet_id', 3)
                    ->where('user_id', 3)
                    ->first();
                return response()->json($updatedRight, 201);
            } else {
                return response()->json("Right not found", 420);
            }
        } catch(\Exception $e) {
            DB::rollBack();
            return response()->json("Error: Updating right failed: "
                .$e->getMessage
                (), 420);
        }
    }

    public function acceptInvitation($userId, $padletId): JsonResponse {
        DB::beginTransaction();
        try {
            Right::where('padlet_id', $padletId)->where('user_id', $userId)
                ->update(['isInvitationPending' => false, 'isInvitationAccepted' => true]);
            DB::commit();
            $updatedRight = Right::where('padlet_id', $padletId)
                ->where('user_id', $userId)
                ->first();
            return response()->json($updatedRight, 201);
        } catch(\Exception $e) {
            DB::rollBack();
            return response()->json("Error: Updating right failed: "
                .$e->getMessage
                (), 420);
        }
    }

    public function declineInvitation($userId, $padletId): JsonResponse {
        DB::beginTransaction();
        try {
            Right::where('padlet_id', $padletId)->where('user_id', $userId)
                ->update(['isInvitationPending' => false, 'isInvitationAccepted' => false]);
            DB::commit();
            $updatedRight = Right::where('padlet_id', $padletId)
                ->where('user_id', $userId)
                ->first();
            return response()->json($updatedRight, 201);
        } catch(\Exception $e) {
            DB::rollBack();
            return response()->json("Error: Updating right failed: "
                .$e->getMessage
                (), 420);
        }
    }
}
