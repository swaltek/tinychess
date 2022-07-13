import { useEffect, useState, useRef } from 'react';
import { Grommet, Page, PageContent, Box } from 'grommet';
import { Chess } from 'chess.js';
import Board from '../components/board';
import MoveList from '../components/movelist';
import Selector from '../components/pgn_selector';

const fetch_pgn = async () => {
  const res = await fetch('http://127.0.0.1:3000/pgn');
  console.log(res);
  const json = await res.json()
  console.log(json.pgn);
  return json.pgn
}

const Pager = () => {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const chess = useRef(null);

  useEffect( () => {
    if( chess.current !== null ) return;
    let chessInstance = new Chess();
    fetch_pgn().then( (pgn) => {
      const sucess = chessInstance.load_pgn(pgn);

      chess.current = chessInstance;
      const history = chessInstance.history();
      setHistory( history );
      setCurrent( history.length - 1 );

      console.log(sucess , '\n' , chess.current.ascii());
    });
  });

  const handleNextMove = () => {
    if( current < history.length - 1) {
      const newHistoryIndex = current + 1;
      setCurrent(newHistoryIndex);
      chess.current.move(history[newHistoryIndex])
    }
  }
  const handlePrevMove = () => {
    if( current > -1) {
      setCurrent(current - 1);
      chess.current.undo();
    }
  }

  const handleMoveClick = (moveIndex: number) => {
    console.log('moveClick', moveIndex);
    if( current > moveIndex) {
      for(let i = moveIndex; i < current; i++ ){
        chess.current.undo();
      }
      setCurrent(moveIndex);
    }
    if( current < moveIndex) {
      for(let newIndex = current + 1; newIndex <= moveIndex; newIndex++ ){
        console.log('newIndex', newIndex);
        chess.current.move(history[newIndex]);
      }
      setCurrent(moveIndex);
    }
  }
  const board = chess.current != null ? chess.current.board() : null;
  console.log("board", board);

  return (
    <Grommet plain cssVars={true}>
      <Page kind="wide">
        <PageContent>
          <h1>{`Welcome to tiny chess!`}</h1>
          <Selector/>
          <Box
            direction='row'
            justify='center'
          >
            <Board boardState={board} />
            <Box
              width='medium'
            >
              <MoveList
                history={history}
                current={current}
                onNextMove={ handleNextMove }
                onPrevMove={ handlePrevMove }
                onMoveClick={ handleMoveClick }
              />
            </Box>
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  )
}

export default Pager;
