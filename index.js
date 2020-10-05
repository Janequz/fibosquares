import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
}

class Board extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  } 

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
       value={this.state.squares[i]}
       onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner && winner != 'draw') {
      status = 'The winner is: ' + winner;
      sleep(3000).then(() => {
        this.setState({
          squares: Array(9).fill(null),
          xIsNext: true,
        });
      });      
    } else {
      status = 'Next move is for: ' + (this.state.xIsNext ? 'X' : 'O');
    } 
    if (winner === 'draw'){
      status = "It's a " + winner;
      sleep(3000).then(() => {
        this.setState({
          squares: Array(9).fill(null),
          xIsNext: true,
        });
      });
    }
    
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.Decrease = this.Decrease.bind(this);
    this.Increase = this.Increase.bind(this);
    this.state = {
      previous1: 1,
      previous2: 0,
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
    }
    Increase(e) {
      let a = this.state.previous1 + this.state.previous2;
        this.setState({
          previous1: a,
          previous2: this.state.previous1,
        });
    } 

    Decrease(e) {
        this.setState({
          previous1: this.state.previous2,
          previous2: this.state.previous1 - this.state.previous2,
        });
    }
    while (xIsNext = true) {
      this.Increase();
    }
  render() {
    return (
      <div className="game">
        <div className="game-board">
        <div onLoad={this.Increase}>
          The current number is: {this.state.previous1}
          <br/>
        </div>
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    } 
    if (!squares.includes(null)) {
      return 'draw';
    }
  } 
  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
