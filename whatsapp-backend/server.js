import express from "express";
import mongoose from "mongoose";
import "./config.js";
import Cors from "cors";
import Messages from "./models/Messages.js";
import Pusher from "pusher";

// app config
const app = express();
const port = process.env.PORT || 8001;

const DBusername = process.env.DBusername;
const DBpassword = process.env.DBpassword;
const DBname = process.env.DBname;

const pusher = new Pusher({
  appId: process.env.pusherappId,
  key: process.env.pusherkey,
  secret: process.env.pushersecret,
  cluster: process.env.pushercluster,
  useTLS: true,
});

const connection_url = `mongodb+srv://${DBusername}:${DBpassword}@whatsapp-clone.49yww.mongodb.net/${DBname}?retryWrites=true&w=majority`;

// middlewares
app.use(express.json());
app.use(Cors());

// DB config
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

db.once("open", () => {
  console.log("setting up streaming");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      //channel name:messages
      //event name:inserted
      pusher.trigger("messages", "inserted", {
        message: messageDetails.message,
        name: messageDetails.name,
        received: messageDetails.received,
        timestamp: messageDetails.timestamp,
        __v: messageDetails.__v,
        _id: messageDetails._id,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Whatsapp Clone Homepage");
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
