import React from "react";
import "./css/SidebarChat.css";
import { Avatar } from "@mui/material";

function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>This is the last message send</p>
      </div>
    </div>
  );
}

export default SidebarChat;
