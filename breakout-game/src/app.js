import {html, render} from '../node_modules/lit-html/lit-html.js';

import {gameSets} from './gameVariables.js';
import {draw, setBricks} from './renderGame.js';
import {collidingWithBricks, ballBoardCollision, ballCollidesWithWall, nextLevel} from './collisions.js'
import {canvas, ctx} from './setContext.js';

const BACKGROUND_IMG = document.getElementById('background');
const LEVEL_HOLDER = document.querySelector('#level-holder');
const SCORE_HOLDER = document.querySelector('#score-holder');
const GAME_OVER_SCREEN = document.querySelector('.game-over');

let leftArrow = false;
let rightArrow = false;


const OPENING_MUSIC = new Audio();
OPENING_MUSIC.src = './assets/sounds/opening-music.mp3';
OPENING_MUSIC.loop = 'true';

document.querySelector('#continue').addEventListener('click', (ev)=>{
    document.querySelector('.welcoming-msg').style.display = 'none';
    document.querySelector('.lives').style.display = 'block';
    startGame();
})


document.addEventListener('keydown', (ev)=>{
    if(ev.keyCode == 37){
        leftArrow = true;
    } else if(ev.keyCode == 39){
        rightArrow = true;
    }
});

document.addEventListener('keyup', (ev)=>{
    if(ev.keyCode == 37){
        leftArrow = false;
    } else if(ev.keyCode == 39){
        rightArrow = false;
    }
});

function moveBoard(){
    if(rightArrow && gameSets.board.x + gameSets.board.width < canvas.width){
        gameSets.board.x += gameSets.board.dx;
    } else if(leftArrow && gameSets.board.x > 0){
        gameSets.board.x -= gameSets.board.dx;
    }
}

function moveBall(){
    gameSets.ball.x += gameSets.ball.dx,
    gameSets.ball.y += gameSets.ball.dy;
}

function update(){
    moveBoard();
    moveBall();
    ballCollidesWithWall();
    ballBoardCollision();
    collidingWithBricks();
    nextLevel();
    SCORE_HOLDER.textContent = gameSets.score;
    LEVEL_HOLDER.textContent = gameSets.level;
}

function renderGame(){
    ctx.drawImage(BACKGROUND_IMG, 0, 0, canvas.width, canvas.height);
    draw();
    update();

    if(gameSets.GAME_STATE != false){
        requestAnimationFrame(renderGame);
    } else {
        GAME_OVER_SCREEN.style.display = 'block';
        render(gameOver(), GAME_OVER_SCREEN);
    }
}

function startGame(){
    OPENING_MUSIC.play();

    const STARTING_SCREEN = document.querySelector('.starting-screen');
    STARTING_SCREEN.addEventListener('click', (ev)=>{
        if(ev.target.id == 'start-game'){
            STARTING_SCREEN.style.display = 'none';
            OPENING_MUSIC.muted = true;
            setBricks()
            renderGame();
        }
    })
}

const gameOver = () => html`
<img src="/assets/skull.jpg" alt="death">

<h1>Game Over</h1>

<h3>Your Score is 1575</h3>

<button id="restart">Play Again</button>
`;