import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';
import Card from '../Card';

const Player = ({id, name, cards}) => {
    return (
        <div className="Player" data-id={id}>
            <div className="PlayerCards">
                {cards.map(card => (
                    <Card card={card} />
                ))}
            </div>
            <div className="PlayerName">
                {name}
            </div>
        </div>
    );
}

Player.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        jqk: PropTypes.bool.isRequired,
    })).isRequired
};

const mapStateToProps = (state, props) => {
    const player = state.deck.players.filter(player => player.id === props.id)[0];
    return { ...props, ...player};
};

export default connect(mapStateToProps)(Player);
