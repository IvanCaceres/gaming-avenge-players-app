<?php

namespace Api\Transformers;

use App\Player;
use League\Fractal\TransformerAbstract;

class PlayerTransformer extends TransformerAbstract
{
	public function transform(Player $player)
	{
		return [
			'id' 	=> (int) $player->id,
			'game_title' 	=> $player->gameTitle(),
			'game_id' 	=> (int) $player->game_id,
			'name'  => $player->name,
			'user_added' => $player->userAdded(),
			'added' => $player->created_at->toFormattedDateString(),
			'avenged' => (bool) $player->avenged,
			'description' => $player->description,
		];
	}
}