import BotAPI from 'node-telegram-bot-api';
import TBot from './TBot';
import express from 'express';

if(!process.env.TOKEN) {
    console.log("Token not found");
    process.exit();
}

new TBot(process.env.TOKEN);

const app = express();

app.use("*",(_, res) =>{
    res.send(JSON.stringify([]));
});

app.listen(process.env.PORT || 5000);