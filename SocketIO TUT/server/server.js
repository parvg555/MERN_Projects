import express from 'express'
import Cors from 'cors'
import mongoose from 'mongoose'
import {Server, Socket } from 'socket.io';
import http from 'http';

const app = express();
const port = process.env.PORT || 8001;


app.use(express.json());
app.use(Cors());

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors : {
        origin:"*",
    },
});

app.get("/",(req,res) => {
    return res.send("hello ji");
})

io.sockets.on("connection", (socket) => {
    console.log("NEW CONNECTION")
    console.log(socket.id);
    socket.on("join_room" ,(data) => {
        socket.join(data);
        console.log("USER JOINED ROOM: " + data);
    })

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
    })

    socket.on("message", (data) => {
        console.log(data);
        socket.emit("message",data);
    })

    socket.on("disconnect" , () => {
        console.log("USER DISCONNECTED");
    })
})


httpServer.listen(port, () => {
    console.log(`listening to localhost:${port}`);
})

