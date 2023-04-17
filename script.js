const Gameboard = (() => {
  const board = [['', '', ''], ['', '', ''], ['', '', '']];

  const renderBoard = (domElement) => {
    const brd = document.createElement('div');
    brd.classList.add('board');

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.row = i.toString();
        cell.col = j.toString();

        const img = document.createElement('img');
        cell.appendChild(img);

        brd.appendChild(cell);
      }
    }
  };

  const putSymbol = (event) => {
    const element = event.target;
    if (board[element.row][element.col] !== ''){
      
    }
  };

  return { renderBoard, putSymbol };
})();

const Player = (sym) => {
  const symbol = sym;

  return { symbol };
};


const GameController = (() => {
  let currentPlayerIndex = 0;
  const startGame = () => {
    const players = [Player('X'), Player('O')];
  };

  const handleTurn = () => {

    currentPlayerIndex += 1;
  };

  return { startGame, handleTurn };
})();