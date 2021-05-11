import * as api from './api.js';

const host = 'https://parseapi.back4app.com/classes/Player';
api.settings.host = host;

export async function sendScore(player, score){
    const body = {playerName: player, score};

    return await api.post(host, body);
}

export async function getBest(){
    const best = await api.get(host + '/?order=-score&limit=5');

    return best.results;
}