"use strict";

const guessMyNumber = document.querySelector("#guess-my-number");
const screenScore = document.querySelector("#score");
const screenNumber = document.querySelector("#number");
const screenHighScore = document.querySelector("#highscore");
const screenGuess = document.querySelector("#guess");
const screenMessage = document.querySelector("#message");

let secretNumber = Math.trunc(Math.random() * 10) + 1;
let score = 5;
let highScore = 0;

const displayMessage = function (message) {
    screenMessage.textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(screenGuess.value);

    if (guess === secretNumber) {
        // when player win.
        displayMessage("Currect Number!");
        screenNumber.textContent = secretNumber;
        guessMyNumber.classList.add("winner");

        if (score > highScore) {
            highScore = score;
            screenHighScore.textContent = highScore;
        }

        // when player didnt put a number.
    } else if (!guess) {
        displayMessage("No Number!");
        guessMyNumber.classList.add("invalid");

        // when guess is too high or low.
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? "The number is too high!" : "The number is too low!");

            guessMyNumber.classList.add("invalid");

            score = score - 1;
            screenScore.textContent = score;
        } else {
            displayMessage("You lost the game!");
            guessMyNumber.classList.add("invalid");

            screenScore.textContent = 0;
        }
    }
    // remove class after delay
    setTimeout(() => {
        guessMyNumber.classList.remove("invalid");
    }, 300);
});

document.querySelector(".again").addEventListener("click", function () {
    score = 10;
    secretNumber = Math.trunc(Math.random() * 10) + 1;

    displayMessage("Start guessing..");

    guessMyNumber.classList.remove("winner");

    screenScore.textContent = score;

    screenGuess.value = "";

    screenNumber.textContent = "?";
});
