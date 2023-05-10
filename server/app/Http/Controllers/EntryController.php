<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Exception;
use Illuminate\Http\JsonResponse;

class EntryController extends Controller
{
    //
    public function save(Request $request){
        /*+
        * use a transaction for saving model including relations
        * if one query fails, complete SQL statements will be rolled back
        */
        /*echo '<pre>';
        var_dump($request);
        echo '</pre>';
        echo '<pre>';
        var_dump($id);
        echo '</pre>';*/
        DB::beginTransaction();
        try {
            $entry = Entry::create($request->all());
            DB::commit();
            return response()->json($entry, 201);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json("saving entry failed: ", $e->getMessage
            (), 420);
        }
    }

    public function update(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try{
            $entry = Entry::where('id',$id)->first();
            if($entry!=null){
                $entry->update($request->all());
                $entry->save();

                DB::commit();
                $entry1=Entry::where('id', $id)->first();
                return response()->json($entry1, 201);
            } else {
                return response()->json("Entry not found",
                    420);
            }
        }
        catch(\Exception $e){
            // rollback all queries
            DB::rollBack();
            return response()->json("updating entry failed: "
                .$e->getMessage(),
                420);
        }
    }

    public function delete($id) {
        $entry = Entry::where('id', $id)->first();
        if($entry != null){
            $entry->delete();
            return response()->json('entry ('.$id.') successfully deleted',
                200);
        }
        else
            return response()->json('entry could not be deleted - it does not exist', 422);
    }

    public function getSingle($id) {
        $entry = Entry::with('comments', 'ratings')->where('id', $id)->first();
        return $entry != null ? response()->json($entry, 200) : response()
            ->json(null, 200);
    }
}
