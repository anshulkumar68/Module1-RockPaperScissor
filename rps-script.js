'use strict';

// Selecting elements
const rock = document.querySelector('.rock');
const scissor = document.querySelector('.scissor');
const paper = document.querySelector('.paper');
// container
const title = document.querySelector('.title');
const icons = document.querySelector('.icons-container');
const win = document.querySelector('.win-container');
const hurray = document.querySelector('.hurray');
const ruleBook = document.querySelector('.rule-book-container');
const ruleBtn = document.querySelector('.rule-btn');
const closeBtn = document.querySelector('.rule-close-btn-container');
const PCMoveContainer = document.querySelector('.computer-container');
const yourMoveContainer = document.querySelector('.your-container');
const yourMoveEl = document.querySelector('.your-move');
const PCMoveEL = document.querySelector('.computer-move');
const winLostText1 = document.querySelector('.win-lost-text-1');
const winLostText2 = document.querySelector('.win-lost-text-2');
const nextBtn = document.querySelector('.next-btn');
const moves = document.querySelectorAll('.move');
const playAgain = document.querySelector('.play-again-btn');
const scoreC = document.querySelector('.computer-score');
const scoreY = document.querySelector('.your-score');
const resetBtn = document.querySelector('.reset-btn');
const hresetBtn = document.querySelector('.hurray-reset-btn');
const ellipse = document.querySelector('.ellipse');

// variable
let gameActive = true;


// == USING LOCALSTORAGE ==
window.addEventListener("load", () => {
  const savedComputerScore = localStorage.getItem("computerScore");
  const savedPlayerScore = localStorage.getItem("playerScore");

  scoreC.textContent = savedComputerScore ? savedComputerScore : 0;
  scoreY.textContent = savedPlayerScore ? savedPlayerScore : 0;
});

// == DISPLAY CORRESPOND RANDOM IMAGE ==
moves.forEach((move) => {
  move.addEventListener('click', (event) => {
    if (!gameActive) return;

    const clickedImageAlt = event.target.alt;
    const playerChoice = Number(event.target.alt);

    //1. Generating a number
    const random = Math.trunc(Math.random() * 3) + 1;

    //2. Display the move
    icons.classList.add('hidden');
    win.classList.remove('hidden');
    yourMoveEl.src = `images/move-${clickedImageAlt}.png`;
    PCMoveEL.src = `images/move-${random}.png`;
    if (clickedImageAlt === '1') {
      yourMoveContainer.classList.add('one');
      yourMoveEl.classList.add('rock-img');
    } else if (clickedImageAlt === '2') {
      yourMoveContainer.classList.add('two');
      yourMoveEl.classList.add('paper-img');
    } else {
      yourMoveContainer.classList.add('three');
      yourMoveEl.classList.add('scissor-img');
    }

    if (random === 1) {
      PCMoveContainer.classList.add('one');
      PCMoveEL.classList.add('rock-img');
    } else if (random === 2) {
      PCMoveContainer.classList.add('two');
      PCMoveEL.classList.add('paper-img');
    } else {
      PCMoveContainer.classList.add('three');
      PCMoveEL.classList.add('scissor-img');
    }

    //3. Calculate score
    if (playerChoice === random) {
      winLostText1.classList.remove("hidden");
      winLostText1.textContent = "TIE";

      return '';
    } else if (
      (playerChoice === 1 && random === 3) ||
      (playerChoice === 2 && random === 1) ||
      (playerChoice === 3 && random === 2) 
    ) {
      scoreY.textContent = Number(scoreY.textContent) + 1;
      ellipse.classList.remove('hidden');
      localStorage.setItem("playerScore", scoreY.textContent);
    } else {
      scoreC.textContent = Number(scoreC.textContent) + 1;
      ellipse.classList.remove('hidden');
      ellipse.classList.add('ellipse-transition');
      localStorage.setItem("computerScore", scoreC.textContent);
    }

    // Check if someone has won
    checkForWinner();
  });
});

// == Check for winner ==
function checkForWinner() {
  if (Number(scoreY.textContent) >= 10) {
    winLostText1.classList.remove('hidden');
    winLostText1.textContent = 'YOU WIN';
    winLostText2.classList.remove('hidden');
    ruleBtn.classList.add('rule-btn-transition');
    ellipse.classList.add('ellipse-transition-win');
    nextBtn.classList.remove('hidden');
    gameActive = false;
    playAgain.classList.add('hidden');
    resetBtn.classList.remove('hidden');
  } else if (Number(scoreC.textContent) >= 10) {
    winLostText1.classList.remove('hidden');
    winLostText1.textContent = 'YOU LOST';
    winLostText2.classList.remove('hidden');
    gameActive = false;
    playAgain.classList.add('hidden');
    resetBtn.classList.remove('hidden');
    ellipse.classList.remove('ellipse-transition');
    ellipse.classList.add('ellipse-transition-lost');
  } else if (
    Number(scoreY.textContent) === 10 &&
    Number(scoreC.textContent) === 10
  ) {
    return '';
  }
}

// == PLAY AGAIN ==
playAgain.addEventListener('click', () => {
  if (!gameActive) 
    return;

  win.classList.add('hidden');
  icons.classList.remove('hidden');
  yourMoveContainer.classList.remove('one');
  yourMoveContainer.classList.remove('two');
  yourMoveContainer.classList.remove('three');
  yourMoveEl.classList.remove('rock-img');
  yourMoveEl.classList.remove('paper-img');
  yourMoveEl.classList.remove('scissor-img');
  PCMoveContainer.classList.remove('one');
  PCMoveContainer.classList.remove('two');
  PCMoveContainer.classList.remove('three');
  PCMoveEL.classList.remove('rock-img');
  PCMoveEL.classList.remove('paper-img');
  PCMoveEL.classList.remove('scissor-img');
  ellipse.classList.remove('ellipse-transition');
  ellipse.classList.remove('ellipse-transition-win');
  ellipse.classList.remove('ellipse-transition-lost');
  ellipse.classList.add('hidden');
  winLostText1.classList.add('hidden'); 
});

// == Close & Open Rule Modal ==
ruleBtn.addEventListener('click', () => {
  ruleBook.classList.remove('hidden');
});

closeBtn.addEventListener('click', function () {
  ruleBook.classList.add('hidden');
});

// == HURRAY ==
nextBtn.addEventListener('click', () => {
  gameActive = true;
  title.classList.add('hidden');
  icons.classList.add('hidden');
  win.classList.add('hidden');
  hurray.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  ruleBtn.classList.toggle('rule-btn-transition');
});

// == RESET ==
const resetGame = function () {
  gameActive = true;
  scoreC.textContent = 0;
  hurray.classList.add("hidden");
  title.classList.remove("hidden");
  icons.classList.remove("hidden");
  scoreC.textContent = 0;
  scoreY.textContent = 0;
  yourMoveContainer.classList.remove('one');
  yourMoveContainer.classList.remove('two');
  yourMoveContainer.classList.remove('three');
  yourMoveEl.classList.remove('rock-img');
  yourMoveEl.classList.remove('paper-img');
  yourMoveEl.classList.remove('scissor-img');
  PCMoveContainer.classList.remove('one');
  PCMoveContainer.classList.remove('two');
  PCMoveContainer.classList.remove('three');
  PCMoveEL.classList.remove('rock-img');
  PCMoveEL.classList.remove('paper-img');
  PCMoveEL.classList.remove('scissor-img');
  winLostText1.classList.add("hidden");
  winLostText2.classList.add("hidden");
  playAgain.classList.remove("hidden");
  resetBtn.classList.add("hidden");
  win.classList.add("hidden");
  ellipse.classList.remove("ellipse-transition-lost");
  ellipse.classList.remove('ellipse-transition-win');
  ellipse.classList.add("hidden");
  nextBtn.classList.add("hidden");
  localStorage.removeItem("computerScore"); // Clear localStorage
  localStorage.removeItem("playerScore"); // Clear localStorage
};
  resetBtn.addEventListener('click', () => {
     ruleBtn.classList.remove("rule-btn-transition");
    resetGame();
  });
  
  hresetBtn.addEventListener('click', ()=>{
  resetGame();
})