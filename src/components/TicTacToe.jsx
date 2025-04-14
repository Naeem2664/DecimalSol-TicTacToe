import React, { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "It's a Draw!";
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  return (
    <div style={{ textAlign: "center", }}>
      <h1>Tic Tac Toe</h1>
      <div style={{ marginBottom: "20px", fontSize: "24px" }}>{status}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridGap: "10px",
          justifyContent: "center",
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "36px",
              fontWeight: "bold",
              cursor: "pointer",
              color: cell === "X" ? "#a0d2eb" : cell === "O" ? "#d0bdf4" : "black",
              backgroundColor:  "#0000",
              border: "2px solid #fff",
              borderRadius: "5px",
              transition: "background-color 0.3s",
            }}
          >
            {cell}
          </button>
        ))}
      </div>
      
      <button
        onClick={handleReset}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          fontSize: "18px",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: winner? "#51e2f5" :isBoardFull ? "#ffa8B6" : "#edf756",
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
}
