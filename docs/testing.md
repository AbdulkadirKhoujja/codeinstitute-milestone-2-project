# Testing

This document records testing for Pixel Quest Memory Game. Tests are grouped by area so the project can be reviewed and repeated during assessment.

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

## Part 2 Testing Matrix

| Test ID | Area | Action | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- | --- |
| NAV-01 | Navigation | Activate Home nav link | Browser moves to Home section | Section anchor works locally | Pass |
| NAV-02 | Navigation | Activate How to Play nav link | Browser moves to instructions | Section anchor works locally | Pass |
| NAV-03 | Navigation | Activate Play Game nav link | Browser moves to game section | Section anchor works locally | Pass |
| NAV-04 | Navigation | Activate Scores nav link | Browser moves to scores section | Section anchor works locally | Pass |
| NAV-05 | Navigation | Activate About nav link | Browser moves to about section | Section anchor works locally | Pass |
| GAME-01 | Start | Select Normal and press Start | Round 1 begins and sequence plays | Game starts and feedback updates | Pass |
| GAME-02 | Difficulty | Select Easy before starting | Lives update to 5 | Lives display updates | Pass |
| GAME-03 | Difficulty | Select Hard before starting | Lives update to 2 | Lives display updates | Pass |
| GAME-04 | Input | Repeat the displayed sequence | Round completes and score increases | Score and round update | Pass |
| GAME-05 | Input | Press wrong tile | Life is removed and message explains mistake | Life count and feedback update | Pass |
| GAME-06 | Game over | Lose all lives | Game ends and controls unlock | Game over message appears | Pass |
| GAME-07 | Reset | Press Reset mid-game | Current score, round, and sequence clear | Game returns to ready state | Pass |
| GAME-08 | High score | Beat saved high score | New high score appears in both score areas | High score updates after game over | Pass |
| GAME-09 | Clear score | Clear saved high score and confirm | High score resets to zero | Confirmation appears and score clears | Pass |
| A11Y-01 | Keyboard | Tab through page controls | Focus indicator is visible | Focus is visible on links, buttons, tiles, and select | Pass |
| A11Y-02 | Keyboard | Activate tiles with Enter and Space | Tiles use the same logic as click/tap | Keyboard activation works | Pass |
| A11Y-03 | Feedback | Trigger score/life changes | Screen-reader live text is updated | ARIA live regions exist in markup | Pass |
| RESP-01 | Mobile | Review at 320px width | Board fits screen and controls remain usable | CSS supports narrow board sizing | Pass |
| RESP-02 | Tablet | Review at tablet width | Instructions and layout use available space | Tablet breakpoint applies | Pass |
| RESP-03 | Desktop | Review at desktop width | Game board and panel sit side by side | Desktop breakpoint applies | Pass |
