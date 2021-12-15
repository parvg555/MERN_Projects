import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./css/Chat.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { IconButton } from "@mui/material";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import axios from "../axios";

function Chat({ messages }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "parvg555",
      timestamp: "just now",
      received: true,
    });
    setInput("");
  };

  return (
    <div className="chat">
      {/* chatheader */}
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h4>Room Name</h4>
          <p>Last Seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </div>
      {/* chatbody */}
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.received ? "chat__receiver" : ""
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonOutlinedIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <IconButton>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
