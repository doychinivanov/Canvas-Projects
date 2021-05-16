import {ctx, canvas} from './setContext.js';

// Brick colors
// const colors = ['#e34c32', '#2ac74c', '#3a4ecf', '#df5fe3', '#d19741', '#41d195', '#a11347'];

// GAME VARIABLES
const boardWidth = 130;
const boardMargin = 40;
const boardHeight = 17;
const ballRadius = 9;
let GAME_STATE = true;

let level = 1;
let life = [1, 1, 1];
let score = 0;
const LAST_LEVEL = 7;
let gameHasBeenWon = false;
const scoreUnit = 15;
const bricks = [];

const board = {
    x : canvas.width/2 - boardWidth/2,
    y : canvas.height - boardMargin - boardHeight,
    width : boardWidth,
    height : boardHeight,
    dx : 5
};

const ball = {
    x: canvas.width / 2,
    y : board.y - ballRadius,
    radius : ballRadius,
    speed : 4,
    dx : 3 * (Math.random() * 2 -1),
    dy : -3
}

const brick = {
    row: 3,
    column : 11,
    width: 55,
    height: 20,
    offSetLeft: 15,
    offSetTop: 13,
    marginTop : 10,
    fillColor : ['#3A152C', '#582A74', '#3A3392', '#3A4D1C', '#58742A' ,'#7E2A1A', '#BD3F28', '#E8B155', '#EFCB8D', '#C3C9DB'],
    strokeColor : '#FFF'
}

export const gameSets = {level, life, board, ball, score, scoreUnit, bricks, brick, LAST_LEVEL, GAME_STATE, gameHasBeenWon}