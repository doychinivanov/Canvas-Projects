import {gameSets} from './gameVariables.js';
import {ctx} from './setContext.js';



export function setBricks(){
    for (let r = 0; r < gameSets.brick.row; r++) {
        gameSets.bricks[r] = [];
        for (let c = 0; c <  gameSets.brick.column; c++) {
            gameSets.bricks[r][c] = {
                x: c * (gameSets.brick.offSetLeft + gameSets.brick.width) + gameSets.brick.offSetLeft,
                y: r * (gameSets.brick.offSetTop + gameSets.brick.height) + gameSets.brick.offSetTop + gameSets.brick.marginTop,
                status: true,
                color: gameSets.brick.fillColor[r]
            }           
        }
        
    }
}

function drawBricks(){
    for (let r = 0; r < gameSets.brick.row; r++) {
        for (let c = 0; c < gameSets.brick.column; c++) {
            if(gameSets.bricks[r][c].status){
                let currentBrick = gameSets.bricks[r][c];
                ctx.fillStyle = currentBrick.color;
                ctx.fillRect(currentBrick.x, currentBrick.y, gameSets.brick.width, gameSets.brick.height);
            
                ctx.strokeStyle = gameSets.brick.strokeStyle;
                ctx.strokeRect(currentBrick.x, currentBrick.y, gameSets.brick.width, gameSets.brick.height);
            }
        }
        
    }
}

function drawBall(){
    ctx.beginPath();

    ctx.arc(gameSets.ball.x, gameSets.ball.y, gameSets.ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#5C021E';
    ctx.fill();

    ctx.strokeStyle = '#2e3548';
    ctx.stroke();

    ctx.closePath();
}


function drawBoard(){
    ctx.fillStyle = '#2e3548';
    ctx.fillRect(gameSets.board.x, gameSets.board.y, gameSets.board.width, gameSets.board.height);

    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#5C021E';
    ctx.strokeRect(gameSets.board.x, gameSets.board.y, gameSets.board.width, gameSets.board.height);
}

export function draw(){
    drawBoard();
    drawBall();
    drawBricks();
}