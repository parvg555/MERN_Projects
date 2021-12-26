import express from 'express'
import Cors from 'cors'
import mongoose from 'mongoose'
import { Server, Socket } from 'socket.io';

const app = express();
const port = process.env.PORT || 8001;


app.use(express.json());
app.use(Cors());


const server = app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})

io = Socket(server)

io.on('connection', (socket)=>{
    console.log(socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('USER JOINED ROOM: ' + data);
    })

    


    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
})