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
            id: 0, score: 0
        }, {
            id: 1, score: 0
        }, {
            id: 2, score: 0
        }, {
            id: 3, score: 0
        }
    ],
    deck_id: '',
    remaining: 0,
    shuffleStatus: 'view',
    drawStatus: 'view',
    errorMessage: ''
};

export default function deckReducer (state = initState, action) {
    switch (action.type) {
        case type.SHUFFLE_DECK:
            return {
                ...state,
                shuffleStatus: 'fetching'
            };
        case type.SHUFFLE_DECK_DONE:
            return {
                ...state,
                deck_id: action.payload.deck_id,
                shuffleStatus: 'view',
                errorMessage: ''
            };
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
            for(let i = 0, j = 0; i < cards.length; i++) {
                if(i > 0 && i % 3 === 0) {
                    j ++;
                }
                const card = cards[i];
                players[j].cards.push({
                    id: i % 3,
                    type: card.code,
                    status: 'view',
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
        default:
            return state
    }
}

function cardValue(code) {
    let firstCode = code.substring(0, 1);
    if(parseInt(firstCode)) {
        return parseInt(firstCode);
    }
    if(firstCode === 'A') {
        return 1;
    }
    return 10;
}

function cardIsJQK(code) {
    let firstCode = code.substring(0, 1);
    if(parseInt(firstCode)) {
        return false;
    }
    if(firstCode === 'A') {
        return false;
    }
    return true;
}