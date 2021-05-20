# Breakout Game
This is a remake of Atari's original game "Breakout" from the 70s. The purpose of this project is to simply practise the Canvas API.


## Features
* User registration
* Each user has a profile, which contains statistics for the current user - their results, filtered from highest to lowest, as well as all the quizzes created by them
* User Authentication - only logged in users can solve and create quizzes. Only quiz author can edit or delete their own quizzes. A guest can only browse through the quizzes.
* Diffrent topics, by which quizzes can be filtered
* Interactive quizz editor
* Timer, which tracks the time for taking the quizz. When the time is over the quiz submits automatically as it is in the moment the time ends. The amount of time is set up by the quiz author.
* QuizzMe is a responsive application, meaning it can be used on all devices - mobile, tablets, PC


## Technologies
* Canvas API
* HTML5
* SASS
* CSS3
* JavaScript
* lit-html
* Back4app

## Views
* Game field - the space in which the game takes place
* Information board - keeps track of current level, score and remaining lives
* Score board - displays top 5 best scores and player'name; current play must set a own playername in order to start the game
* Game over - displays the achived score at the time when the last remaining life is lost; reset game option
* You won the game - displays when all levels are completed successfully

## Data Structure
### Collections
* PLayer
```javascript
{
    objectId: String
    playerName: String,
    score: Number,
}
```