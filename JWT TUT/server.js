import mongoose from 'mongoose'
import express from 'express'
import "./config.js";
import Cors from 'cors';
import Authrouter from './routes/auth.js';
import Posts from './routes/posts.js';

//app config
const app = express();
const port = process.env.PORT || 8001;
const DBusername = process.env.DBusername;
const DBpassword = process.env.DBpassword;
const DBname = process.env.DBname;
const DBcluster = process.env.DBcluster;

app.use(express.json());
app.use(Cors());


//Route Middleware

app.use(Authrouter);
app.use(Posts);

const connection_url = `mongodb+srv://${DBusername}:${DBpassword}@${DBcluster}.mongodb.net/${DBname}?retryWrites=true&w=majority`;

mongoose
  .connect(connection_url)
  .then((result) => {
    console.log("Connected to database");
    app.listen(port, () => console.log(`Listening on localhost:${port}`));
  })
  .catch((err) => {
    console.log("Error Connecting to database");
  });

const db = mongoose.connection;
