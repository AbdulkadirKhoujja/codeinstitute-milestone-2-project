# Gameplay Regression Report

Date: 12 June 2026

## Suspected Part 1 Good Commit

Final Part 1 commit: `9f6e9c5 test: add initial browser smoke notes`

This is the last commit before Part 2 accessibility, responsive, testing, and documentation work began.

## Current HEAD Commit

Current HEAD before fixes: `b4976e7 docs: finalise assessment-ready README presentation`

## Files Compared

- `assets/js/script.js`
- `assets/css/style.css`
- `index.html`

Comparison range:

`git diff 9f6e9c5..HEAD -- assets/js/script.js assets/css/style.css index.html`

## History Inspected

Part 2 commits that changed `assets/js/script.js`:

- `146856a feat: improve aria live game feedback`
- `c2b94c0 feat: improve keyboard accessibility`
- `11fbcb0 feat: prevent invalid game actions`
- `c03a782 feat: improve game status messages`
- `641820a fix: refine reset and new game behaviour`
- `bbfb70e fix: refine high score clearing flow`

Part 2 commits that changed `assets/css/style.css`:

- `146856a feat: improve aria live game feedback`
- `546d773 style: strengthen visible focus states`
- `49f63e1 style: improve colour contrast`
- `11fbcb0 feat: prevent invalid game actions`
- `61b2794 style: polish responsive game board`
- `71dfd78 style: polish desktop layout`

Part 2 commits that changed `index.html`:

- `146856a feat: improve aria live game feedback`
- `c2b94c0 feat: improve keyboard accessibility`

## Gameplay Changes Introduced After Part 1

- Tiles changed from native disabled buttons to focusable buttons with `aria-disabled`.
- A custom tile `keydown` handler was added even though buttons already trigger click events with keyboard activation.
- Async playback cancellation was added with `playbackId`, but not every async path checks it.
- Game messages became more detailed, but some messages can be overwritten quickly by replay or playback messages.
- Reset/new game handling improved in some cases, but reset during delayed wrong-input or round-complete windows can still leave follow-up async work running.

## Likely Causes of Bugs

1. **Native disabled behavior was removed.**
   Part 1 used `tile.disabled = true`, so the browser blocked pointer and keyboard input during playback. Part 2 replaced this with `aria-disabled`, which is better for explaining blocked actions but requires stronger JavaScript guards.

2. **Rapid clicks can overlap.**
   `handleTileClick()` awaits `highlightTile()` before checking the input. If a player clicks multiple tiles quickly, multiple handler calls can push values into `playerInput` before the first check finishes.

3. **Keyboard activation can duplicate.**
   Buttons already fire click events for Enter and Space. The added `keydown` handler also calls `.click()`, so keyboard play can double-handle one input in some browsers.

4. **Async continuations can survive reset.**
   `completeRound()` and `handleWrongInput()` wait before continuing. If Reset happens during those waits, the delayed function can still call `generateNextStep()` or `playSequence()` afterward.

5. **`playSequence()` can return early with stale state.**
   When called after a reset from an older async path, it can set `isShowingSequence` before returning, which may make Start appear unresponsive.

## Likely Causes of Increased Difficulty

- Hard mode playback is fast enough to feel abrupt for first-time players.
- Wrong-input feedback can disappear quickly because the replay sequence starts soon after the life-loss message.
- There is no short countdown before sequence playback, so players can miss the first tile if they are still reading the message.
- Difficulty changes are not explained near the selector.

## Recommended Fixes

- Keep Part 2 accessibility improvements, including `aria-disabled`, live regions, and focus styles.
- Add a real JavaScript input lock so only one tile input is processed at a time.
- Remove the custom keyboard `.click()` handler and rely on native button keyboard behavior.
- Add a run token that cancels delayed round-complete and wrong-input continuations after reset or new game.
- Make `playSequence()` verify the token before changing state and before unlocking input.
- Slightly slow Easy and Normal playback, and make Hard fast but still readable.
- Add friendlier feedback messages and a short "watch" delay before playback.

## Initial Playtest Notes

Current live playtest confirmed:

- GitHub Pages loaded successfully.
- Easy, Normal, and Hard can be played.
- High score saves and clears.
- Mobile layout around 390px has no horizontal overflow.
- Keyboard activation works, but the custom handler risks duplicate input.
- Wrong-move feedback and rapid-input behavior need stabilization.

## Post-Fix Test Results

Post-fix checks were run locally against the modified `index.html`, `assets/css/style.css`, and `assets/js/script.js` using Microsoft Edge headless automation.

| Check | Result | Notes |
| --- | --- | --- |
| Easy 3 rounds | Pass | Score reached 60, round advanced to 4, lives stayed at 5 |
| Normal 2 rounds | Pass | Score reached 60, round advanced to 3 |
| Hard 1 round | Pass | Score reached 35, round advanced to 2 |
| Wrong input | Pass | One life was removed and the same round replayed |
| Continue after life lost | Pass | Player could complete the replayed sequence |
| Reset | Pass | Score, round, lives, sequence, and prompt returned to ready state |
| Restart after reset | Pass | A clean new game started and scored correctly |
| Rapid clicks blocked | Pass | Rapid extra tile clicks did not double-handle the turn |
| Click during playback blocked | Pass | Playback state did not accept the click as player input |
| Keyboard input | Pass | Space activation on a focused tile scored once and did not duplicate |
| High score persistence | Pass | High score survived refresh |
| Clear high score | Pass | Confirmation flow cleared the saved score |
| Mobile 390px | Pass | Board stayed square with no horizontal overflow |

## Fix Summary

- Added `isAcceptingInput` to block rapid or overlapping tile inputs.
- Removed the custom tile `keydown` click handler and relied on native button keyboard behavior.
- Added run-token checks to delayed round progression and wrong-input replay.
- Ensured reset and new game cancel stale async playback before it can update state.
- Kept `aria-disabled`, live regions, and focus accessibility improvements from Part 2.
- Slowed playback slightly and added friendlier messages for watch, turn, correct, wrong, and game-over states.
- Added difficulty and keyboard guidance to the interface.
