# Breakout Game
This is a remake of Atari's original game "Breakout" from the 70s. The purpose of this project is to simply practise the Canvas API.


## Features
* the game imitates the feeling of a 8-bit arcade game
* the user must set a player name for the game;
* at the beginning of the game top 5 scores are presented
* the game implements music for better 8-bit experiance (I do not own the music. It has been taken from youtube)


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
* Score board - displays top 5 best scores and player'name; current player must set a own playername in order to start the game
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