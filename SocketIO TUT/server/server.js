import express from 'express'
import Cors from 'cors'
import mongoose from 'mongoose'

const app = express();
const port = process.env.PORT || 8001;

app.use(Cors());


app.listen(port, () => {
    console.log(`Listening on localhost:${port}`);
})


