import express from 'express';

const app = express();
const APP_PORT = process.env.PORT || 5000;

app.use("*",(req, res) =>{
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});

app.listen(APP_PORT,() => console.log(`hosting 11@${APP_PORT}`));