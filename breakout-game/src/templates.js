import {html, render} from '../node_modules/lit-html/lit-html.js';


export const landingTemp = (bestPlayers) => html`
    <h1>Breakout</h1>

    <h3>Best Scores</h3>

    <ul class="scores">
        ${bestPlayers.map(listTemp)}
    </ul>

    <form>
        <input type="text" placeholder='Player Name' autofocus >
    </form>

    <p id="start-game">Start Now</p>
`;

const listTemp =  (player) => html`
    <li>${player.playerName} - ${player.score}</li>
`;