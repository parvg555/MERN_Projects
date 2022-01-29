import './App.css';

import {Player} from 'video-react';

import "../node_modules/video-react/dist/video-react.css";

function App() {
  return (
    <div className="App">
      {/* <video width="650" controls muted="muted">
        <source  src="http://localhost:8001/video" type="video/mp4"/>
      </video> */}

      <Player
        fluid={false}
        src="http://localhost:8001/video"
      />
    </div>
  );
}

export default App;
