<?php

namespace Api\Requests;

use Dingo\Api\Http\FormRequest;

class GameRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
			'title' => 'required|max:255',
			'files' => 'required'
		];
	}
}