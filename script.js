// Array to represent the Tic Tac Toe board
let board = ["-", "-", "-",
  "-", "-", "-",
  "-", "-", "-"
];

// Getting the element to display game status
let gameStatus = document.getElementById("game-status");

// Selecting all the HTML elements with class "cell"
let cells = document.querySelectorAll(".cell");

// Setting the initial player as "X"
let currentPlayer = "X";

// Function to update the HTML cells with the current state of the board
function printBoard() {
  cells.forEach((cell, index) => {
    cell.innerText = board[index];
  });
}

// Function to execute when a player takes their turn
function takeTurn(position) {
  // Checking if the selected position on the board is available
  if (board[position] === "-") {
    // Assigning the current player's mark to the selected position
    board[position] = currentPlayer;
    // Updating the visual representation of the board
    printBoard();
    // Checking if the game is over after this move
    let gameResult = checkGameOver();
    // Handling different game outcomes
    if (gameResult === "win") {
      // Displaying the winning player
      gameStatus.innerText = currentPlayer + " wins!";
      // Disabling further clicks on cells as the game is over
      disableCellClicks();
    } else if (gameResult === "tie") {
      // Displaying a tie message
      gameStatus.innerText = "It's a tie!";
      // Disabling further clicks on cells as the game is over
      disableCellClicks();
    } else {
      // Switching to the next player's turn if the game is not over
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Function to check if the game is over
function checkGameOver() {
  // Array of winning combinations on the board
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  // Iterating through all win conditions to check for a win
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] !== "-" && board[a] === board[b] && board[a] === board[c]) {
      return "win";
    }
  }
  // If no win condition is met and there are no empty cells, it's a tie
  if (!board.includes("-")) {
    return "tie";
  }
  // If the game is still ongoing
  return "play";
}

// Function to disable further clicks on cells after the game ends
function disableCellClicks() {
  cells.forEach(cell => {
    cell.onclick = null;
  });
}

// Function to restart the game
function restartGame() {
  // Resetting the board to its initial state
  board = ["-", "-", "-",
    "-", "-", "-",
    "-", "-", "-"
  ];
  // Setting the starting player back to "X"
  currentPlayer = "X";
  // Clearing the game status display
  gameStatus.innerText = "";
  // Updating the visual representation of the board
  printBoard();
  // Enabling cell click functionality for the restarted game
  cells.forEach(cell => {
    cell.onclick = () => takeTurn(Array.from(cells).indexOf(cell));
  });
}

// Function to enable cell click functionality for a new game
function enableCellClicks() {
  cells.forEach(cell => {
    // Checking if the cell is empty and allowing click only on empty cells
    if (board[Array.from(cells).indexOf(cell)] === "-") {
      cell.onclick = () => takeTurn(Array.from(cells).indexOf(cell));
    }
  });
}

// Function to start the game
function startGame() {
  // Displaying the initial empty board
  printBoard();
  // Enabling cell click functionality for the start of the game
  enableCellClicks();
}

// Calling startGame to initiate the game
startGame();











