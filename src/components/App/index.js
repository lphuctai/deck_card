import React from 'react';
import './index.css';
import Player from "../../components/Player";
import GroupButton from "../../components/GroupButton";


const App = () => (
    <div className="container">
      <div className="row">
        <div className="col-sm-3 col-sm-offset-3">
          <Player id={0} />
        </div>
        <div className="col-sm-3 col-sm-offset-3">
          <GroupButton/>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3">
          <Player id={1} />
        </div>
        <div className="col-sm-3 col-sm-offset-3">
          <Player id={2} />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-3 col-sm-offset-3">
          <Player id={3} />
        </div>
      </div>

    </div>
);

export default App;