<?php

namespace Api\Controllers;

use App\Game;
use App\Player;
use App\Http\Requests;
use Illuminate\Http\Request;
use Api\Requests\GameRequest;
use Api\Requests\PlayerRequest;
use Api\Transformers\GameTransformer;
use Api\Transformers\PlayerTransformer;
use Illuminate\Support\Facades\Auth;
use JWTAuth;
use Symfony\Component\HttpKernel\Exception;

/**
 * @Resource('Games', uri='/api/games')
 */
class GamesController extends BaseController
{

    public function __construct() 
    {
    }

    /**
     * Show all games
     *
     * Get a JSON representation of all the games
     * 
     * @Get('/')
     */
    public function index()
    {
        return $this->collection(Game::all(), new GameTransformer);
    }

    /**
     * Show all games
     *
     * Get a JSON representation of all the games
     * 
     * @Get('/')
     */
    public function getPlayers()
    {
        return $this->collection(Player::all(), new PlayerTransformer);
    }

    /**
     * Store a new game in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GameRequest $request)
    {   
        $user = JWTAuth::parseToken()->toUser();

        if(!isset($user))
            throw new Exception\AccessDeniedHttpException('Must be logged in.');

        if($user->role != 'administrator')
            throw new Exception\AccessDeniedHttpException('Must be an admin.');

            if(isset($_FILES["files"]["type"]))
            {
            $validextensions = array("jpeg", "jpg", "png");
            $temporary = explode(".", $_FILES["files"]["name"]);
            $file_extension = end($temporary);
            if ((($_FILES["files"]["type"] == "image/png") || ($_FILES["files"]["type"] == "image/jpg") || ($_FILES["files"]["type"] == "image/jpeg")
            ) && ($_FILES["files"]["size"] < 1000000)//Approx. 100kb files can be uploaded.
            && in_array($file_extension, $validextensions)) {
                if ($_FILES["files"]["error"] > 0)
                {
                    echo "Return Code: " . $_FILES["files"]["error"] . "<br/><br/>";
                }
                else
                {

                    //delete old avatar if exists
                    // if(isset($club["PlayerClub"]["avatar"])){
                    //     if(file_exists("upload/clubs/".$club["PlayerClub"]["id"]."/".$club["PlayerClub"]["avatar"])){
                    //         unlink("upload/clubs/".$club["PlayerClub"]["id"]."/".$club["PlayerClub"]["avatar"]);
                    //     }
                    // }


                    $sourcePath = $_FILES['files']['tmp_name']; // Storing source path of the file in a variable
                    $targetPath = "img/games/".$_FILES['files']['name']; // Target path where file is to be stored

                    //create clubs subdirectory if non-existent
                    // if(!is_dir("upload/clubs/".$club["PlayerClub"]["id"]."/"))
                        // mkdir("upload/clubs/".$club["PlayerClub"]["id"]."/", 0777);

                    move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file

                    // $this->PlayerClub->set('id',$club["PlayerClub"]["id"]);
                    // $this->PlayerClub->set('avatar', $_FILES['files']['name']);
                    // $this->PlayerClub->save();
                    
                    return $this->item(Game::create(['title' => $request->input('title'), 'thumb' => $_FILES['files']['name'], 'user_id' => $user->id]), new GameTransformer);


                    //upload was successful return img url
                    // return json_encode($_FILES['files']['name']);
                }
            } else
                {
                    throw new Exception\BadRequestHttpException("Invalid image file size or type");
                    // $this->ajaxErrorResponse("Invalid file Size or Type", 400);
                }
            }
    }

    /**
     * Store a new player in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addPlayer(PlayerRequest $request)
    {
        $user = JWTAuth::parseToken()->toUser();

        if(!isset($user))
            throw new Exception\AccessDeniedHttpException('Must be logged in.');

        return $this->item(Player::create(['name' => $request->input('name'), 'game_id' => $request->input('game_id'), 'user_id' => $user->id, 'description' => $request->input('description')]), new PlayerTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->item(Dog::findOrFail($id), new DogTransformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showPlayer($id)
    {
        return $this->item(Player::findOrFail($id), new PlayerTransformer);
    }

    /**
     * Update the player in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function updatePlayer(PlayerRequest $request, $id)
    {   
        $user = JWTAuth::parseToken()->toUser();

        if(!isset($user))
            throw new Exception\AccessDeniedHttpException('Must be logged in.');
        
        $player = Player::findOrFail($id);
        $player->avenged = true;
        $player->save();
        return $this->item($player, new PlayerTransformer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Dog::destroy($id);
    }
}