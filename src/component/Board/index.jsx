import React from 'react';
import Square from '../Square'
import styles from './index.less'

const Board = props => {
  const { squares, onClick } = props;
  const renderSquare = i => (
    <Square
      value={squares[i]}
      onClick={onClick(i)}
    />
  )

  return (
    <>
      <div className={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  )
}

export default Board;