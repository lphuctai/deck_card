import * as type from "../constants/DeckActionType";

export const shuffleCard = () => {
    return (dispatch) => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => response.json())
            .then(response => dispatch(shuffleCardDone(response)))
            .catch(error => dispatch(shuffleCardError(error)));
    }
};

export const shuffleCardDone = (data) => {
    return {
        type: type.SHUFFLE_DECK_DONE,
        payload: { ...data }
    };
};

export const shuffleCardError = (message) => {
    return {
        type: type.SHUFFLE_DECK_ERROR,
        payload: { message }
    };
};

export const drawCard = (deckId) => {
    return (dispatch) => {
        fetch('https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=12')
            .then(response => response.json())
            .then(response => {
                if(response.error) {
                    dispatch(drawCardError(response.error))
                } else {
                    dispatch(drawCardDone(response))
                }
            })
            .catch(error => dispatch(drawCardError(error)));
    }
};

export const drawCardDone = (data) => {
    console.log(data);
    return {
        type: type.DRAW_DECK_DONE,
        payload: { ...data }
    };
};

export const drawCardError = (message) => {
    return {
        type: type.DRAW_DECK_ERROR,
        payload: { message }
    };
};

export const revealCard = () => {

};