# sbeejs
Try it [here](https://sbeejs.onrender.com/)!
Note: The first load can take up to a minute to cold start since Render spins down the web service after inactivity.

## Background
I'm a big fan of NYT's Spelling Bee game, but without a subscription, the game cuts you off from hitting high scores.
My old solution was to continue the daily puzzles on paper, and score my answers with [sbsolver](https://sbsolver.com/).
It works, but it's a little tedious, so I built sbeejs!

## Scoring
The game follows NYT's scoring system:
- 4-letter words earn 1 point
- Longer words earn a point for each letter
- Pangrams (words that use all letters in the puzzle) earn a bonus 7 points

The puzzle letters and solutions are scraped from [sbsolver](https://sbsolver.com/).