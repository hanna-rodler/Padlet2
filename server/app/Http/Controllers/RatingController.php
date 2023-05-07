<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class RatingController extends Controller
{
    //
    public function save(Request $request):JsonResponse{
        DB::beginTransaction();
        try {
            //$userId = 1;
            $entry = Rating::create($request->all());
            return response()->json($entry, 201);
            // TODO: make sure rating doesn't
            // (now entry_id and user_id = primary keys. Will throw error at
            // duplicate but should already not be allowed to click it in
            // the UI
            //if(!$this->ratingExists(5, $userId)){
            //    echo '<pre>';
            //    var_dump($request);
            //    echo '<pre>';
            //
            //    DB::commit();
            //    return response()->json($entry, 201);
            //} else {
            //    return response()->json("Rating already exists",
            //        405);
            //}
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("saving comment failed: ", $e->getMessage
            (), 420);
        }
    }


    public function ratingExistsAPI($entryId, $userId):JsonResponse{
        $rating = Rating::where('entry_id', $entryId)->where('user_id',
            $userId)->get();
        return $rating != null ? response()->json($rating, 200): response()
            ->json(null, 200);
    }

    public function ratingExists($entryId, $userId):bool{
        $rating = Rating::where('entry_id', $entryId)->where('user_id',
            $userId)->get();
        return !($rating==null);
    }
}
