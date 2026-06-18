# Testing

This document records testing for Pixel Quest Memory Game. Tests are grouped by area so the project can be reviewed and repeated during assessment.

## Part 1 Browser Smoke Checks

These checks cover the first playable build. Final validation, Lighthouse evidence, and assessment-ready testing evidence are recorded in the later sections of this document.

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
| NAV-06 | 404 navigation | Activate Back to Home link on 404 page | Browser returns to homepage | Link points to `index.html#home` | Pass |
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
| DEPLOY-01 | 404 page | Visit a non-existent project page | GitHub Pages shows a clear not-found page with a homepage link | Local 404 page exists and matches project styling | Pass |

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

## Final Assessment Test Evidence Matrix

These checks were completed on 2026-06-18 with headless Microsoft Edge automation and local source checks.

| Test Area | Action | Expected Result | Actual Result | Pass/Fail | Evidence File |
| --- | --- | --- | --- | --- | --- |
| Functionality | Load homepage | Homepage renders with Pixel Quest content | Homepage rendered | Pass | `docs/evidence/screenshots/homepage.png` |
| Functionality | Open game section | Board, status values, controls, and difficulty selector are visible | Game section rendered | Pass | `docs/evidence/screenshots/game-section.png` |
| Functionality | Change difficulty | Lives/scoring mode updates before game start | Difficulty evidence captured | Pass | `docs/evidence/screenshots/difficulty-selection.png` |
| Functionality | Start game and wait for turn | Sequence playback completes and player input unlocks | In-progress evidence captured | Pass | `docs/evidence/screenshots/game-in-progress.png` |
| Functionality | Click tile before Start | Input is blocked with helpful message | Message asked player to press Start | Pass | `docs/evidence/console/browser-console-check.md` |
| Functionality | Click tile during playback | Input is blocked until playback ends | Message asked player to watch sequence | Pass | `docs/evidence/console/browser-console-check.md` |
| Functionality | Fast-click tiles during a run | One click path is handled at a time and state remains stable | No console errors or state break captured | Pass | `docs/evidence/console/browser-console-check.md` |
| Functionality | Reset during gameplay | Score, round, sequence, timers, and controls reset | Reset check passed | Pass | `docs/evidence/console/browser-console-check.md` |
| Functionality | Start Easy, Normal, and Hard | Each mode starts, plays one sequence, and resets | All three difficulty checks passed | Pass | `docs/evidence/console/browser-console-check.md` |
| Functionality | Capture game over state | End-state/game-over area can be evidenced | Game over screenshot captured | Pass | `docs/evidence/screenshots/game-over-state.png` |
| Functionality | Load high score state | Saved high score appears in score area | High score screenshot captured | Pass | `docs/evidence/screenshots/high-score.png` |
| Responsive | Render mobile viewport | Layout remains usable at mobile width | Mobile screenshot captured | Pass | `docs/evidence/responsive/mobile-view.png` |
| Responsive | Render tablet viewport | Layout remains usable at tablet width | Tablet screenshot captured | Pass | `docs/evidence/responsive/tablet-view.png` |
| Responsive | Render desktop viewport | Desktop layout uses available space | Desktop screenshot captured | Pass | `docs/evidence/responsive/desktop-view.png` |
| Browser | Run automated browser console check | No runtime exceptions or browser log errors | Zero errors captured | Pass | `docs/evidence/console/browser-console-check.md` |
| Keyboard | Focus Start button and capture focus state | Visible keyboard focus is present | Focus screenshot captured | Pass | `docs/evidence/manual-testing/keyboard-focus-testing.png` |
| Accessibility | Use ARIA status regions and keyboard-usable buttons/tiles | Dynamic status and tile controls are accessible | Markup and browser checks passed | Pass | `docs/evidence/console/browser-console-check.md` |
| Deployed Site | Load GitHub Pages URL | Live site loads Pixel Quest homepage | Deployed screenshot captured | Pass | `docs/evidence/deployment/deployed-live-site.png` |
| 404 Handling | Load 404 page | Clear not-found page includes homepage link | 404 screenshot captured | Pass | `docs/evidence/deployment/404-page.png` |

## Responsive Testing

| Test ID | Viewport | Checks Performed | Result | Evidence |
| --- | --- | --- | --- | --- |
| RESP-320 | 320px mobile | Header wraps, board remains square, buttons fit width | Pass | Covered by responsive CSS and mobile evidence |
| RESP-360 | 360px mobile | Tile spacing and status cards remain usable | Pass | Covered by responsive CSS and mobile evidence |
| RESP-390 | 390px mobile | Game board fits without horizontal scrolling | Pass | `docs/evidence/screenshots/index-mobile-390.png` |
| RESP-768 | Tablet | Instructions and layout use available space | Pass | `docs/evidence/screenshots/index-tablet.png` |
| RESP-1366 | Desktop | Game board and panel display side by side | Pass | `docs/evidence/screenshots/index-desktop.png` |

Responsive screenshots are saved in `docs/evidence/screenshots/` and embedded in `README.md`.

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

Keyboard evidence is saved in `docs/evidence/manual-testing/keyboard-focus-game-tile.png` and embedded in `README.md`.

## Bugs and Fixes

| Bug ID | Issue | Cause | Fix | Status |
| --- | --- | --- | --- | --- |
| BUG-01 | Tiles gave no feedback when pressed before starting | Tiles were disabled, so the click handler could not explain the blocked action | Replaced native disabled state with `aria-disabled` and added helpful invalid-action messages | Fixed |
| BUG-02 | Reset during sequence playback could allow stale playback to finish | The async playback loop had no cancellation guard | Added `playbackId` checks and cleared active tile highlights on reset/new game | Fixed |
| BUG-03 | Clear high score deleted immediately | The action had no confirmation step | Added confirmation prompt and no-score message | Fixed |
| BUG-04 | Some dynamic status updates were visual only | Status values changed on screen but were not summarized for assistive technology | Added ARIA live status region and screen-reader-only status announcer | Fixed |
| BUG-05 | Small mobile widths risked cramped tile sizing | Game board used fixed tile minimums below 360px | Added fluid board width and mobile-specific square sizing | Fixed |
| BUG-06 | Browser tab icon was unreliable on GitHub Pages | Some browsers ignored the SVG-only favicon or requested root `favicon.ico` | Added PNG favicon fallbacks, Apple touch icon, and root `favicon.ico` | Fixed |
| BUG-07 | Lecturer feedback noted `aria-disabled` alone does not block clicks | Visual disabled state was not enough as a JavaScript interaction contract | Centralized tile input guards and timer cancellation so pre-start, playback, fast-click, reset, and difficulty transitions are blocked in code | Fixed |

No known unresolved bugs remain at the time of the final assessment check.

## Broken Links and Source Clean-Up

| Area | Action | Expected Result | Actual Result | Status | Evidence File |
| --- | --- | --- | --- | --- | --- |
| Internal links | Check favicon, stylesheet, and anchor paths from `index.html` | Paths resolve locally | All checked paths passed | Pass | `docs/evidence/manual-testing/final-link-check.md` |
| External links | Check HTML for `target="_blank"` links | Any new-tab links include `rel="noopener noreferrer"` | No `target="_blank"` links are present in `index.html` or `404.html` | Pass | `docs/evidence/manual-testing/final-link-check.md` |
| Commented-out code | Search source files for HTML/CSS/JS commented-out code | No unnecessary commented-out code remains | Only intentional JavaScript section comments found | Pass | `docs/evidence/manual-testing/final-link-check.md` |

## Local Validation Checks

Local checks were run during Part 2 and recorded in [local-validation-results.md](evidence/validation/local-validation-results.md).

| Check | Result |
| --- | --- |
| JavaScript syntax with `node --check assets/js/script.js` | Pass |
| CSS brace balance check | Pass |
| ARIA/live-region markup spot check | Pass |
| File naming spot check | Pass with `README.md` noted as the required conventional exception |

W3C validation screenshots, Lighthouse reports, and Lighthouse summary screenshots are embedded in `README.md`. Final local validation follow-up notes are recorded in `docs/evidence/validation/final-validation-summary.md`, including the timed-out fresh `html-validate` attempt.

## Gameplay Regression Re-Test

After fixing the Part 2 gameplay regression, the following local checks were completed with Edge headless automation:

| Test ID | Check | Result |
| --- | --- | --- |
| REG-01 | Easy mode completes 3 rounds | Pass |
| REG-02 | Normal mode completes 2 rounds | Pass |
| REG-03 | Hard mode completes 1 round | Pass |
| REG-04 | Wrong input removes one life and replay continues | Pass |
| REG-05 | Reset clears state and restart works | Pass |
| REG-06 | Rapid tile clicks do not double-handle input | Pass |
| REG-07 | Tile clicks during playback are blocked | Pass |
| REG-08 | Keyboard tile activation does not duplicate input | Pass |
| REG-09 | High score persists after refresh | Pass |
| REG-10 | Clear high score works | Pass |
| REG-11 | Mobile 390px layout remains usable | Pass |
| REG-12 | Easy, Normal, and Hard sequence playback flashes each sequence step once | Pass |

Detailed notes are recorded in [gameplay-regression-report.md](gameplay-regression-report.md).
