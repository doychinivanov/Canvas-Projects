import {brick, board, ball, gameSets} from './gameVariables.js';
import {ctx} from './setContext.js';



export function setBricks(){
    for (let r = 0; r < brick.row; r++) {
        gameSets.bricks[r] = [];
        for (let c = 0; c < brick.column; c++) {
            gameSets.bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true,
                color: brick.fillColor[Math.floor(Math.random() * 6)]
            }           
        }
        
    }
}

function drawBricks(){
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            if(gameSets.bricks[r][c].status){
                let currentBrick = gameSets.bricks[r][c];
                ctx.fillStyle = currentBrick.color;
                ctx.fillRect(currentBrick.x, currentBrick.y, brick.width, brick.height);
            
                ctx.strokeStyle = brick.strokeStyle;
                ctx.strokeRect(currentBrick.x, currentBrick.y, brick.width, brick.height);
            }
        }
        
    }
}

function drawBall(){
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffcd05';
    ctx.fill();

    ctx.strokeStyle = '#2e3548';
    ctx.stroke();

    ctx.closePath();
}


function drawBoard(){
    ctx.fillStyle = '#2e3548';
    ctx.fillRect(board.x, board.y, board.width, board.height);

    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#ffcd05';
    ctx.strokeRect(board.x, board.y, board.width, board.height);
}

export function draw(){
    drawBoard();
    drawBall();
    drawBricks();
}