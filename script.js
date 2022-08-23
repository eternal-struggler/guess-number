'use strict';

let secretNumber = Math.trunc(Math.random() * 10 + 1);
let score = 20;

const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const guess = document.querySelector('.guess');
const message = document.querySelector('.message');
const number = document.querySelector('.number');
const scoreElement = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const bodyElement = document.querySelector('body');

function displayMessage(messageToDisplay) {
  message.textContent = messageToDisplay;
}

function showLoseMessage() {
  displayMessage('💥 You lost the game!');
  scoreElement.textContent = 0;
}

function decreaseScore() {
  score--;
  scoreElement.textContent = score;
}

function setHighScore() {
  if (score > +highScore.textContent) {
    highScore.textContent = score;
  }
}

function resetAll() {
  secretNumber = Math.trunc(Math.random() * 10 + 1);
  score = 20;
  scoreElement.textContent = score;

  guess.value = '';
  number.textContent = '?';
  displayMessage('Start guessing...');

  number.style.width = '15rem';
  bodyElement.style.backgroundColor = '#222';
}

checkBtn.addEventListener('click', () => {
  switch (true) {
    case !guess.value:
      displayMessage('⛔ No number!');
      break;

    // When player wins
    case +guess.value === secretNumber:
      displayMessage('🎉 Correct!');
      bodyElement.style.backgroundColor = '#60b347';
      number.style.width = '30rem';
      number.textContent = secretNumber;

      setHighScore();
      break;

    // When guess is wrong
    case +guess.value !== secretNumber:
      if (score > 1) {
        displayMessage(
          guess.value > secretNumber ? '📈 Too high!' : '📉 Too low!'
        );
        decreaseScore();
      } else {
        showLoseMessage();
      }

      break;
  }
});

againBtn.addEventListener('click', resetAll);
