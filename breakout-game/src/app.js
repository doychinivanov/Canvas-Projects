import {html, render} from '../node_modules/lit-html/lit-html.js';
import {sendScore} from './api/data.js';

import {gameSets} from './gameVariables.js';
import {draw, setBricks} from './renderGame.js';
import {collidingWithBricks, ballBoardCollision, ballCollidesWithWall, nextLevel, fullHeart, emptyHeart } from './collisions.js'
import {canvas, ctx} from './setContext.js';

window.api = {sendScore};

let game_is_running = true;

let username = '';
const BACKGROUND_IMG = document.getElementById('background');
const LEVEL_HOLDER = document.querySelector('#level-holder');
const SCORE_HOLDER = document.querySelector('#score-holder');
const GAME_OVER_SCREEN = document.querySelector('.game-over');

let leftArrow = false;
let rightArrow = false;


const OPENING_MUSIC = new Audio();
OPENING_MUSIC.src = './assets/sounds/opening-music.mp3';
OPENING_MUSIC.loop = 'true';

const GAME_OVER_MUSIC = new Audio();
GAME_OVER_MUSIC.src = './assets/sounds/game-over.mp3';

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

async function renderGame(){
    ctx.drawImage(BACKGROUND_IMG, 0, 0, canvas.width, canvas.height);
    draw();
    update();
    
    if(gameSets.GAME_STATE != false && game_is_running == true){
        requestAnimationFrame(renderGame);
    }
    
    if(gameSets.GAME_STATE == false) {
        game_is_running = false;
        render(gameOver(), GAME_OVER_SCREEN);
        GAME_OVER_SCREEN.style.display = 'block';
        GAME_OVER_MUSIC.play();
        await sendScore(username, gameSets.score);
        restartGame();
    }
}

function restartGame(){
    GAME_OVER_SCREEN.focus();
    GAME_OVER_SCREEN.style.outline = 'none';
    GAME_OVER_SCREEN.addEventListener('keydown', (ev)=>{
        if(ev.keyCode == 32){
            GAME_OVER_MUSIC.pause();
            GAME_OVER_MUSIC.currentTime = 0;
            GAME_OVER_SCREEN.style.display = 'none';
            render(emptyElement(), GAME_OVER_SCREEN);
            resetParams();
            resetHearts();

            if(!game_is_running){
                game_is_running = true;
                setBricks();
                renderGame();
            }
        }
    })
}

function resetParams(){
    gameSets.GAME_STATE = true;
    gameSets.ball.speed = 4;
    gameSets.ball.dy = -3;
    gameSets.ball.dx = 3 * (Math.random() * 2 -1);
    gameSets.brick.row = 3;
    gameSets.board.dx = 5;
    gameSets.level = 1;
    gameSets.life = [1, 1, 1];
    gameSets.score = 0;
}

function resetHearts(){
    document.querySelector('.lives').innerHTML = ''
    gameSets.life.forEach(x=>{
    const fragment = document.createDocumentFragment();
    x == 1 ? render(fullHeart(), fragment) : render(emptyHeart(), fragment);
    document.querySelector('.lives').appendChild(fragment)
    });
}

function startGame(){
    OPENING_MUSIC.play();

    const STARTING_SCREEN = document.querySelector('.starting-screen');
    STARTING_SCREEN.addEventListener('click', (ev)=>{
        if(ev.target.id == 'start-game'){
            username = document.querySelector('input').value;

            if(username != '' && username.length < 10){
                STARTING_SCREEN.style.display = 'none';
                OPENING_MUSIC.muted = true;
                setBricks();
                renderGame();
            } else {
                 alert("Please insert player's name! Name must be less than 10 characters long.")
            }
        }
    })
}

const gameOver = () => html`
<img src="/assets/skull.jpg" alt="death">

<h1>Game Over</h1>

<h3>Your Score is 1575</h3>

<button id="restart">Press Space to Restart Game</button>
`;

const emptyElement = () => html``;