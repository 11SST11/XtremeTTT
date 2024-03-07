const board = document.getElementById('board');
const timer = document.getElementById('timer');
const resultScreen = document.createElement('div');
resultScreen.classList.add('result-screen');
document.body.appendChild(resultScreen);

let currentPlayer = 'X';
let gameOver = false;
let timeRemaining = 10;
let countdown;

// Create the Tic Tac Toe board
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

startTimer();

function startTimer() {
    updateTimer();
    countdown = setInterval(() => {
        timeRemaining--;
        updateTimer();
        if (timeRemaining === 0) {
            showResult('Time\'s up! It\'s a draw.');
        }
    }, 1000);
}

function updateTimer() {
    timer.textContent = `Time: ${timeRemaining}s`;
    // Change color of timer every second
    timer.style.color = timeRemaining % 2 === 0 ? 'red' : 'white';
}

function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            showResult(`Player ${currentPlayer} wins!`);
        } else if (checkDraw()) {
            showResult('It\'s a draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const cells = document.querySelectorAll('.cell');
    const lines = [
        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        if (cell.textContent === '') {
            return false;
        }
    }
    return true;
}

function showResult(message) {
    clearInterval(countdown);

    const resultText = document.createElement('div');
    resultText.classList.add('result-text');
    resultText.textContent = message;

    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game-button');
    newGameButton.textContent = 'New Game';
    newGameButton.addEventListener('click', startNewGame);

    resultScreen.innerHTML = '';
    resultScreen.appendChild(resultText);
    resultScreen.appendChild(newGameButton);
    resultScreen.style.display = 'flex';
    gameOver = true;
}

function startNewGame() {
    clearInterval(countdown);

    const cells = document.querySelectorAll('.cell');
    for (const cell of cells) {
        cell.textContent = '';
    }

    resultScreen.style.display = 'none';
    gameOver = false;
    currentPlayer = 'X';
    timeRemaining = 10;
    startTimer();
}
