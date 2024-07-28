import { dirname } from "path"
import { fileURLToPath } from "url"
import express from "express"
import qr from "qr-image"
import fs from "fs"

const app = express();
const port = 5000;
app.use(express.urlencoded({extended: true}))

const __dirname = dirname(fileURLToPath(import.meta.url));
var username;
var URL;

app.use(express.static(__dirname))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/submit", (req, res) => {
    username = req.body.username;
    URL = req.body.url;
    var qr_svg = qr.image(URL, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('QR-image.png'));
    if(username && URL){
        res.sendFile(__dirname + "/index2.html");
    }
    if(!username && !URL){
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(port, ()=>{
    console.log(`Server running fine on http://localhost:${port}`)
})