import './App.css';
import { useState,useEffect } from 'react';
import io from 'socket.io-client'

let socket;
const CONNECTION_PORT = 'localhost:8000/'

function App() {

  	const [loggedIn, setloggedIn] = useState(false);
	


return (
	<div className="App">
      	{!loggedIn? (
          	<div className="logIn">
				<div className="inputs">
					<input type="text" placeholder='name' />
					<input type="text" placeholder='room code' />
				</div>
            	<button>Enter Chat</button>
          	</div>
        
      	):(
        	<h1>You are logged in</h1> 
      	)}
    </div>
  );
}

export default App;
