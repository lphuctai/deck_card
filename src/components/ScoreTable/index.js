import React from 'react';
import {connect} from 'react-redux';
import './index.css';

const ScoreTable = ({scores}) => {
    return (
        <div>
            <table className="ScoreTable table table-bordered">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {scores.sort((a, b) => {
                    return a.score > b.score
                }).map(score => (
                    <tr>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

const mapStateToProp = (state, props) => {
    const scores = state.deck.scores.sort((a, b) => {
        return b.score - a.score
    });
    return {...props, scores: scores};
};

export default connect(mapStateToProp)(ScoreTable)