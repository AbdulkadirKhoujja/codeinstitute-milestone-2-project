# Pixel Quest Memory Game Playtest Report

Playtest date: 12 June 2026

Tested version: live GitHub Pages site at `https://abdulkadirkhoujja.github.io/codeinstitute-milestone-2-project/`

Method: first-time-user review supported by Microsoft Edge headless browser automation through Chrome DevTools Protocol.

## First Impression

The game feels clear and immediately recognizable as a memory/pattern game. The title, short intro copy, and bright four-tile board all support the retro memory-game idea well.

The page feels friendly rather than intimidating. The dark arcade style is appropriate, and the main actions are easy to spot.

## Is the Game Purpose Clear?

Yes. Within five seconds, the heading and intro explain that the player watches glowing tiles and repeats the pattern. The game purpose is clear before reading the instructions.

## Is the Start Process Obvious?

Mostly yes. The hero has a Start Game call to action, and the game panel has a Start button.

One small issue: the difficulty selector appears before the player knows what Easy, Normal, and Hard change. It still works, but a first-time player may not immediately understand how difficulty affects lives, speed, and scoring.

## Are the Instructions Clear Enough?

Yes. The four instruction steps are short and easy to understand. They explain watching, repeating, scoring, and losing lives.

The instructions could be improved by adding one sentence that says keyboard users can tab to tiles and use Enter or Space.

## Is the Sequence Easy to Follow?

For the first few rounds, yes. The glowing tile feedback is understandable and the sequence pacing is playable.

As rounds get longer, it would help to have a clearer "Get ready" moment before playback starts. A short countdown or stronger active animation would make the start of each sequence easier to catch.

## Is Feedback Clear After Each Action?

Mostly yes. The messages explain starting, correct progress, wrong input, lives remaining, reset, game over, and high score clearing.

Observed issue: wrong-move feedback can be overwritten quickly by the replay message. During automated play, the life count changed correctly, but the visible message had already moved on to "watch the sequence" by the time it was captured. This is not game-breaking, but it can make mistakes feel slightly rushed.

## Is the Game Too Easy, Too Hard, or Balanced?

The early game is balanced. Easy is forgiving with five lives, Normal feels like the expected default, and Hard becomes risky quickly with two lives.

Hard is fair for a challenge mode, but the player would benefit from a short explanation of each difficulty before starting.

## Are Lives, Score, Round and Difficulty Understandable?

Yes. Score, round, lives, and high score are visible and update as expected.

The score system is not explained in the UI. This is acceptable for basic play, but Part 2 polish could explain that harder difficulties award more points.

## Are Mistakes Handled Kindly?

Yes. The messages are not harsh, and lives give the player room to recover.

The mistake flow would feel kinder if the wrong-input message stayed visible a little longer before replay begins.

## Is the Mobile Experience Usable?

Yes. At around 390px width, the board remained square, the board measured about 352px by 352px, and no horizontal overflow was detected.

The controls and status cards remain usable. The mobile experience is ready for further evidence screenshots.

## Is Keyboard Play Usable?

Yes. Buttons and tiles are keyboard usable, and tiles can be activated from focus with Enter.

Keyboard play would be more discoverable if the instructions mentioned keyboard controls. Focus states are visible enough to support navigation.

## Any Confusing Moments

- Difficulty options do not explain what changes.
- The score calculation is not explained.
- Wrong feedback can disappear quickly when the sequence replay starts.
- Clicking during playback is hard to test manually on short early rounds because playback finishes quickly.

## Any Frustrating Moments

No major frustrating moments were found. The game starts, resets, saves high score, clears high score, and handles mistakes.

The only mild frustration is that the next replay can begin before the player has fully read the mistake feedback.

## What Feels Enjoyable

- The retro colour palette fits the game idea.
- The tile glow is satisfying.
- Rounds build quickly, which gives the game a clear sense of progression.
- Lives make the game forgiving enough for first-time play.
- High score persistence gives the player a reason to retry.

## What Should Be Improved Before Part 2

The game is playable and friendly enough to continue. Before deeper Part 2 evidence work, the most useful improvements would be small UX clarifications rather than a redesign.

Focus on clearer difficulty explanation, more persistent wrong/correct feedback, and a short pre-sequence cue.

## Scores

| Category | Score |
| --- | ---: |
| Clarity | 8/10 |
| Ease of first play | 8/10 |
| Fun | 7/10 |
| Visual friendliness | 8/10 |
| Feedback quality | 7/10 |
| Mobile usability | 8/10 |
| Accessibility | 7/10 |
| Overall readiness for Part 2 | 8/10 |

## Recommended Edits

### Must Fix Before Part 2

- Keep wrong-move feedback visible slightly longer before replaying the sequence.
- Add a short difficulty explanation near the selector, such as Easy = more lives, Normal = balanced, Hard = faster and higher score.
- Add keyboard play guidance to the instructions.

### Nice to Improve in Part 2

- Add a short countdown or "Ready..." message before each sequence starts.
- Strengthen the active tile animation so longer sequences are easier to track.
- Make the game-over message a little warmer, for example by encouraging another run.
- Explain the score multiplier by difficulty.
- Consider a small "Best score saved" message when a new high score is achieved.

### Leave as Is

- The single-page structure is clear.
- The Start and Reset buttons are easy to find.
- The lives, score, round, and high score layout works well.
- The 390px mobile layout is usable.
- The core game loop is working and enjoyable.

## Playtest Evidence Summary

Automated live-site checks completed:

- GitHub Pages site loaded successfully.
- Purpose was clear from title and intro.
- Tile click before start returned a helpful message.
- Easy mode played through at least three successful rounds.
- Normal mode played through at least three successful rounds.
- Hard mode played through at least one successful round.
- Wrong moves reduced lives.
- Reset returned the game to a ready state.
- High score persisted after refresh.
- High score clear showed confirmation and reset the saved score.
- Mobile width around 390px had no horizontal overflow.
- Keyboard tile activation worked.
