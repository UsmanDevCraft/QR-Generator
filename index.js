import { dirname } from "path"
import { fileURLToPath } from "url"
import express from "express"
import qr from "qr-image"

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
    if(username && URL){
    var qr_svg = qr.imageSync(URL, { type: 'png' });
    const qrCodeBase64 = Buffer.from(qr_svg).toString('base64');
    const qrCodeImageSrc = `data:image/png;base64,${qrCodeBase64}`;
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
                body{
                    width: 100vw;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    overflow-x: hidden;
                }
                .container{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .heading{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            </style>
            <body>
                <div class="container">
                    <h1 class="heading">Here is your QR Code.</h1>
                    <img src="${qrCodeImageSrc}" alt="qr-code">
                    <a href="${qrCodeImageSrc}" download="QR-image.png"><button>Download Image</button></a>
                </div>
            </body>
            </html>
        `);
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(port, ()=>{
    console.log(`Server running fine on http://localhost:${port}`)
})