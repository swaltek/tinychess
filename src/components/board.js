import { Chess } from 'chess.js';

import Piece from './board/piece';
import './board/board.css';

const Board = ({ boardState }) => {
  const board = boardState || new Chess().board();

  let boardElements = [];
  let columnLabels = [];
  columnLabels.push(<th key="LabelCol"> </th>); // empty column where row labels will be
  for(let col = 0; col < 8; col++) {
    const colChar = String.fromCharCode( 'A'.charCodeAt(0) + col );
    columnLabels.push(<th key={`${colChar}-LabelCol`}>{ colChar }</th>);
  }
  boardElements.push( <tr key="colLabels">{ columnLabels }</tr> );

  for(let row = 0; row < 8; row++) {
    let rowElements = [];
    rowElements.push( <th key={`${ 8 - row }-LabelRow`}>{ 8 - row }</th> );
    for(let col = 0; col < 8; col++) {
      const square = board[row][col];
      const element = square
        ? <Piece
            key={square.square} 
            type={ square.color === 'w' ? square.type.toUpperCase() : square.type } />
        : <></>;
      rowElements.push(
        <td
          key={square ? square.square : row + ( 8 * col)}
          className={`square ${(col + row % 2) % 2 ? 'dark' : 'light'}` } >
          {element}
        </td>);
    }
    boardElements.push( <tr key={`${row}-Row`}>{ rowElements }</tr> );
  }

  return (
   <table className='board'><tbody>{ boardElements }</tbody></table>
  );
}

export default Board;
