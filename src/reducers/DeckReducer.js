import * as type from '../constants/DeckActionType'

const initState = {
    players: [
        {
            id: 1,
            name: 'Anna',
            cards: []
        }, {
            id: 2,
            name: 'Lucy',
            cards: []
        }, {
            id: 3,
            name: 'Peter',
            cards: []
        }, {
            id: 4,
            name: 'Me',
            cards: []
        }
    ],
    scores: [
        {
            id: 1, score: 0
        }, {
            id: 2, score: 0
        }, {
            id: 3, score: 0
        }, {
            id: 4, score: 0
        }
    ],
    deck_id: null,
    remaining: 0,
    shufflingCard: false,
    drawingCard: false,
};

export default function deckReducer (state = initState, action) {
    switch (action.type) {
        case type.SHUFFLE_DECK_DONE:
            return {
                ...state,
                deck_id: action.payload.deck_id
            };
        case type.DRAW_DECK_DONE:
            const cards = action.payload.cards;
            const remaining = action.payload.remaining;
            

            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}