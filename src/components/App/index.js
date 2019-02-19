import React from 'react';
import './index.css';
import Player from "../../components/Player";
import GroupButton from "../../components/GroupButton";


const App = () => (
    <div>
      <table className="AppLayout">
        <tbody>
        <tr>
          <td/>
          <td>
            <Player id={1} />
          </td>
          <td/>
        </tr>
        <tr>
          <td>
            <Player id={2} />
          </td>
          <td/>
          <td>
            <Player id={3} />
          </td>
        </tr>
        <tr>
          <td/>
          <td>
            <Player id={4} />
          </td>
          <td/>
        </tr>
        </tbody>
      </table>

      <GroupButton/>
    </div>
);

export default App;
