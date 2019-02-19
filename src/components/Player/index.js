import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';
import Card from '../Card';

const Player = ({id, name, cards}) => {
    return (
        <div className="player" data-id={id}>
            <div className="player-card">
                {cards.map(card => (
                    <Card type={card.type} status={card.status}/>
                ))}
            </div>
            <div className="player-name">
                {name}
            </div>
        </div>
    );
};

Player.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    card: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired
    }))
};

const mapStateToProps = (state, props) => {
    const player = state.deck.players.filter((player) => {return player.id === props.id});
    if(player.length > 0) {
        return { ...props, ...player[0]};
    }
    return {};
};

export default connect(mapStateToProps)(Player);
