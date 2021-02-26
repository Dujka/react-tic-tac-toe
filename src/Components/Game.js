import React, { Component } from "react";
import Board from "./Board.js";
import RestartButton from "./RestartButton.js";
import UndoRedo from "./UndoRedo.js";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      weHaveAWinner: null,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] == null && this.state.weHaveAWinner == null) {
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([{ squares: squares }]),
        xIsNext: !this.state.xIsNext,
        weHaveAWinner: this.calculateWinner(squares),
        stepNumber: history.length,
      });
    }
  }

  restartGame() {
    this.setState({
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      weHaveAWinner: null,
      stepNumber: 0,
    });
  }

  currentMovePlusIncrement(increment) {
    const stepNumber = this.state.stepNumber;
    if (
      stepNumber + increment >= 0 &&
      stepNumber + increment <= 9 &&
      increment + stepNumber <= this.state.history.length - 1
    ) {
      const current = this.state.history[stepNumber + increment];
      const squares = current.squares.slice();
      this.setState({
        stepNumber: stepNumber + increment,
        xIsNext: (stepNumber + increment) % 2 === 0,
        weHaveAWinner: this.calculateWinner(squares),
      });
    }
  }

  calculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1);
    const current = history[step];
    const squares = current.squares.slice();
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      weHaveAWinner: this.calculateWinner(squares),
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    let status;
    if (this.state.weHaveAWinner != null)
      status = "Winner is: " + this.state.weHaveAWinner;
    else if (this.state.stepNumber === 9) status = "It's a draw!";
    else status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Start";
      let className;
      if (move == this.state.stepNumber) className = "button-active";
      else className = "button";
      return (
        <div className="history-button-wrapper">
          <li key={move}>
            <button className={className} onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        </div>
      );
    });

    return (
      <div className="game">
        <h1 className="status">{status}</h1>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="controls">
            <UndoRedo
              increment={-1}
              onClick={() => this.currentMovePlusIncrement(-1)}
            />
            <RestartButton onClick={() => this.restartGame()} />
            <UndoRedo
              increment={+1}
              onClick={() => this.currentMovePlusIncrement(+1)}
            />
          </div>
          <h1>Moves history</h1>
          <ul className="list">{moves}</ul>
        </div>
      </div>
    );
  }
}

export default Game;
