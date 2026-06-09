# Testing

Testing notes will be added as the Pixel Quest Memory Game develops.

## Part 1 Browser Smoke Checks

These checks cover the first playable build only. Full validation, Lighthouse evidence, and assessment-ready testing evidence are intentionally left for Part 2.

| Area | Check | Expected Result | Status |
| --- | --- | --- | --- |
| Navigation | Use each main navigation link | Page scrolls to Home, How to Play, Play Game, Scores, and About sections | Pass |
| Start game | Press the Start button | Difficulty locks, round 1 begins, and a tile sequence plays | Pass |
| Hero CTA | Press the hero Start Game link | Page moves focus to the game area and starts a game if one is not running | Pass |
| Tile input | Repeat the displayed sequence | Correct input gives feedback and advances to the next round | Pass |
| Wrong input | Press an incorrect tile | A life is removed and the round replays until lives reach zero | Pass |
| Score tracking | Complete rounds | Score and round displays update after successful rounds | Pass |
| High score | Finish with a new best score | High score is saved in local storage and shown in the game and Scores section | Pass |
| Clear high score | Press Clear High Score | Saved high score resets to zero | Pass |
| Responsive layout | View at mobile, tablet, and desktop widths | Layout remains usable and game tiles stay visible | Pass |
