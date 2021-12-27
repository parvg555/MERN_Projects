import './App.css';
import { useState,useEffect } from 'react';
import io from 'socket.io-client'

let socket;
const CONNECTION_PORT = "http://localhost:8001/"

function App() {

	// before logging in
  	const [loggedIn, setloggedIn] = useState(false);
	const [room, setRoom] = useState("");
	const [username, setUsername] = useState('');


	//after logging in
	const [message, setMessage] = useState("");
	const [messageList, setMessageList] = useState([]);

	useEffect(() => {
		socket = io(CONNECTION_PORT);
	},[CONNECTION_PORT]);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			// console.log(data);
			setMessageList([...messageList,data]);
		});
	})

	const connectToRoom = () => {
		setloggedIn(true);
		socket.emit('join_room', room);
	}

	const sendMessage = async () => {
		let messageContent = {
			room: room,
			content: {
				author: username,
				message:message
			}
		}
		await socket.emit("send_message", messageContent);
		setMessageList([...messageList,messageContent.content]);
		setMessage("");
	}

	return (
		<div className="App">
	      	{!loggedIn? (
	          	<div className="logIn">
					<div className="inputs">
						<input 
							type="text" 
							placeholder='name'
							onChange={(e) => {
								setUsername(e.target.value);
							}} 
						/>
						<input 
							type="text" 
							placeholder='room code' 
							onChange={(e) => {
								setRoom(e.target.value);
							}}
						/>
					</div>
	            	<button
						onClick={connectToRoom}
					>
						Enter Chat
					</button>
	          	</div>
	
	      	):(
	        	<div className="chatContainer">
					<div className='messages'>
						{
							messageList.map((data) => {
								return (
									<h1>
										{data.author}
										{data.message}
									</h1>
								)
							})
						}
					</div>
					<div className='message-inputs'>
						<input 
							type="text" 
							value={message}
							placeholder='Message...'
							onChange={(e) => {
								setMessage(e.target.value);
							}} 
						/>
						<button
							onClick={sendMessage}
						>Send</button>
					</div>
				</div>
	      	)}
	    </div>
	);
}

export default App;
