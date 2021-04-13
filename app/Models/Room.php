<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
  protected $guarded = [];

  protected $attributes = [

    'playersTurn' => 1,
    'started' => false,
    'gameObject' => "000000000000000000000000000000000000000000",
    'winner' => 0,
];

  public function messages() {
    return $this ->hasMany(Message::class);
}

  public function isPlayer($sessionId){

    return ($this->player1 === $sessionId || $this->player2 === $sessionId);
  }

  public function getPlayerNumber($sessionId){

    if($this->player1 === $sessionId) return 1;
    if($this->player2 === $sessionId) return 2;

    return 0;
  }

  public function hasTurn($sessionId){

    $id = $this ->playersTurn === 1 ? $this ->player1 : $this ->player2;
    return ($id === $sessionId);
  }
  public function checkRows(){

    for ($i = 0; $i < 6; $i++) {
      $start = 41 - $i * 7;
      $last = $this->gameObject[$start];
      $discs  = array($start);
      for ($j = 1; $j < 7; $j++) {
        $index = $start - $j;
        if($this->gameObject[$index] === $last && $last != 0) {
          array_push($discs, $index);
        }
        else {
          $discs  = array($index);
        }
        $last = $this->gameObject[$index];
        if(count($discs) > 3) {
          $this->winner = (int)$last;
          return $discs;
        }
    }
   
  }
    return false;
  }
  public function checkColumns(){

  
    for ($i = 0; $i < 7; $i++) {
      $start = 41 - $i;
      $last = $this->gameObject[$start];
      $discs  = array($start);

      for ($j = 1; $j < 6; $j++) {

        $index= $start - 7 * $j;
        if($this->gameObject[$index] == 0)break;

        if($this->gameObject[$index] === $last) {
          array_push($discs, $index);
        }
        else {
          $discs  = array($index);
        }
        $last = $this->gameObject[$index];
        if(count($discs) > 3) {
          $this->winner = (int)$last;
          return $discs;
        }
    }
  }
    return false;
  }

  public function checkDiags(){

    $startPoints = array(0,1,2,3,7,14);

    foreach ($startPoints as &$startPoint) {
      for ($i = 0; $i < 7; $i++) {
        $index = $startPoint;
        $discs  = array($startPoint);
        $last = $this->gameObject[$startPoint];
        while  ($index + 8 < 42) {
          $index +=8;
          if($this->gameObject[$index] === $last && $last != 0) {
            array_push($discs, $index);
          }
          else {
            $discs  = array($index);
          }
          $last = $this->gameObject[$index];
          if(count($discs) > 3) {
            $this->winner = (int)$last;
            return $discs;
          }
      }
    }   
  }

  $startPoints2 = array(35,36,37,38,28,21);

  foreach ($startPoints2 as &$startPoint) {
    for ($i = 0; $i < 7; $i++) {
      $index = $startPoint;
      $discs  = array($startPoint);
      $last = $this->gameObject[$startPoint];
      while  ($index > -1) {
        $index -=6;
        if($this->gameObject[$index] === $last && $last != 0) {
          array_push($discs, $index);
        }
        else {
          $length = 1;
        }
        $last = $this->gameObject[$index];
        if(count($discs) > 3) {
          $this->winner = (int)$last;
          return $discs;
        }
      }
    }   
  }

  return false;
  }

  public function isOver(){

    $result= $this ->checkColumns();
    if(!$result) {
      $result = $this ->checkRows();
    }
     if(!$result) {
      $result = $this ->checkDiags();
    } 
    return $result;
  }

  public function addMove($index){

    if($this->gameObject[$index] === "0") {
      $copy = $this->gameObject;
      $copy[$index] = $this ->playersTurn;
      $this->gameObject = $copy;
      $this ->playersTurn  = $this ->playersTurn === 1 ? 2 : 1;
    }
    else if($index -7 > -1){
      $this->addMove($index -7);
    }
}
}
