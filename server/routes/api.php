<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\PadletController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\RightController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

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


Route::post('/auth/login', [AuthController::class, 'login']);

//Route::get('/', [PadletController::class,  'publicList']);
// Padlets
Route::get('/publicPadlets', [PadletController::class,  'publicList']);
Route::get('/padlets/{id}', [PadletController::class, 'detail']);
Route::post('/padlets', [PadletController::class, 'save']);

// Entries
Route::get('/entries/{id}', [EntryController::class, 'getSingle']);

// User
Route::get('/users/{id}', [UserController::class, 'getUser']);
Route::get('/users/mail/{mail}', [UserController::class, 'getUserByMail']);
Route::post('/register', [UserController::class, 'register']);


Route::group(['middleware'=>['api', 'auth.jwt']], function() {
    // Authorization
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Padlets
    Route::get('/padlets/private/{id}', [PadletController::class, 'privateList']);
    Route::get('/privateAndInvited/{userId}', [PadletController::class, 'privateAndInvitedPadlets']);
    Route::put('/padlets/{id}', [PadletController::class, 'update']);
    Route::delete('/padlets/{id}', [PadletController::class, 'delete']);

    // Entres
    Route::put('/entries/{id}', [EntryController::class, 'update']);
    Route::delete('/entries/{id}', [EntryController::class, 'delete']);
    Route::post('/entries', [EntryController::class, 'save']);

    // Rights
    Route::get('/pendingInvitations/{userId}', [RightController::class, 'pendingInvitations']);
    Route::get('/nonPendingInvitations/{userId}', [RightController::class, 'nonPendingInvitations']);
    Route::put('/acceptInvitation/{userId}/{padletId}', [RightController::class,
        'acceptInvitation']);
    Route::put('/declineInvitation/{userId}/{padletId}', [RightController::class,
        'declineInvitation']);
    Route::put('/invitations/{userId}/{padletId}', [RightController::class, 'updateRight']);
    Route::post('/invite', [RightController::class, 'invite']);
    Route::delete('/invite', [RightController::class, 'deleteInvitation']);

    // Ratings
    Route::get('/ratings/{entryId}/{userId}', [RatingController::class, 'ratingExists']);
    Route::post('/ratings', [RatingController::class, 'save']);

    // Comments
    Route::post('/comments/{id}', [CommentController::class, 'save']);
});
