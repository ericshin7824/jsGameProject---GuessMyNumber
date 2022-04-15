"use strict";

const guessMyNumber = document.querySelector("#guess-my-number");
const screenScore = document.querySelector("#score");
const screenNumber = document.querySelector("#number");
const screenHighScore = document.querySelector("#highscore");
const screenGuess = document.querySelector("#guess");
const screenMessage = document.querySelector("#message");

let playing, secretNumber, score, highScore;

const displayMessage = function (message) {
    screenMessage.innerHTML = message;
};

// set back to default
function init() {
    secretNumber = Math.trunc(Math.random() * 10) + 1;
    playing = false;
    highScore = 0;
    score = 5;

    displayMessage(`<p class="rules"><span>Find The Secret Number</span><span>(Between 1 and 10)</span></p>`);

    guessMyNumber.classList.remove("winner");
    guessMyNumber.classList.remove("loser");
    guessMyNumber.classList.remove("active");

    screenScore.textContent = score;

    screenGuess.value = "";

    screenNumber.innerHTML = `<p class="press-start"><span>Press START</span><span>to PLAY.</span></p>`;
}
init();

// check button
document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(screenGuess.value);
    // check playing
    if (playing) {
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

                // when score is 0
            } else {
                displayMessage("You lost the game!");
                guessMyNumber.classList.add("invalid");
                guessMyNumber.classList.add("loser");
                screenScore.textContent = 0;
            }
        }
    }

    // remove class after delay
    setTimeout(() => {
        guessMyNumber.classList.remove("invalid");
    }, 300);
});

// to reset
document.querySelector(".reset").addEventListener("click", function () {
    // set bact to default
    if (playing) {
        init();
    }
});

// to start
document.querySelector(".start").addEventListener("click", () => {
    // check player playing or not
    if (!playing) {
        // turn on playing
        playing = true;
        screenNumber.textContent = "?";
        displayMessage("Start guessing..");
        guessMyNumber.classList.add("active");
    }
});
