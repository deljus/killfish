import Index from './TBot';
import express from 'express';

if(!process.env.TOKEN) {
    console.log("Token not found");
    process.exit();
}

new Index(process.env.TOKEN);

const app = express();

app.use("*",(_, res) =>{
    res.send(JSON.stringify([]));
});

app.use('/static', express.static(__dirname + '/static'));
app.listen(process.env.PORT || 5000);