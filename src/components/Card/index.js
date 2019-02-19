import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import image from '../../constants/CardImage.js';
import './index.css'



const Card = ({card}) => {
    return (
        <div className="Card">
            {
                card.status === 'view' ? (
                    <img className="CardImageShow"
                         src={image['C_' + card.type]}
                         alt={'Card ' + card.type}/>
                ) : (
                    <img className="CardImageHide"
                         src={image.C_SPADE}
                         alt="Back Card"/>
                )
            }
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
