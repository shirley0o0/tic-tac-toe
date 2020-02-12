import React from 'react';
import Board from '../Board';
import { LINES, AXIS_MAP } from '../../utils/constents';
// import { LINES, AXIS_MAP } from '@/utils/constents';
import styles from './index.less'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  calculateWinner = squares => {
    for (let i = 0; i < LINES.length; i++) {
      const [a, b, c] = LINES[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick = i => {
    const { stepNumber, xIsNext } = this.state;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice()

    if(this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares,
        }]),
      xIsNext: !xIsNext,
      stepNumber: history.length,
  });
  }

  jumpTo = step => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const { stepNumber } = this.state;
    const history = this.state.history;
    const current = history[stepNumber];
    const winner = this.calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const list = step.squares.slice();
      let axis = [0, 0]
      list.map((item, index) => {
        if (item) {
          axis = AXIS_MAP[index]
        }
      })

      const [x, y] = axis
      const desc = move ? `返回第${move}步（列：${x}, 行：${y}）` : '开始游戏';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    let status;
    if(winner) {
      status = `恭喜， ${winner}胜利啦！`
    } else {
      status = `下一步: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className={styles.game}>
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className={styles.gameInfo}>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game