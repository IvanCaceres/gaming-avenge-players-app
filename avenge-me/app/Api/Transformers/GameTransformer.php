<?php

namespace Api\Transformers;

use App\Game;
use League\Fractal\TransformerAbstract;

class GameTransformer extends TransformerAbstract
{
	public function transform(Game $game)
	{
		return [
			'id' 	=> (int) $game->id,
			'title'  => $game->title,
			'thumb'	=> '/img/games/' . $game->thumb
		];
	}
}