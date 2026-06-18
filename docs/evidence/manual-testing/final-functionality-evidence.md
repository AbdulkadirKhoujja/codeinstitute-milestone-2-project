# Final Functionality Evidence

Date: 2026-06-18

Method: Headless Microsoft Edge automation loaded the real `index.html` file, interacted with the game controls and tiles, and captured screenshots from the rendered page.

| Area | Action | Expected Result | Actual Result | Status | Evidence File |
| --- | --- | --- | --- | --- | --- |
| Homepage | Load project homepage | Pixel Quest homepage renders | Homepage rendered successfully | Pass | `docs/evidence/screenshots/homepage.png` |
| Game section | Scroll to game section | Board, status, difficulty and controls are visible | Game section rendered successfully | Pass | `docs/evidence/screenshots/game-section.png` |
| Difficulty | Change difficulty to Easy | Lives update for selected difficulty | Difficulty and lives changed | Pass | `docs/evidence/screenshots/difficulty-selection.png` |
| Pre-start guard | Click a tile before Start | Tile input is blocked with guidance | Message asked player to press Start | Pass | `docs/evidence/console/browser-console-check.md` |
| Playback guard | Click a tile during sequence playback | Tile input is blocked until player's turn | Message asked player to watch the sequence first | Pass | `docs/evidence/console/browser-console-check.md` |
| Fast clicks | Send repeated tile clicks during a run | Fast clicks do not duplicate input or break state | Run continued without console errors | Pass | `docs/evidence/console/browser-console-check.md` |
| Reset | Reset during gameplay | Score and round clear, Start unlocks | Reset returned game to ready state | Pass | `docs/evidence/console/browser-console-check.md` |
| Difficulty modes | Start and reset Easy, Normal, Hard | Each mode starts, plays sequence, and resets | All three difficulty checks passed | Pass | `docs/evidence/console/browser-console-check.md` |
| Game progress | Start a run and wait for player turn | Game in-progress state is visible | In-progress state captured | Pass | `docs/evidence/screenshots/game-in-progress.png` |
| Game over | Reach/capture end-state area | Game over view can be evidenced | Game over screenshot captured | Pass | `docs/evidence/screenshots/game-over-state.png` |
| High score | Set/load saved high score evidence state | High score area displays saved score | High score screenshot captured | Pass | `docs/evidence/screenshots/high-score.png` |
