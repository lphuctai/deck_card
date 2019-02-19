import React from 'react';
import {connect} from "react-redux";

import * as deckAction from '../../actions/DeckAction'

const GroupButton = (props) => {
    return (
        <div className="GroupButton">
            <button className="GroupButtonItem" onClick={() => {props.shuffleCard()}}>Shuffler</button>
            <button className="GroupButtonItem" onClick={() => {props.drawCard(props.deck_id)}}>Draw</button>
            <button className="GroupButtonItem" onClick={() => {props.revealCard()}}>Reveal</button>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return { ...props, deck_id: state.deck.deck_id };
};

const mapDispatchToProps = (dispatch, props) => {
    const action = {
        shuffleCard: () => dispatch(deckAction.shuffleCard()),
        drawCard: (deck_id) => dispatch(deckAction.drawCard(deck_id)),
        revealCard: () => dispatch(deckAction.revealCard()),
    };
    return {...props, ...action};
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupButton);