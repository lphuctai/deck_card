import React from 'react';
import './index.css';
import ScoreTable from "../../components/ScoreTable";
import {connect} from "react-redux";

import Player from "../../components/Player";
import GroupButton from "../../components/GroupButton";
import { Modal, Button } from "react-bootstrap";
import * as deckAction from "../../actions/DeckAction";

const App = ({countGame, winnerName, openModal, closeModal}) => {
    return [
        <Modal show={countGame === 5} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Congratulations</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {winnerName + ' won!!!'}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { closeModal() }}>Close</Button>
            </Modal.Footer>
        </Modal>,
        <div className="container">
            <div className="row">
                <div className="col-sm-3 offset-sm-3">
                    <Player id={0}/>
                </div>
                <div className="Pannel col-sm-3 offset-sm-3">
                    <ScoreTable/>
                    <GroupButton/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <Player id={1}/>
                </div>
                <div className="col-sm-3 offset-sm-3">
                    <Player id={2}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3 offset-sm-3">
                    <Player id={3}/>
                </div>
            </div>
        </div>
    ]
};

const mapStateToProp = (state, props) => {
    return {...props, ...state.deck};
};

const mapDispatchToProp = (dispatch, props) => {
    const action = {
        openModal: () => dispatch(deckAction.openModal()),
        closeModal: () => dispatch(deckAction.closeModal())
    };
    return {...props, ...action};
};

export default connect(mapStateToProp, mapDispatchToProp)(App)
