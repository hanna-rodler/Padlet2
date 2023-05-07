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

Route::get('/ratingExists/{entryId}/{userId}', [RatingController::class, 'ratingExistsAPI']);

Route::post('/save', [PadletController::class, 'save']);
Route::post('/padlets/{id}/saveEntry', [EntryController::class, 'save']);
Route::post('/padlets/{id}/saveComment', [CommentController::class, 'save']);
Route::post('/padlets/{id}/saveRating', [RatingController::class, 'save']);
