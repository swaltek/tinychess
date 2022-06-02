const path = '/chessPieces.svg';

export default function Piece ({type, onClick = null}){
  return (
    <svg className='piece' viewBox="0 0 45 45" onClick={ onClick }>
      <use xlinkHref={ path + `#${type}`} />
    </svg>
  );
}

