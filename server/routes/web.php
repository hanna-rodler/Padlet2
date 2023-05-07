<?php

use App\Http\Controllers\EntryController;
use App\Http\Controllers\RatingController;
use App\Models\Padlet;
use \App\Http\Controllers\PadletController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::get('/', [PadletController::class,  'publicList']);
Route::get('/publicPadlets', [PadletController::class,  'publicList']);

// TODO: get all public padlets and private padlets from specific user
Route::get('/padlets', [PadletController::class, 'privateList']);

Route::get('/padlets/{id}', [PadletController::class, 'detail']);
Route::get('/padlets/{id}/saveEntry', [EntryController::class, 'save']);
Route::get('/padlets/saveRating', [RatingController::class, 'save']);

