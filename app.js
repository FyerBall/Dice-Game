// Gloabl vars
let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let dicePic = document.querySelector(".dice");
let gamePlaying = true;

start();

// Roll the dice btween
document.querySelector(".rollBtn").addEventListener("click", () => {
  // Check if the game playing
  if (gamePlaying) {
    // Create a random number btween 1 and 6
    let dice = Math.floor(Math.random() * 6) + 1;

    // Display the dice
    dicePic.style.visibility = "visible";
    dicePic.src = `dice-${dice}.png`;

    // Update the score if score != 1
    if (dice !== 1) {
      // Add scores
      roundScore += dice;
      // Assign the scores to the players
      document.querySelector(`#score-${activePlayer}`).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// Hold the score btween
document.querySelector(".holdBtn").addEventListener("click", () => {
  // Check if the game is playing
  if (gamePlaying) {
    // Add the cuurent score to the global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.getElementById(`player-${activePlayer}`).textContent =
      scores[activePlayer];

    // Input the winning score
    let scoreInput = document.querySelector(".scoreInput").value;
    let winningScore;
    if (scoreInput) {
      winningScore = scoreInput;
    } else {
      winningScore = 100;
    }

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById(`name-${activePlayer}`).textContent = "WINNER!";
      document
        .getElementById(`name-${activePlayer}`)
        .classList.toggle("winner");
      // Hide the dice
      // document.querySelector(".dice").style.visibility = "hidden";
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// New Game
document.querySelector(".newGameBtn").addEventListener("click", start);

// Game rules ? btn
document.querySelector(".popupBtn").addEventListener("click", function() {
  alert(`GAME RULES:
  - The game has 2 players, playing in rounds
  - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
  - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
  - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
  - The first player to reach 100 points on GLOBAL score wins the game`);
});
// Start the game
function start() {
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  // Hide the dice
  document.querySelector(".dice").style.visibility = "hidden";
  document.getElementById(`name-0`).textContent = "Player 1";
  document.getElementById(`name-1`).textContent = "Player 2";
  document.getElementById(`player-0`).textContent = "0";
  document.getElementById(`score-0`).textContent = "0";
  document.getElementById(`player-1`).textContent = "0";
  document.getElementById(`score-1`).textContent = "0";
  document.getElementById(`name-0`).classList.remove("winner");
  document.getElementById(`name-1`).classList.remove("winner");

  document.getElementById("activePlayer").classList.add("activePlayer");
  showActiveComputer();
}

// Showing the triangle next to the computer player ==> Player 2
function showActiveComputer() {
  if (activePlayer === 1) {
    document.getElementById("activeComputer").style.visibility = "visible";
    document.getElementById("activeComputer").classList.add("activeComputer");
  } else {
    document.getElementById("activeComputer").style.visibility = "hidden";
  }
}

// Next player turn
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // Set scores back to 0
  roundScore = 0;
  document.querySelector(`#score-0`).textContent = 0;
  document.querySelector(`#score-1`).textContent = 0;

  document.getElementById("activePlayer").classList.toggle("activePlayer");
  showActiveComputer();
  // Hide the dice
  document.querySelector(".dice").style.visibility = "hidden";
}

// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
