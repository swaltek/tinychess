import { useEffect, useState, useRef } from 'react';
import { Box, Pagination, List, Spinner } from 'grommet';

const fetch_pgns = async (limit, offset) => {
  const res = await fetch(`http://127.0.0.1:3000/pgns?limit=${limit}&offset=${offset}`);
  console.log(res);
  const json = await res.json()
  console.log(json);
  return json
}

const Selector = () => {
  const [pgns, setPgns] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect( () => {
    if( pgns !== null) return;
    fetch_pgns(limit, offset).then( (res) => {
      setPgns( res.data );
      setTotalCount( res.totalDataCount );
    });

  });

  const handleChange = ({startIndex}) => {
    setOffset( startIndex );
    setPgns(null);
  }
  const listAction = ({item, index}) => {
    return <span>{`${item._id}`}</span>
  };

  return <Box
  >
    {
      pgns ?
      <List
        action={() => listAction}
        data={pgns}
      />
      : <Spinner />
    }
    <Pagination
    step={limit}
    numberItems={totalCount}
    onChange={(e) => handleChange(e)}
    />
  </Box>
}

export default Selector;
