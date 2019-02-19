import React from 'react';
import './index.css';
import ScoreTable from "../../components/ScoreTable";
import {connect} from "react-redux";

import Player from "../../components/Player";
import GroupButton from "../../components/GroupButton";


const App = ({countGame, winnerName}) => {
    if(countGame === 5) {
        setTimeout(() => {
            alert(winnerName + ' is winner today!!!');
            window.location.reload();
        }, 500);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3 col-sm-offset-3">
                    <Player id={0}/>
                </div>
                <div className="col-sm-3 col-sm-offset-3">
                    <ScoreTable/>
                    <GroupButton/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3">
                    <Player id={1}/>
                </div>
                <div className="col-sm-3 col-sm-offset-3">
                    <Player id={2}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3 col-sm-offset-3">
                    <Player id={3}/>
                </div>
            </div>
        </div>
    )
};

const mapStateToProp = (state, props) => {
    return { ...props, ...state.deck};
};

export default connect(mapStateToProp)(App)
