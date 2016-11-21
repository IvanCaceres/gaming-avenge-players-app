<?php

namespace Api\Requests;

use Dingo\Api\Http\FormRequest;

class PlayerRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
			'name' => 'required|max:255',
			'game_id' => 'required|numeric'
		];
	}
}