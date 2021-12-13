import express  from 'express'
import mongoose from 'mongoose'
import './config.js'
import Cards from './models/dbCards.js'
import Cors from 'cors';

// App Config
const app = express();
const port = process.env.PORT || 8001;
const DBusername = process.env.DBusername;
const DBpassword = process.env.DBpassword;
const DBname = process.env.DBname;
const connection_url = `mongodb+srv://${DBusername}:${DBpassword}@cluster0.9ujpd.mongodb.net/${DBname}?retryWrites=true&w=majority`

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(connection_url);

// API endpoints
app.get('/',(req,res) => res.status(200).send('Hello Clever Programmers!'));

app.post('/tinder/cards', (req,res) => {
    const dbCard = req.body;
    Cards.create(dbCard,(err,data)=>{
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});

app.get('/tinder/cards', (req,res) => {
    Cards.find((err,data) => {
        if (err) {
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
}); 

// Listener
app.listen(port,() => console.log(`Listening on localhost: ${port}`))