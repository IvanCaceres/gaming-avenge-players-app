<?php

use Illuminate\Http\Request;

$api = app('Dingo\Api\Routing\Router');

use Api\Controllers;

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

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:api');


// Version 1 of our API
$api->version('v1', function ($api) {
	// Set our namespace for the underlying routes
	$api->group(['namespace' => 'Api\Controllers'], function ($api) {
		// Login route
		$api->post('login', 'AuthController@authenticate');
		$api->post('register', 'AuthController@register');
		$api->get('games', 'GamesController@index');
		$api->get('players', 'GamesController@getPlayers');
		$api->get('player/{id}', 'GamesController@showPlayer');
		// Dogs! All routes in here are protected and thus need a valid token
		//$api->group( [ 'protected' => true, 'middleware' => 'jwt.refresh' ], function ($api) {
		$api->group( [ 'middleware' => 'jwt.auth' ], function ($api) {
			$api->get('users/me', 'AuthController@me');
			$api->get('validate_token', 'AuthController@validateToken');
			$api->post('games', 'GamesController@store');
			$api->post('games/add_player', 'GamesController@addPlayer');
			$api->post('player/{id}', 'GamesController@updatePlayer');
			$api->delete('player/{id}', 'GamesController@destroyPlayer');

			// $api->get('dogs', 'DogsController@index');
			// $api->post('dogs', 'DogsController@store');
			// $api->get('dogs/{id}', 'DogsController@show');
			// $api->delete('dogs/{id}', 'DogsController@destroy');
			// $api->put('dogs/{id}', 'DogsController@update');
		});
	});
});