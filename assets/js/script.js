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
const tileNames = ["cyan", "pink", "yellow", "green"];

const difficultySettings = {
    easy: {
        lives: 5,
        tileDuration: 430,
        playbackDelay: 950,
        points: 10
    },
    normal: {
        lives: 3,
        tileDuration: 380,
        playbackDelay: 760,
        points: 20
    },
    hard: {
        lives: 2,
        tileDuration: 330,
        playbackDelay: 580,
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
    isShowingSequence: false,
    isAcceptingInput: false,
    playbackId: 0
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

function clearTileHighlights() {
    gameTiles.forEach((tile) => {
        tile.classList.remove("is-active");
    });
}

function isCurrentRun(runId) {
    return runId === gameState.playbackId && gameState.isPlaying;
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
    if (gameState.highScore === 0) {
        setGameMessage("There is no saved high score to clear.");
        return;
    }

    const shouldClear = window.confirm("Clear the saved Pixel Quest high score?");

    if (!shouldClear) {
        setGameMessage("High score was kept.");
        return;
    }

    localStorage.removeItem(highScoreStorageKey);
    gameState.highScore = 0;
    setGameMessage("High score cleared. Your saved best score is now zero.");
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
    gameState.isAcceptingInput = false;
    gameState.playbackId += 1;
    clearTileHighlights();
    setGameMessage("Game reset. Choose a difficulty and press Start.");
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

async function flashTile(tileIndex, runId = gameState.playbackId) {
    if (runId !== gameState.playbackId) {
        return false;
    }

    const tile = gameTiles[tileIndex];

    tile.classList.remove("is-active");
    await wait(40);

    if (runId !== gameState.playbackId) {
        return false;
    }

    tile.classList.add("is-active");
    await wait(difficultySettings[gameState.difficulty].tileDuration);
    tile.classList.remove("is-active");

    await wait(80);
    return runId === gameState.playbackId;
}

async function playSequence(runId = gameState.playbackId) {
    if (!isCurrentRun(runId)) {
        return false;
    }

    gameState.isShowingSequence = true;
    gameState.isAcceptingInput = false;
    setTilesDisabled(true);
    setGameMessage(`Round ${gameState.round}. Watch the sequence...`);

    await wait(800);

    for (const tileIndex of gameState.sequence) {
        if (!isCurrentRun(runId)) {
            return false;
        }

        const highlighted = await flashTile(tileIndex, runId);

        if (!highlighted || !isCurrentRun(runId)) {
            return false;
        }

        await wait(difficultySettings[gameState.difficulty].playbackDelay);
    }

    if (!isCurrentRun(runId)) {
        return false;
    }

    gameState.isShowingSequence = false;
    gameState.isAcceptingInput = true;
    setGameMessage("Your turn: repeat the pattern.");
    setTilesDisabled(false);
    return true;
}

function checkPlayerInput() {
    const currentIndex = gameState.playerInput.length - 1;
    const expectedTile = gameState.sequence[currentIndex];
    const selectedTile = gameState.playerInput[currentIndex];

    if (selectedTile !== expectedTile) {
        setGameMessage(`Not quite, ${tileNames[selectedTile]} was not next. You lost one life.`);
        setTilesDisabled(true);
        return "wrong";
    }

    if (gameState.playerInput.length === gameState.sequence.length) {
        setGameMessage("Nice! Next round.");
        setTilesDisabled(true);
        return "complete";
    }

    setGameMessage("Correct so far. Continue the pattern.");
    return "correct";
}

async function completeRound() {
    const runId = gameState.playbackId;
    const pointsEarned = gameState.round * difficultySettings[gameState.difficulty].points;

    gameState.score += pointsEarned;
    gameState.isAcceptingInput = false;
    setGameMessage(`Nice! Round ${gameState.round} complete. You earned ${pointsEarned} points.`);
    renderStatus();

    await wait(1100);

    if (!isCurrentRun(runId)) {
        return;
    }

    generateNextStep();
    renderStatus();
    await playSequence(runId);
}

function endGame(runId = gameState.playbackId) {
    if (runId !== gameState.playbackId) {
        return;
    }

    saveHighScore();
    gameState.isPlaying = false;
    gameState.isShowingSequence = false;
    gameState.isAcceptingInput = false;
    gameState.playbackId += 1;
    setGameMessage(`Game over. Try again, your high score is saved. Final score: ${gameState.score}.`);
    lastResult.textContent = `Score ${gameState.score} in round ${gameState.round} on ${gameState.difficulty} mode.`;
    difficultySelect.disabled = false;
    startButton.disabled = false;
    setTilesDisabled(true);
    renderStatus();
}

async function handleWrongInput() {
    const runId = gameState.playbackId;

    gameState.lives -= 1;
    gameState.isAcceptingInput = false;
    renderStatus();

    if (gameState.lives <= 0) {
        endGame(runId);
        return;
    }

    gameState.playerInput = [];
    setGameMessage(`Not quite, you lost one life. ${gameState.lives} lives left. Watch again.`);
    await wait(1500);

    if (!isCurrentRun(runId)) {
        return;
    }

    await playSequence(runId);
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

    if (!gameState.isAcceptingInput) {
        setGameMessage("Hold on, wait for your turn prompt.");
        return;
    }

    const runId = gameState.playbackId;
    const selectedTile = Number(event.currentTarget.dataset.tile);

    gameState.isAcceptingInput = false;
    gameState.playerInput.push(selectedTile);

    const highlighted = await flashTile(selectedTile, runId);

    if (!highlighted || !isCurrentRun(runId)) {
        return;
    }

    const inputResult = checkPlayerInput();

    if (inputResult === "wrong") {
        await handleWrongInput();
        return;
    }

    if (inputResult === "complete") {
        await completeRound();
        return;
    }

    gameState.isAcceptingInput = true;
    setTilesDisabled(false);
}

async function startGame() {
    gameState.playbackId += 1;
    gameState.sequence = [];
    gameState.playerInput = [];
    gameState.score = 0;
    gameState.round = 0;
    gameState.lives = difficultySettings[gameState.difficulty].lives;
    gameState.isPlaying = true;
    gameState.isShowingSequence = false;
    gameState.isAcceptingInput = false;
    clearTileHighlights();
    setGameMessage("Game started. Get ready to watch the sequence...");
    difficultySelect.disabled = true;
    startButton.disabled = true;
    setTilesDisabled(true);
    generateNextStep();
    renderStatus();
    await playSequence(gameState.playbackId);
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
    setGameMessage(`${gameState.difficulty} mode selected. Lives and scoring have been updated. Press Start when ready.`);
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
    });
}

initGame();
