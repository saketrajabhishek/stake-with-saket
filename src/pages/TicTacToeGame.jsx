import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Computer plays first as "X"
  const [loading, setLoading] = useState(false); // Loading state for computer's turn

  useEffect(() => {
    if (isXNext && !loading) {
      setLoading(true);
      setTimeout(() => {
        const bestMove = findBestMove(board);
        const newBoard = board.slice();
        newBoard[bestMove] = "X";
        setBoard(newBoard);
        setIsXNext(false);
        setLoading(false);
      }, 1000); // Simulate computer thinking time
    }
  }, [isXNext, board, loading]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || isXNext || loading) return;

    const newBoard = board.slice();
    newBoard[index] = "O";
    setBoard(newBoard);
    setIsXNext(true);
  };

  const calculateWinner = (squares) => {
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
  };

  const isMovesLeft = (board) => {
    return board.includes(null);
  };

  const evaluate = (b) => {
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
      if (b[a] && b[a] === b[b] && b[a] === b[c]) {
        if (b[a] === "X") return +10;
        else if (b[a] === "O") return -10;
      }
    }
    return 0;
  };

  const minimax = (board, depth, isMax) => {
    const score = evaluate(board);

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "X";
          best = Math.max(best, minimax(board, depth + 1, !isMax));
          board[i] = null;
        }
      }
      return best;
    } else {
      let best = 1000;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O";
          best = Math.min(best, minimax(board, depth + 1, !isMax));
          board[i] = null;
        }
      }
      return best;
    }
  };

  const findBestMove = (board) => {
    let bestVal = -1000;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        const moveVal = minimax(board, 0, false);
        board[i] = null;
        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setLoading(false);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : !isMovesLeft(board)
    ? "Draw"
    : loading
    ? "Computer is playing..."
    : `Next player: ${isXNext ? "X (Computer)" : "O (You)"}`;

  return (
    <div className="tic-tac-toe-container p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="title text-2xl font-bold mb-4">Tic-Tac-Toe Game</h1>
      <div className="status mb-4 text-lg">{status}</div>
      <div className="board grid grid-cols-3 gap-2 mb-4">
        {board.map((value, index) => (
          <motion.button
            key={index}
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 border rounded-md flex items-center justify-center cursor-pointer bg-white dark:bg-gray-800 text-black dark:text-white"
            onClick={() => handleClick(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={loading} // Disable buttons while loading
          >
            {value}
          </motion.button>
        ))}
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/"
          className="mb-2 md:mb-0 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Back to Home
        </Link>
        <motion.button
          onClick={resetGame}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Reset Game
        </motion.button>
      </div>
    </div>
  );
};

export default TicTacToeGame;
