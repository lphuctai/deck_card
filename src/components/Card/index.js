import React from 'react';
import PropTypes from 'prop-types';


const Card = ({type, status}) => {
    console.log(status);
    if(status === 'show') {
        return (
            <img className="Card" src={'../../resources/img/' + type + '.png'} alt={'Card ' + type}/>
        )
    } else {
        return (
            <img className="Card" src={'../../resources/img/spade.png'} alt="Back Card"/>
        )
    }
};

Card.propTypes = {
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

export default Card;