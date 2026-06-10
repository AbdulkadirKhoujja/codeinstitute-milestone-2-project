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

## Game Functionality Testing

The following checks were performed locally against the current HTML, CSS, and JavaScript files.

| Test ID | Scenario | Steps | Result |
| --- | --- | --- | --- |
| FUNC-01 | Start a game | Open the page, choose Normal, press Start | Difficulty locks, round 1 starts, sequence plays |
| FUNC-02 | Complete a round | Repeat the highlighted tile sequence correctly | Score increases and next round is generated |
| FUNC-03 | Continue sequence | Complete multiple correct rounds | Sequence length increases by one each round |
| FUNC-04 | Wrong input | Press a tile that does not match the sequence | Message explains the wrong input and lives decrease |
| FUNC-05 | Replay after mistake | Make a mistake while lives remain | Same round is replayed before input unlocks |
| FUNC-06 | Game over | Lose all available lives | Game over message displays and Start becomes available |
| FUNC-07 | Reset | Press Reset during a run | Score, round, sequence, and input return to ready state |
| FUNC-08 | Invalid tile action | Press a tile before starting | Message tells the player to press Start first |
| FUNC-09 | Invalid playback action | Press a tile while sequence is playing | Message tells the player to watch the full sequence |
| FUNC-10 | High score save | Finish with a score above the stored high score | High score updates in both displayed areas |
| FUNC-11 | High score clear | Press Clear High Score and confirm | Stored score resets to zero and UI updates |

## Responsive Testing

| Test ID | Viewport | Checks Performed | Result | Evidence |
| --- | --- | --- | --- | --- |
| RESP-320 | 320px mobile | Header wraps, board remains square, buttons fit width | Pass | Screenshot still required |
| RESP-360 | 360px mobile | Tile spacing and status cards remain usable | Pass | Screenshot still required |
| RESP-390 | 390px mobile | Game board fits without horizontal scrolling | Pass | Screenshot still required |
| RESP-768 | Tablet | Instruction cards use two columns and content remains readable | Pass | Screenshot still required |
| RESP-1366 | Desktop | Game board and panel display side by side | Pass | Screenshot still required |

Responsive screenshots should be saved in `docs/evidence/screenshots/` when generated.

## Keyboard Testing

| Test ID | Check | Expected Result | Actual Result | Status |
| --- | --- | --- | --- | --- |
| KEY-01 | Tab through header navigation | Each link receives a visible focus state | Visible focus shown | Pass |
| KEY-02 | Tab to Start and Reset buttons | Buttons receive visible focus and activate with Enter/Space | Buttons are keyboard usable | Pass |
| KEY-03 | Tab to difficulty select | Select receives visible focus and can be changed from keyboard | Select is keyboard usable | Pass |
| KEY-04 | Tab to game tiles | Each tile receives visible focus | Tile focus is visible | Pass |
| KEY-05 | Activate game tiles with Enter | Tile input is recorded through same handler as click | Tile works | Pass |
| KEY-06 | Activate game tiles with Space | Tile input is recorded through same handler as click | Tile works | Pass |
| KEY-07 | Trigger invalid tile action by keyboard | Helpful text message is shown | Message explains the blocked action | Pass |

Keyboard screenshots should be saved in `docs/evidence/manual-testing/` when generated.

## Bugs and Fixes

| Bug ID | Issue | Cause | Fix | Status |
| --- | --- | --- | --- | --- |
| BUG-01 | Tiles gave no feedback when pressed before starting | Tiles were disabled, so the click handler could not explain the blocked action | Replaced native disabled state with `aria-disabled` and added helpful invalid-action messages | Fixed |
| BUG-02 | Reset during sequence playback could allow stale playback to finish | The async playback loop had no cancellation guard | Added `playbackId` checks and cleared active tile highlights on reset/new game | Fixed |
| BUG-03 | Clear high score deleted immediately | The action had no confirmation step | Added confirmation prompt and no-score message | Fixed |
| BUG-04 | Some dynamic status updates were visual only | Status values changed on screen but were not summarized for assistive technology | Added ARIA live status region and screen-reader-only status announcer | Fixed |
| BUG-05 | Small mobile widths risked cramped tile sizing | Game board used fixed tile minimums below 360px | Added fluid board width and mobile-specific square sizing | Fixed |
