import {html, render} from '../node_modules/lit-html/lit-html.js'

import {gameSets} from './gameVariables.js';
import {canvas} from './setContext.js';
import {setBricks} from './renderGame.js';

const BRICK_SOUND = new Audio();
BRICK_SOUND.src = './assets/sounds/brick-breaker.wav'

const BOARD_SOUND = new Audio();
BOARD_SOUND.src = './assets/sounds/board-sound.wav'

export function collidingWithBricks(){
    for (let r = 0; r < gameSets.brick.row; r++) {
        for (let c = 0; c < gameSets.brick.column; c++) {
            let currentBrick = gameSets.bricks[r][c];
            if(currentBrick.status){
                    if(gameSets.ball.x + gameSets.ball.radius > currentBrick.x 
                        && gameSets.ball.x - gameSets.ball.radius < currentBrick.x + gameSets.brick.width
                        && gameSets.ball.y + gameSets.ball.radius > currentBrick.y 
                        && gameSets.ball.y - gameSets.ball.radius < currentBrick.y + gameSets.brick.height){
                            BRICK_SOUND.play();
                            gameSets.ball.dy = - gameSets.ball.dy;
                            currentBrick.status = false;
                            gameSets.score += gameSets.scoreUnit;
                    }
            }
        }
    }
}


export function ballCollidesWithWall(){
    if(gameSets.ball.x > canvas.width - gameSets.ball.radius || gameSets.ball.x < 0 + gameSets.ball.radius){
        gameSets.ball.dx = - gameSets.ball.dx;
    }

    if(gameSets.ball.y < 0 + gameSets.ball.radius){
        gameSets.ball.dy = - gameSets.ball.dy;
    }

    if(gameSets.ball.y + gameSets.ball.radius > canvas.height){
        // gameSets.life--;
        getLives();
        resetBall();
        resetBoard();

    }
}

export function ballBoardCollision(){
    if(gameSets.ball.x < gameSets.board.x + gameSets.board.width && gameSets.ball.x > gameSets.board.x && gameSets.board.y < gameSets.board.y + gameSets.board.height && gameSets.ball.y > gameSets.board.y){
       
        BOARD_SOUND.play();
        let pointOfCollision = gameSets.ball.x - (gameSets.board.x + gameSets.board.width/2);
        pointOfCollision = pointOfCollision / (gameSets.board.width / 2);

        let angle = pointOfCollision * (Math.PI/3);

        gameSets.ball.dx = gameSets.ball.speed * Math.sin(angle);
        gameSets.ball.dy = - gameSets.ball.speed * Math.cos(angle);
    }
}


function resetBall(){
    gameSets.ball.x = canvas.width / 2;
    gameSets.ball.y = gameSets.board.y - gameSets.ball.radius;
    gameSets.ball.dx = 3 * (Math.random() * 2 -1);
    gameSets.ball.dy = -3;
}

function resetBoard(){
    gameSets.board.x = canvas.width/2 - gameSets.board.width/2;
    gameSets.board.y = canvas.height - 40 - gameSets.board.height;
    gameSets.board.dx = 5;
}

export function nextLevel(){
    let levelComplete = true;

    for (let i = 0; i < gameSets.brick.row; i++) {
        for (let j = 0; j < gameSets.brick.column; j++) {
            levelComplete = levelComplete && gameSets.bricks[i][j].status == false;    
        }

        if(levelComplete){

            if(gameSets.level >= gameSets.LAST_LEVEL){
                gameStats.GAME_STATE = false;
                return;
            }

            gameSets.brick.row++;
            setBricks();
            gameSets.ball.speed += 0.7;
            resetBall();
            gameSets.level++;
        }
        
    }
}

const fullHeart = () => html`<img src="./assets/PikPng.com_heart-art-png_5175219.png" alt="">`;
const emptyHeart = () => html `<img src="./assets/PikPng.com_pixel-heart-png_971526.png" alt="">`;

function getLives(){
    [...document.querySelectorAll('img')].forEach(i => i.remove());
    gameSets.life.shift();
    gameSets.life.push(0);

    gameSets.life.forEach(x=>{
        const fragment = document.createDocumentFragment();
        x == 1 ? render(fullHeart(), fragment) : render(emptyHeart(), fragment);
        document.querySelector('.lives').appendChild(fragment)
    })
}