import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { pusherkey, pushercluster } from "./credentials.js";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher(pusherkey, {
      cluster: pushercluster,
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newmessage) {
      setMessages([...messages, newmessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
