import {brick, board, ball, gameSets} from './gameVariables.js';
import {canvas} from './setContext.js';

export function collidingWithBricks(){
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let currentBrick = gameSets.bricks[r][c];
            if(currentBrick.status){
                    if(ball.x + ball.radius > currentBrick.x 
                        && ball.x - ball.radius < currentBrick.x + brick.width
                        && ball.y + ball.radius > currentBrick.y 
                        && ball.y - ball.radius < currentBrick.y + brick.height){
                            ball.dy = - ball.dy;
                            currentBrick.status = false;
                            gameSets.score += gameSets.scoreUnit;
                    }
            }
        }
    }
}


export function ballCollidesWithWall(){
    if(ball.x > canvas.width - ball.radius || ball.x < 0 + ball.radius){
        ball.dx = - ball.dx;
    }

    if(ball.y < 0 + ball.radius){
        ball.dy = - ball.dy;
    }

    if(ball.y + ball.radius > canvas.height){
        gameSets.life--;
        resetBall();
        resetBoard();

    }
}

export function ballBoardCollision(){
    if(ball.x < board.x + board.width && ball.x > board.x && board.y < board.y + board.height && ball.y > board.y){
       
        let pointOfCollision = ball.x - (board.x + board.width/2);
        pointOfCollision = pointOfCollision / (board.width / 2);

        let angle = pointOfCollision * (Math.PI/3);

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}


function resetBall(){
    ball.x = canvas.width / 2;
    ball.y = board.y - ball.radius;
    ball.dx = 3 * (Math.random() * 2 -1);
    ball.dy = -3;
}

function resetBoard(){
    board.x = canvas.width/2 - board.width/2;
    board.y = canvas.height - 40 - board.height;
    board.dx = 5;
}