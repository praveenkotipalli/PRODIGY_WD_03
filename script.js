const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const player= document.querySelector('.player');

player.textContent="Player X\'s turn";

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        alert(`Player ${currentPlayer} Wins! Reset the game to play again`)
        message.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert(`Draw !!`)
        message.textContent = 'Game Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if(currentPlayer==='X'){
        player.textContent='Player X\'s turn'
    }
    else{
        player.textContent="Player O\'s turn"
    }
};

// function updateBackgroundImage() {
//     document.body.style.backgroundImage = 'url("https://picsum.photos/1600/900?random=' + new Date().getTime() + '")';
// }

// updateBackgroundImage();

// setInterval(updateBackgroundImage, 1000);


const checkWin = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
};

const resetGame = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
