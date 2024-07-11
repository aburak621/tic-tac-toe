const Gameboard = (() => {
  const rows = 3;
  const cols = 3;
  let board = [];

  const resetBoard = () => {
    board = []
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        board[i].push(createCell());
      }
    }
  };

  resetBoard();

  const getBoard = () => {
    return board;
  }

  const putSymbol = (row, col, symbol) => {
    if (board[row][col].getSymbol() !== '') {
      return false;
    }

    board[row][col].setSymbol(symbol);
    return true;
  };

  const printBoard = () => {
    const boardWithValues = board.map((row) => {
      return row.map((cell) => {
        return cell.getSymbol();
      });
    });
    console.log(boardWithValues);
  }

  return { getBoard, resetBoard, putSymbol, printBoard };
})();

const Player = (playerName, playerSymbol) => {
  const name = playerName;
  const symbol = playerSymbol;

  return { name, symbol };
};

function createCell() {
  let symbol = '';

  const setSymbol = (inValue) => {
    symbol = inValue;
  };

  const getSymbol = () => {
    return symbol;
  };

  return { setSymbol, getSymbol };
}

const GameController = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
  let currentPlayerIndex = 0;
  let players = [Player(playerOneName, 'X'), Player(playerTwoName, 'O')]

  const switchTurn = () => {
    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
  };

  const getActivePlayer = () => {
    return players[currentPlayerIndex];
  };

  const printNewRound = () => {
    Gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const newGame = () => {
    currentPlayerIndex = 0;
    Gameboard.resetBoard();
    printNewRound();
  };

  const playRound = (row, column) => {
    if (!Gameboard.putSymbol(row, column, getActivePlayer().symbol)) {
      return;
    }

    if (checkForWin()) {
      console.log(`${getActivePlayer().name} won!`);
      newGame();
      return;
    } else if (checkForTie()) {
      console.log("It is a tie!");
      newGame();
      return;
    }

    switchTurn();
    printNewRound();
  };

  const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]], // Top row
    [[1, 0], [1, 1], [1, 2]], // Middle row
    [[2, 0], [2, 1], [2, 2]], // Bottom row
    [[0, 0], [1, 0], [2, 0]], // Left column
    [[0, 1], [1, 1], [2, 1]], // Middle column
    [[0, 2], [1, 2], [2, 2]], // Right column
    [[0, 0], [1, 1], [2, 2]], // Top-left to bottom-right diagonal
    [[0, 2], [1, 1], [2, 0]], // Top-right to bottom-left diagonal
  ]

  const checkForWin = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;

      const board = Gameboard.getBoard()
      const firstCell = board[a[0]][a[1]].getSymbol();
      if (firstCell === '') {
        continue;
      }

      if (firstCell === board[b[0]][b[1]].getSymbol() && firstCell === board[c[0]][c[1]].getSymbol()) {
        return true;
      }
    }
    return false;
  };

  const checkForTie = () => {
    return Gameboard.getBoard().every((row) => {
      return !row.some(cell => cell.getSymbol() === '');
    });
  };

  printNewRound();

  return { playRound, getActivePlayer, newGame };
})();
