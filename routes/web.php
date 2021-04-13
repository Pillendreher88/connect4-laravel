<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ConnectFourController;

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

Route::get('/', function () {
    return view('welcome');
});


Route::get('/connect4/{path?}', function () { return view('connect4');})->where('path', '.*');

Route::group([
  'prefix' => 'c4'

], function ($router) {

  Route::get('{room}', [ConnectFourController::class, 'getRoom']);
  Route::post('{room}/join', [ConnectFourController::class, 'joinRoom']);
  Route::post('{room}/move', [ConnectFourController::class, 'move']);
  Route::post('{room}/rematch', [ConnectFourController::class, 'createRematch']);
  Route::post('{room}/offerRematch', [ConnectFourController::class, 'offerRematch']);
  Route::post('{room}/declineRematch', [ConnectFourController::class, 'declineRematch']);
  Route::post('/addRoom', [ConnectFourController::class, 'addRoom']);
  Route::post('{room}/addMessage', [ConnectFourController::class, 'addMessage']);
 
});