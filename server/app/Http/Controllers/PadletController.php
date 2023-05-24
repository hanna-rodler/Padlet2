<?php

namespace App\Http\Controllers;

use App\Models\Padlet;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;

class PadletController extends Controller
{

    private function parseRequest(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }
    //
    public function publicList():JsonResponse {
        $publicPadlets = Padlet::where('isPublic', true)
            ->with('entries.comments', 'entries.ratings', 'entries.user', 'user')
            ->get();
        return response()->json($publicPadlets, 200);
    }

    public function privateList($id){
        $padlets = Padlet::where('isPublic', false)->where('user_id', $id)
            ->with('entries.comments',
        'entries.ratings', 'user', 'entries.user')
            ->get();
        return response()->json($padlets, 200);
    }

    public function privateAndInvitedPadlets($userId) {
        $padlets = Padlet::where(function($query) use ($userId) {
            $query->where('user_id', $userId)->where('isPublic', false);
        })->orWhereExists(function($query) use ($userId) {
            $query->select(DB::raw(1))
                ->from('rights')
                ->where('rights.user_id', $userId)
                ->where('rights.isInvitationAccepted', true)
                ->whereRaw('rights.padlet_id = padlets.id');
        })->with('entries.comments', 'entries.ratings', 'user', 'entries.user')
          ->get();
        return $padlets !== null ? response()->json($padlets, 200) :
            response()->json(null, 200);
    }

    public function privateList2(){
        $userId = 2; // add userId as param to api.php
        $padlets = Padlet::with('entries.comments', 'entries.ratings', 'user')
            ->where('user_id', $userId)->get();
        return response()->json($padlets, 200);
    }

    public function detail($id) {
        $padlet = Padlet::where('id',$id)->with(
            'entries.comments.user','entries.ratings.user', 'entries.user', 'user', 'rights.user')
            ->first();
        return $padlet != null ? response()->json($padlet, 200) : response()
            ->json(null, 200);
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

    public function update(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try{
            $padlet = Padlet::where('id',$id)->first();
            if($padlet!=null){
                //$request=$this->parseRequest($request);
                $padlet->update($request->all());
                $padlet->rights()->delete();

                $padlet->save();

                DB::commit();
                $padlet1=Padlet::where('id', $id)->first();
                // return a vaild http response
                return response()->json($padlet1, 201);
            } else {
                return response()->json("Padlet not found",
                    420);
            }
        }
        catch(\Exception $e){
            // rollback all queries
            DB::rollBack();
            return response()->json("updating padlet failed: "
                .$e->getMessage(),
                420);
        }
    }

    public function delete($id) {
        $padlet = Padlet::where('id', $id)->first();
        if($padlet != null){
            $padlet->delete();
            return response()->json('padlet ('.$id.') successfully deleted',
                200);
        }
        else
            return response()->json('padlet could not be deleted - it does not exist', 422);
    }


    private function parseReqeust(Request $request) : Request {
        // get date and convert it - its in ISO 8601, e.g. "2018-01-01T23:00:00.000Z"
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

}
