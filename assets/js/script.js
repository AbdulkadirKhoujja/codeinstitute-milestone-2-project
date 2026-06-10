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
const statusAnnouncer = document.querySelector("#status-announcer");
const lastResult = document.querySelector("#last-result");
const clearHighScoreButton = document.querySelector("#clear-high-score-button");
const heroStartLink = document.querySelector("#hero-start-link");
const gameSection = document.querySelector("#play-game");
const highScoreStorageKey = "pixelQuestHighScore";

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
        tile.setAttribute("aria-disabled", String(isDisabled));
    });
}

function renderStatus() {
    scoreDisplay.textContent = gameState.score;
    roundDisplay.textContent = gameState.round;
    livesDisplay.textContent = gameState.lives;
    highScoreDisplay.textContent = gameState.highScore;
    savedHighScore.textContent = gameState.highScore;
    statusAnnouncer.textContent = `Score ${gameState.score}. Round ${gameState.round}. Lives ${gameState.lives}. High score ${gameState.highScore}.`;
}

function setGameMessage(message) {
    gameMessage.textContent = message;
}

function loadHighScore() {
    const savedScore = Number(localStorage.getItem(highScoreStorageKey));

    gameState.highScore = Number.isNaN(savedScore) ? 0 : savedScore;
}

function saveHighScore() {
    if (gameState.score <= gameState.highScore) {
        return;
    }

    gameState.highScore = gameState.score;
    localStorage.setItem(highScoreStorageKey, String(gameState.highScore));
}

function clearHighScore() {
    localStorage.removeItem(highScoreStorageKey);
    gameState.highScore = 0;
    gameMessage.textContent = "High score cleared.";
    renderStatus();
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

function generateNextStep() {
    const randomTile = Math.floor(Math.random() * gameTiles.length);

    gameState.sequence.push(randomTile);
    gameState.playerInput = [];
    gameState.round = gameState.sequence.length;
}

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function highlightTile(tileIndex) {
    const tile = gameTiles[tileIndex];

    tile.classList.add("is-active");
    await wait(300);
    tile.classList.remove("is-active");
}

async function playSequence() {
    gameState.isShowingSequence = true;
    setTilesDisabled(true);
    gameMessage.textContent = `Round ${gameState.round}: watch the sequence.`;

    await wait(500);

    for (const tileIndex of gameState.sequence) {
        await highlightTile(tileIndex);
        await wait(difficultySettings[gameState.difficulty].playbackDelay);
    }

    gameState.isShowingSequence = false;
    gameMessage.textContent = "Your turn. Repeat the pattern.";
    setTilesDisabled(false);
}

function checkPlayerInput() {
    const currentIndex = gameState.playerInput.length - 1;
    const expectedTile = gameState.sequence[currentIndex];
    const selectedTile = gameState.playerInput[currentIndex];

    if (selectedTile !== expectedTile) {
        gameMessage.textContent = "That tile broke the pattern.";
        setTilesDisabled(true);
        return "wrong";
    }

    if (gameState.playerInput.length === gameState.sequence.length) {
        gameMessage.textContent = "Pattern complete.";
        setTilesDisabled(true);
        return "complete";
    }

    gameMessage.textContent = "Good. Keep going.";
    return "correct";
}

async function completeRound() {
    const pointsEarned = gameState.round * difficultySettings[gameState.difficulty].points;

    gameState.score += pointsEarned;
    gameMessage.textContent = `Round complete. ${pointsEarned} points earned.`;
    renderStatus();

    await wait(900);
    generateNextStep();
    renderStatus();
    await playSequence();
}

function endGame() {
    saveHighScore();
    gameState.isPlaying = false;
    gameState.isShowingSequence = false;
    gameMessage.textContent = `Game over. Final score: ${gameState.score}.`;
    lastResult.textContent = `Score ${gameState.score} in round ${gameState.round} on ${gameState.difficulty} mode.`;
    difficultySelect.disabled = false;
    startButton.disabled = false;
    setTilesDisabled(true);
    renderStatus();
}

async function handleWrongInput() {
    gameState.lives -= 1;
    renderStatus();

    if (gameState.lives <= 0) {
        endGame();
        return;
    }

    gameState.playerInput = [];
    gameMessage.textContent = `${gameState.lives} lives left. Watch the round again.`;
    await wait(1000);
    await playSequence();
}

async function handleTileClick(event) {
    if (!gameState.isPlaying) {
        setGameMessage("Press Start before choosing tiles.");
        return;
    }

    if (gameState.isShowingSequence) {
        setGameMessage("Watch the full sequence first, then repeat it.");
        return;
    }

    const selectedTile = Number(event.currentTarget.dataset.tile);

    gameState.playerInput.push(selectedTile);
    await highlightTile(selectedTile);

    const inputResult = checkPlayerInput();

    if (inputResult === "wrong") {
        await handleWrongInput();
        return;
    }

    if (inputResult === "complete") {
        await completeRound();
    }
}

function handleTileKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    event.preventDefault();
    event.currentTarget.click();
}

async function startGame() {
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
    generateNextStep();
    renderStatus();
    await playSequence();
}

async function handleHeroStart(event) {
    event.preventDefault();
    gameSection.scrollIntoView({ behavior: "smooth", block: "start" });
    gameSection.focus({ preventScroll: true });

    if (!gameState.isPlaying) {
        await startGame();
    }
}

function updateDifficulty() {
    gameState.difficulty = difficultySelect.value;
    gameState.lives = difficultySettings[gameState.difficulty].lives;
    gameMessage.textContent = `${gameState.difficulty} mode selected. Press start when ready.`;
    renderStatus();
}

function initGame() {
    loadHighScore();
    setTilesDisabled(true);
    renderStatus();
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
    difficultySelect.addEventListener("change", updateDifficulty);
    clearHighScoreButton.addEventListener("click", clearHighScore);
    heroStartLink.addEventListener("click", handleHeroStart);
    gameTiles.forEach((tile) => {
        tile.addEventListener("click", handleTileClick);
        tile.addEventListener("keydown", handleTileKeydown);
    });
}

initGame();
