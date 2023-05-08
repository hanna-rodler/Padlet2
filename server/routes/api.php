<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\PadletController;
use App\Http\Controllers\RatingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', [PadletController::class,  'publicList']);
Route::get('/publicPadlets', [PadletController::class,  'publicList']);

// TODO: get all public padlets and private padlets from specific user
Route::get('/padlets', [PadletController::class, 'privateList2']);
Route::get('/padlets/{id}', [PadletController::class, 'detail']);
Route::post('/padlets', [PadletController::class, 'save']);
Route::put('/padlets/{id}', [PadletController::class, 'update']);
Route::delete('/padlets/{id}', [PadletController::class, 'delete']);

Route::get('/ratingExists/{entryId}/{userId}', [RatingController::class, 'ratingExistsAPI']);

Route::post('/entries', [EntryController::class, 'save']);
Route::put('/entries/{id}', [EntryController::class, 'update']);


Route::post('/comments/{id}', [CommentController::class, 'save']);
Route::post('/ratings/{id}', [RatingController::class, 'save']);


Route::delete('/entries/{id}', [EntryController::class, 'delete']);
