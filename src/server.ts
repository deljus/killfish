import TBot from 'node-telegram-bot-api';
import express from 'express';

const token = process.env.TOKEN;

if(!token) {
    throw new Error("Token not found")
}

const bot = new TBot(token, { polling: true });

let message = {};

bot.addListener('message', function onPhotoText(msg) {
    message = msg;
});

const app = express();
const APP_PORT = process.env.PORT || 5000;

app.use("*",(req, res) =>{
    res.send(JSON.stringify(message));
});

app.listen(APP_PORT,() => console.log(`hosting @${APP_PORT}`));