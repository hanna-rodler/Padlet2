<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Entry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;
use Symfony\Component\HttpFoundation\JsonResponse;

class CommentController extends Controller
{
    //
    public function save($id, Request $request): JsonResponse{
        DB::beginTransaction();
        try {
            $entry = Comment::create($request->all());
            DB::commit();
            return response()->json($entry, 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("saving comment failed: ", $e->getMessage
            (), 420);
        }
    }

}
