import {ctx, canvas} from './setContext.js';

// Brick colors
// const colors = ['#e34c32', '#2ac74c', '#3a4ecf', '#df5fe3', '#d19741', '#41d195', '#a11347'];

// GAME VARIABLES
const boardWidth = 130;
const boardMargin = 40;
const boardHeight = 17;
const ballRadius = 9;

let life = 3;
let score = 0;
const scoreUnit = 15;
const bricks = [];

export const board = {
    x : canvas.width/2 - boardWidth/2,
    y : canvas.height - boardMargin - boardHeight,
    width : boardWidth,
    height : boardHeight,
    dx : 5
};

export const ball = {
    x: canvas.width / 2,
    y : board.y - ballRadius,
    radius : ballRadius,
    speed : 4,
    dx : 3 * (Math.random() * 2 -1),
    dy : -3
}

export const brick = {
    row: 3,
    column : 11,
    width: 55,
    height: 20,
    offSetLeft: 15,
    offSetTop: 13,
    marginTop : 10,
    fillColor : ['#BED661', '#89E894', '#78D5E3', '#7AF5F5', '#34DDDD', '#93E2D5'],
    strokeColor : '#FFF'
}

// ['#e34c32', '#2ac74c', '#3a4ecf', '#df5fe3', '#d19741', '#41d195', '#a11347']
// Math.floor(Math.random() * 7
export const gameSets = {life, score, scoreUnit, bricks}