import React from 'react';
import {connect} from "react-redux";

import * as deckAction from '../../actions/DeckAction'

const GroupButton = ({deck_id, errorMessage, shuffleStatus, drawStatus, shuffleCard, revealCard, drawCard}) => {
    return (
        <div className="container">
            <div>
                <p className="GroupButtonError">{errorMessage}</p>
            </div>
            {
                shuffleStatus === 'view' ?
                    (<button className="btn btn-success" onClick={() => {
                        shuffleCard()
                    }}>Shuffler</button>) :
                    (<button className="btn btn-success" disabled>Shuffling</button>)
            }
            {
                drawStatus === 'view' ?
                    (<button className="btn btn-primary" onClick={() => {
                        drawCard(deck_id)
                    }}>Draw</button>) :
                    (<button className="btn btn-primary" disabled>Drawing</button>)
            }
            <button className="btn btn-danger" disabled={deck_id ? '' : 'disabled'} onClick={() => {
                revealCard()
            }}>Reveal
            </button>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        ...props,
        deck_id: state.deck.deck_id,
        remaining: state.deck.remaining,
        shuffleStatus: state.deck.shuffleStatus,
        drawStatus: state.deck.drawStatus,
        errorMessage: state.deck.errorMessage
    };
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