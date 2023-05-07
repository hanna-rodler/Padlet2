<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Entry;
use App\Models\Padlet;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class PadletController extends Controller
{
    //
    public function publicList():JsonResponse {
        $publicPadlets = Padlet::where('isPublic', true)
            ->with('entries.comments', 'entries.ratings')
            ->get();
        return response()->json($publicPadlets, 200);
    }

    public function privateList(){
        $padlets = Padlet::with('entries.comments', 'entries.ratings')
            ->get();
        return response()->json($padlets, 200);
    }

    public function privateList2(){
        $userId = 2; // add userId as param to api.php
        $padlets = Padlet::with('entries.comments', 'entries.ratings')
            ->where('user_id', $userId)->get();
        return response()->json($padlets, 200);
    }

    public function detail($id) {
        $padlet = Padlet::where('id',$id)->with('entries.comments','entries.ratings')
            ->get();
        return response()->json($padlet, 200);
        //return view('padlets.detail', compact('padlet'));
    }

    // save Padlet
    public function save(Request $request) {
        //$request = $this->parseRequest($request)
        /*
        * use a transaction for saving model including relations
        * if one query fails, complete SQL statements will be rolled back
        */
        DB::beginTransaction();
        try {
            $padlet = Padlet::create($request->all());
            DB::commit();
            return response()->json($padlet, 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("saving padlet failed: ", $e->getMessage
            (), 420);
        }

    }

    private function parseReqeust(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

}
