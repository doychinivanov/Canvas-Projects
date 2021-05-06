import {gameSets} from './gameVariables.js';
import {draw, setBricks} from './renderGame.js';
import {collidingWithBricks, ballBoardCollision, ballCollidesWithWall, nextLevel} from './collisions.js'
import {canvas, ctx} from './setContext.js';

const BACKGROUND_IMG = document.getElementById('background');
const LEVEL_HOLDER = document.querySelector('#level-holder');
const SCORE_HOLDER = document.querySelector('#score-holder');


let leftArrow = false;
let rightArrow = false;

setBricks()
render();


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

function render(){
    ctx.drawImage(BACKGROUND_IMG, 0, 0, canvas.width, canvas.height);
    draw();
    update();

    if(gameSets.GAME_STATE != false){
        requestAnimationFrame(render);
    }    
}