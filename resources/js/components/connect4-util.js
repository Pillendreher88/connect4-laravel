
const checkRows = (board) => {


  let result = false;
  for (let i = 0; i < 7; i++) {
    result = checkRow(board,i);
    if(result) break;
  }
  return result;
}

const checkRow  = (board, row) => {

  const start = 48 - row * 7;
  let last = board[start];
  let discs  = [start];
  for (let j = 1; j < 7; j++) {
    let index = start - j;
    if(board[index] === last && last != 0) {
      discs.push(index);
    }
    else {
      discs  = [index];
    }
    last = board[index];
    if(discs.length > 3) {
      return discs;
      }
  }
 

  return false;
}

const checkColumns = (board) => {

  let result = false;

  for (let i = 0; i < 7; i++) {
    result = checkColumn(board, i);
    if( result) break;
  }

  return result;
}

const checkColumn = (board, column) => {

    const start = 42 + column;
    let last = board[start];
    let discs  = [start];

    for (let j = 1; j < 7; j++) {

      let index= start - 7 * j;
      if(board[index] == 0)break;

      if(board[index] === last) {
        discs.push(index);
      }
      else {
        discs  = [index];
      }
      last = board[index];
      if(discs.length > 3) {
        return discs;
      }
  }

  return false;
}

const checkDiags = (board) => {

  const startPoints = [0,1,2,3,7,14,21];

  for(let j = 0; j < startPoints.length; j++)  {

    const startPoint = startPoints[j];
    for (let i = 0; i < 7; i++) {

      let index = startPoint;
      let discs  = [startPoint];
      let last = board[startPoint];

      while  (index + 8 < 49) {
        index +=8;
        if(board[index] === last && last != 0) {
          discs.push(index);
        }
        else {
          discs  = [index];
        }
        last = board[index];
        if(discs.length > 3) {
          
          return discs;
        }
    }
  }   
};

const startPoints2 = [42,43,44,45,35,28,21];

for(let j = 0; j < startPoints2.length; j++)  {
  const startPoint = startPoints2[j];

  for (let i = 0; i < 7; i++) {
    let index = startPoint;
    let discs  = [startPoint];
    let last = board[startPoint];
    while  (index > -1) {
      index -=6;
      if(board[index] === last && last != 0) {
        discs.push(index);
      }
      else {
        discs  = [index];
      }
      last = board[index];
      if(discs.length > 3) {
        return discs;
      }
    }
  }   
};

return false;
}

const checkBoard = (board, column, row) => {

  let result= column !== undefined ? checkColumn(board, column) : checkColumn(board);
  if(!result) {
    result = row !== undefined ? checkRow(board, row) : checkRows(board);
  }
   if(!result) {
    result = checkDiags(board);
  } 

  return result;
}

export default checkBoard;