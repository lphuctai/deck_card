import * as type from '../constants/DeckActionType'

const initState = {
    players: [
        {
            id: 0,
            name: 'Anna',
            cards: []
        }, {
            id: 1,
            name: 'Lucy',
            cards: []
        }, {
            id: 2,
            name: 'Peter',
            cards: []
        }, {
            id: 3,
            name: 'Me',
            cards: []
        }
    ],
    scores: [
        {
            id: 0,
            name: 'Anna',
            score: 0,
        }, {
            id: 1,
            name: 'Lucy',
            score: 0,
        }, {
            id: 2,
            name: 'Peter',
            score: 0,
        }, {
            id: 3,
            name: 'Me',
            score: 0,
        }
    ],
    deck_id: '',
    remaining: 0,
    shuffleStatus: 'view',
    drawStatus: 'view',
    errorMessage: '',
    countGame: 0,
    winnerName: ''
};

export default function deckReducer(state = initState, action) {
    switch (action.type) {
        case type.SHUFFLE_DECK:
            return {
                ...state,
                shuffleStatus: 'fetching'
            };
        case type.SHUFFLE_DECK_DONE:
            const tmpState = JSON.parse(JSON.stringify(state));
            tmpState.players.map(player => {
                player.cards = [];
                return player;
            });
            if(tmpState.countGame === 5) {
                tmpState.countGame = 0;
                tmpState.deck_id = '';
                tmpState.players.map(player => {
                    player.cards = [];
                    return player;
                });
                tmpState.scores.map(score => {
                    score.score = 0;
                    return score;
                });
            }
            tmpState.deck_id = action.payload.deck_id;
            tmpState.shuffleStatus = 'view';
            tmpState.errorMessage = '';
            return {...state, ...tmpState};
        case type.SHUFFLE_DECK_ERROR:
            return {
                ...state,
                deck_id: action.payload.deck_id,
                shuffleStatus: 'view',
                errorMessage: action.payload
            };

        case type.DRAW_DECK:
            return {
                ...state,
                drawStatus: 'fetching'
            };
        case type.DRAW_DECK_DONE:
            const cards = action.payload.cards;
            const remaining = action.payload.remaining;
            const players = JSON.parse(JSON.stringify(state.players));
            players.map(player => {
                player.cards = [];
                return player;
            });
            for (let i = 0, j = 0; i < cards.length; i++) {
                if (i > 0 && i % 3 === 0) {
                    j++;
                }
                const card = cards[i];
                players[j].cards.push({
                    id: i % 3,
                    type: card.code,
                    status: 'hide',
                    value: cardValue(card.code),
                    jqk: cardIsJQK(card.code)
                })
            }
            return {
                ...state,
                players: players,
                remaining: remaining,
                drawStatus: 'view',
                errorMessage: ''
            };
        case type.DRAW_DECK_ERROR:
            return {
                ...state,
                drawStatus: 'view',
                errorMessage: action.payload
            };
        case type.REVEAL_DECK:
            const stateTmp = JSON.parse(JSON.stringify(state));
            let result = [];
            stateTmp.players.map((player) => {
                let total = player.cards.reduce((sum = 0, item) => {
                    console.log(sum);
                    return (sum + item.value) % 10
                }, 0);
                let boots = player.cards.reduce((sum, item) => {
                    return sum + (item.jqk & 1)
                }, 0);
                if (boots === 3) {
                    total = 1000;
                }
                result[player.id] = total;
                player.cards.map(card => {
                    card.status = 'view';
                    return card;
                });
                return player;
            });
            let max = Math.max.apply(null, result);
            let countEqual = 0, winerId = [];
            result.forEach((item, key) => {
                if (item === max) {
                    countEqual++;
                    winerId.push(key);
                }
            });
            let point = 5000 * 4 / Math.max(1, countEqual);
            stateTmp.scores.map((score) => {
                if (winerId.indexOf(score.id) !== -1) {
                    score.score += point
                }
                return score;
            });
            stateTmp.countGame ++;
            if(stateTmp.countGame === 5) {
                let winnerId = [];
                let winnerName = [];
                let max = 0;
                for(let i = 0; i < stateTmp.scores[i].score.length; i ++) {
                    if(stateTmp.scores[i].score > max) {
                        max = stateTmp.scores[i].score;
                    }
                }
                for(let i = 0; i < stateTmp.scores.length; i ++) {
                    if(stateTmp.scores[i].score === max) {
                        winnerId.push(stateTmp.scores[i].id);
                    }
                }
                for(let i = 0; i < stateTmp.players.length; i ++) {
                    if(winerId.indexOf(stateTmp.players[i].id) !== -1) {
                        winnerName.push(stateTmp.players[i].name);
                    }
                }
                stateTmp.winnerName = winnerName.join(', ');
            }
            return {...state, ...stateTmp};
        case type.SHOW_RESULT:

        default:
            return state
    }
}

function cardValue(code) {
    let firstCode = code.substring(0, 1);
    if (parseInt(firstCode)) {
        return parseInt(firstCode);
    }
    if (firstCode === 'A') {
        return 1;
    }
    return 10;
}

function cardIsJQK(code) {
    let firstCode = code.substring(0, 1);
    if (parseInt(firstCode)) {
        return false;
    }
    if (firstCode === 'A') {
        return false;
    }
    return true;
}