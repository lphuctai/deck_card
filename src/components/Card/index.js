import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './index.css'


const Card = ({card}) => {
    console.log(card.status);
    return (
        <div className="Card">
            <img className={card.status === 'view' ? 'CardImageShow' : 'CardImageHide'}
                src={card.status === 'view' ? '/resources/img/' + card.type + '.png' : '/resources/img/spade.png'}
                 alt={card.status === 'view' ? 'Card ' + card.type : 'Back Card'}/>
        </div>
    );
};

Card.propTypes = {
    card: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        jqk: PropTypes.bool.isRequired,
    }))
};


const mapStateToProps = (state, props) => {
    const player = state.deck.players.filter((player) => {
        return player.id === props.id
    });
    if (player.length > 0) {
        const card = player[0].cards.filter((card) => {
            return card === props.id
        });


        return {...props, card: card[0]};
    }
    return props;
};

export default connect(mapStateToProps)(Card);
