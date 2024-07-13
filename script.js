const boardElement = document.querySelector('.board');
const cellList = [];

const Gameboard = (() => {
  let rows = 3;
  let cols = 3;
  const board = [];

  const getBoard = () => {
    return board;
  };

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
  };

  const setupBoard = (rowCount, colCount, cellClickCallback) => {
    rows = rowCount;
    cols = colCount;

    boardElement.innerHTML = '';
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        const cellElement = document.createElement('div');
        cellElement.dataset.row = i.toString();
        cellElement.dataset.col = j.toString();
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', cellClickCallback);
        boardElement.appendChild(cellElement);
        board[i].push(createCell(cellElement));
      }
    }
  };

  return { getBoard, putSymbol, printBoard, setupBoard };
})();

const Player = (playerName, playerSymbol) => {
  const name = playerName;
  const symbol = playerSymbol;

  return { name, symbol };
};

function createCell(elem) {
  let symbol = '';
  const element = elem;

  const setSymbol = (inValue) => {
    symbol = inValue;
  };

  const getSymbol = () => {
    return symbol;
  };

  return { setSymbol, getSymbol, element };
}

const GameController = ((playerOneName = 'Player One', playerTwoName = 'Player Two') => {
  let currentPlayerIndex = 0;
  const players = [Player(playerOneName, 'X'), Player(playerTwoName, 'O')];

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

  const newGame = (rows = 3, cols = 3) => {
    currentPlayerIndex = 0;
    Gameboard.setupBoard(rows, cols, (e) => {
      playRound(e.target.dataset.row, e.target.dataset.col);
      e.target.innerText = Gameboard.getBoard()[e.target.dataset.row][e.target.dataset.col].getSymbol();
    });
    printNewRound();
  };

  const playRound = (row, column) => {
    if (!Gameboard.putSymbol(row, column, getActivePlayer().symbol)) {
      return;
    }

    if (checkForWin()) {
      console.log(`${getActivePlayer().name} won!`);
      Gameboard.printBoard();
      setTimeout(() => {
        newGame();
      }, 1000);
      return;
    } else if (checkForTie()) {
      console.log('It is a tie!');
      Gameboard.printBoard();
      setTimeout(() => {
        newGame();
      }, 1000);
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
  ];

  const checkForWin = () => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      const board = Gameboard.getBoard();
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

  newGame();

  return { playRound, getActivePlayer, newGame };
})();
