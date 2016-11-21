<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    //
    protected $fillable = ['name', 'game_id', 'user_id', 'description'];

    public function gameTitle()
    {
    	if(isset($this->game_id)){
    		$game = Game::find($this->game_id);
    		if(isset($game->title)){
    			return $game->title;
    		}
    	}
    	return null;
    }

    public function userAdded(){
    	if(isset($this->user_id)){
    		$user = User::find($this->user_id);
    		if(isset($user->name)){
    			return $user->name;
    		}
    	}
    }
}
