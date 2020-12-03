import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
import _ from "lodash";
/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  // e.g., 
  // .2 0 .22
  // .2 0 .12
  // 0 .19 .08
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
        } 
        initialBoard.push(row)
      }
    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
    //checks using .every method-- that the cell exists as a falsy val for every row
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const deepCloneOldBoard = _.cloneDeep(oldBoard);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, deepCloneOldBoard);
      flipCell(y, x + 1, deepCloneOldBoard);
      flipCell(y, x - 1, deepCloneOldBoard);
      flipCell(y - 1, x, deepCloneOldBoard);
      flipCell(y + 1, x, deepCloneOldBoard);
      // TODO: return the copy
      return deepCloneOldBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

if (hasWon()) {
  return <div>"You've won!"</div>
}

  // TODO

  // make table board
// make table board: rows of Cell components-- otherwise Cell and Board can't `talk` to each other

let tblBoard = [];

for (let y = 0; y < nrows; y++) {
  let row = [];
  for (let x = 0; x < ncols; x++) {
    let coord = `${y}-${x}`; //adding coord vals-- they are split on `-`
    row.push(
      <Cell //adding cell component to each row generated
        key={coord} //key is coord-- smart since they don't change but are numeric
        isLit={board[y][x]} //isLit is the board val
        flipCellsAroundMe={() => flipCellsAround(coord)} //we flip the cells passing in the func
      />
    );
  }
  tblBoard.push(<tr key={y}>{row}</tr>); // //pushing each row created onto the table
}

return (
  <table className="Board">
    <tbody>{tblBoard}</tbody>
  </table>
);
}

Board.defaultProps = {
  nrows : 3,
  ncols : 3,
  chanceLightStartsOn: .25
}

export default Board;
