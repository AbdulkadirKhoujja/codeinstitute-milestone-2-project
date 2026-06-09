const gameTiles = document.querySelectorAll(".game-tile");
const startButton = document.querySelector("#start-button");
const resetButton = document.querySelector("#reset-button");
const difficultySelect = document.querySelector("#difficulty-select");
const scoreDisplay = document.querySelector("#score-display");
const roundDisplay = document.querySelector("#round-display");
const livesDisplay = document.querySelector("#lives-display");
const highScoreDisplay = document.querySelector("#high-score-display");
const savedHighScore = document.querySelector("#saved-high-score");
const gameMessage = document.querySelector("#game-message");
const lastResult = document.querySelector("#last-result");
const clearHighScoreButton = document.querySelector("#clear-high-score-button");

const difficultySettings = {
    easy: {
        lives: 5,
        playbackDelay: 800,
        points: 10
    },
    normal: {
        lives: 3,
        playbackDelay: 650,
        points: 20
    },
    hard: {
        lives: 2,
        playbackDelay: 480,
        points: 35
    }
};

const gameState = {
    sequence: [],
    playerInput: [],
    score: 0,
    round: 0,
    lives: difficultySettings.normal.lives,
    highScore: 0,
    difficulty: "normal",
    isPlaying: false,
    isShowingSequence: false
};

function setTilesDisabled(isDisabled) {
    gameTiles.forEach((tile) => {
        tile.disabled = isDisabled;
    });
}

function renderStatus() {
    scoreDisplay.textContent = gameState.score;
    roundDisplay.textContent = gameState.round;
    livesDisplay.textContent = gameState.lives;
    highScoreDisplay.textContent = gameState.highScore;
    savedHighScore.textContent = gameState.highScore;
}

function resetGame() {
    gameState.sequence = [];
    gameState.playerInput = [];
    gameState.score = 0;
    gameState.round = 0;
    gameState.lives = difficultySettings[gameState.difficulty].lives;
    gameState.isPlaying = false;
    gameState.isShowingSequence = false;
    gameMessage.textContent = "Choose a difficulty and press start.";
    difficultySelect.disabled = false;
    startButton.disabled = false;
    setTilesDisabled(true);
    renderStatus();
}

function startGame() {
    gameState.sequence = [];
    gameState.playerInput = [];
    gameState.score = 0;
    gameState.round = 0;
    gameState.lives = difficultySettings[gameState.difficulty].lives;
    gameState.isPlaying = true;
    gameState.isShowingSequence = false;
    gameMessage.textContent = "Game started. Watch the grid.";
    difficultySelect.disabled = true;
    startButton.disabled = true;
    setTilesDisabled(true);
    renderStatus();
}

function initGame() {
    setTilesDisabled(true);
    renderStatus();
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
}

initGame();
