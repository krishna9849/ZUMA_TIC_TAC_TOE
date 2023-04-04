import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [status, setStatus] = useState('In Progress');

  const handleClick = (index) => {
    let newBoard = [...board];
    if (newBoard[index] === null && status === 'In Progress') {
      newBoard[index] = player;
      setBoard(newBoard);
      let newStatus = checkStatus(newBoard);
      if (newStatus === 'In Progress') {
        setPlayer(player === 'X' ? 'O' : 'X');
      }
      setStatus(newStatus);
    }
  };

  const checkStatus = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return `${board[a]} Won!`;
      }
    }
    if (board.includes(null)) {
      return 'In Progress';
    } else {
      return 'Tied';
    }
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
      <p>Current Player: {player}</p>
      <p>Game Status: {status}</p>
    </div>
  );
}

export default App;
