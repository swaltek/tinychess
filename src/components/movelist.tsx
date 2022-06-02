import { Box, Button } from 'grommet';

const MoveList = (
  {history, current,
    onNextMove = () => {},
    onPrevMove = () => {},
    onMoveClick = (_: number ) => {}
  }) => {
  const historyRows = () => {
    let rows = [];
    for(let t = 0, i = 0; i < history.length; t++, i += 2){
      let turns = [];

      const isLightMoveCurrent = current === i;
      const lightMoveInner = history[i];
      turns.push(
        <span
          style={{
            backgroundColor: isLightMoveCurrent ? 'var(--dark-6)' : 'inherit',
          }}
        >
          <Button onClick={() => onMoveClick(i)}> {lightMoveInner} </ Button>
        </span>);

      turns.push(' ');

      const isDarkMoveCurrent = current === i + 1;
      const darkMoveInner = history[i + 1] || null;
      turns.push(
        <span
          style={{
            backgroundColor: isDarkMoveCurrent ? 'var(--dark-6)' : 'inherit',
          }}
        >
          <Button onClick={() => onMoveClick(i + 1)}> {darkMoveInner} </ Button>
        </span>);

      const containsCurrent = isLightMoveCurrent || isDarkMoveCurrent;
      rows.push(
              <span
                key={`turn-${i}`}
                style={{
                  display: 'inline-block',
                  whiteSpace: 'pre',
                  backgroundColor: containsCurrent ? 'var(--light-4)' : 'white',
                }}
              >
               <span style={{color: 'var(--dark-6)'}}>{ Math.ceil((i + 1) / 2) }. </span>{turns}
              </span>
          );
    }
    return <p>{rows}</p>;
  }

  return (
    <Box flex='grow'>
      <h1> Moves </h1>
      <Box
        flex='grow'
      >
        { historyRows() }
      </Box>
      <Box
        justify='center'
        border="top"
        direction="row"
        gap="small"
        pad="xsmall"
      >
        <Button secondary 
          label="<"
          onClick={() => onPrevMove()}
        />
        <Button secondary 
          label=">"
          onClick={() => onNextMove()}
        />
      </Box>
    </Box>
  );
}

export default MoveList;
