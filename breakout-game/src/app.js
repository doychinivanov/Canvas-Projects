import {ball, board, brick} from './gameVariables.js';
import {draw, setBricks} from './renderGame.js';
import {collidingWithBricks, ballBoardCollision, ballCollidesWithWall} from './collisions.js'
import {canvas, ctx} from './setContext.js';


canvas.style.border = '1px solid black';
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
    if(rightArrow && board.x + board.width < canvas.width){
        board.x += board.dx;
    } else if(leftArrow && board.x > 0){
        board.x -= board.dx;
    }
}

function moveBall(){
    ball.x += ball.dx,
    ball.y += ball.dy;
}


function update(){
    moveBoard();
    moveBall();
    ballCollidesWithWall();
    ballBoardCollision();
    collidingWithBricks();
}

function render(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();

    requestAnimationFrame(render);
}