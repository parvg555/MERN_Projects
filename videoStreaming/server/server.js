import express from "express";
import Cors from 'cors';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(Cors());

app.get('/video',(req,res) => {
    const range = req.headers.range;
    if(!range){
        console.log('requires range header');
        res.status(400).send("Requires Range Header");
    }
    const videoPath = "./assets/video/bigbuck.mp4";
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10**6;
    const start = Number(range.replace(/\D/g,""));
    const end = Math.min(start + CHUNK_SIZE, videoSize -1);

    const contentLength = end-start+1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }
    res.writeHead(206,headers);
    const videoStream = fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res);
})


app.listen(port, () => {
    console.log(`Listening to localhost:${port}`)
})