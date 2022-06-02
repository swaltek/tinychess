import { useEffect, useState, useRef } from 'react';
import { Grommet, Page, PageContent, Box } from 'grommet';
import { Chess } from 'chess.js';
import Board from '../components/board';
import MoveList from '../components/movelist';

const PGN_SAMPLE = [
  '[Event "F/S Return Match"]',
  '[Site "Belgrade, Serbia JUG"]',
  '[Date "1992.11.04"]',
  '[Round "29"]',
  '[White "Fischer, Robert J."]',
  '[Black "Spassky, Boris V."]',
  '[Result "1/2-1/2"]',
  '',
  '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 {This opening is called the Ruy Lopez.}',
  '4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7',
  '11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5',
  'Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6',
  '23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5',
  'hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5',
  '35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6',
  'Nf2 42. g4 Bd3 43. Re6 1/2-1/2',
];
const PGN_SAMPLE_2 = [
    '[Event "Casual Game"]',
    '[Site "Berlin GER"]',
    '[Date "1852.??.??"]',
    '[EventDate "?"]',
    '[Round "?"]',
    '[Result "1-0"]',
    '[White "Adolf Anderssen"]',
    '[Black "Jean Dufresne"]',
    '[ECO "C52"]',
    '[WhiteElo "?"]',
    '[BlackElo "?"]',
    '[PlyCount "47"]',
    '',
    '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
    'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
    'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
    'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
    '23.Bd7+ Kf8 24.Bxe7# 1-0'
];

const Pager = () => {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const chess = useRef(null);

  useEffect( () => {
    if( chess.current !== null ) return;
    let chessInstance = new Chess();
    const sucess = chessInstance.load_pgn(PGN_SAMPLE_2.join('\n'));

    chess.current = chessInstance;
    const history = chessInstance.history();
    setHistory( history );
    setCurrent( history.length - 1 );

    console.log(sucess , '\n' , chess.current.ascii());
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