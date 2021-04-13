<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\NewRoom;
use App\Events\MessageSent;
use App\Events\MoveSent;
use App\Events\RematchAccepted;
use App\Events\RematchOffered;
use App\Events\RematchDeclined;
use App\Models\User;
use App\Models\Room;
use App\Models\Message;

class ConnectFourController extends Controller
{
  public function addRoom(Request $request)
  {

    $room = new Room;
    $player1 = $request->session()->getId();
    $room->player1 = $player1;
    $room->save();
    broadcast(new NewRoom($room));

    return response()->json($room, 200);
  }

  public function offerRematch(Request $request, $room)
  {
    $room = Room::find($room);
    $player = $request->session()->getId();

    if($room -> isPlayer($player) && $room->winner) {
      broadcast(new RematchOffered($room->getPlayerNumber($player),(string)$room->id));

      return response()->json("Offer sent", 200);
    }
    return response()->json("Game not over or Player not authorized", 200);
  }

  public function declineRematch(Request $request, $room)
  {
    $room = Room::find($room);
    $player = $request->session()->getId();

    if($room -> isPlayer($player) && $room->winner) {
      broadcast(new RematchDeclined((string)$room->id));

      return response()->json("Decline sent", 200);
    }
    return response()->json("Game not over or Player not authorized", 200);
  }

  public function createRematch(Request $request, $room)
  {
    $room = Room::find($room);
    $rematch = new Room;
    $rematch->player1 = $room->player2;
    $rematch->player2 = $room->player1;
    $rematch->started = true;
    $rematch->save();
    broadcast(new RematchAccepted($rematch, (string)$room->id));

    return response()->json($room, 200);
  }

  public function addMessage(Request $request, $room)
  {
    $message = $request["message"];
    $room = Room::find($room);
    $player = $request->session()->getId();
    if($room -> isPlayer($player)) {
      $messageNew = new Message(['message' =>  $message, 'author' =>  $room->getPlayerNumber($player)]);
      $room->messages()->save($messageNew);
      broadcast(new MessageSent($messageNew,(string)$room->id)); 
      return ['status' => 'Message Sent!'];
    }
  }

  public function move(Request $request, $room)
  {
  
    $column = $request["move"];
    $room = Room::find($room);

    if($room->winner) {
      return response()->json( "Game is already over.", 200);
    }

    if(!$room->started) {
      return response()->json( "Game has not started yet.", 200);
    }

    $player = $request->session()->getId();
    if($room -> isPlayer($player) && $room -> hasTurn($player)) {
      $room ->addMove(35 + $column);
      $winningDiscs = $room->isOver();
      $room->save();
      $result = $room->toArray();
      if($winningDiscs)
      {
        $result["winningDiscs"] = $winningDiscs;
      }
      event(new MoveSent($result, (string)$room->id));  
      return ['status' => 'Message Sent!'];
    }

    else return ['status' => 'Not Player in this game!'];
  }

  public function getRoom(Request $request, Room $room)
  {

    $sessionId = $request->session()->getId();
    $player = $room->getPlayerNumber($sessionId);
    $messages = $room ->messages;

    return response()->json(array("messages" => $messages,"player" => $player, "room" => $room));
  }

  public function joinRoom(Request $request, Room $room)
  {
    
    $sessionId = $request->session()->getId();

    if(isset($room->player2) || $room->player1 === $sessionId) {
      return response()->json(array("message" => "Already two players in the game.", 403 ));
    }

    $room ->player2 = $sessionId;
    $room ->started = true;
    $room ->save();
    $player = 2;
    broadcast(new MoveSent($room,  strval($room->id)));  

      return response()->json(array("message" => "successfully joined the game.","player" => $player,), 200);
  }
}


