const express = require("express");
const request = require("request");

const bodyParser = require('body-parser');

const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 80;

app.use(bodyParser.json());

// app.get("/", (req, res)=> {
//     res.send(fs.readFileSync("./pages/index.html").toString());
//     res.end();
// });



app.get("/class/:class", (req, res)=>{
    // req.params.class = req.params.class.toUpperCase();
    if (!fs.readdirSync(`./planyKlas/`).includes(`${req.params.class}.html`)) {
        return res.status(404).send(fs.readFileSync("./pages/404.html").toString());
    }
    //strona
    res.status(200).send(fs.readFileSync(`./planyKlas/${req.params.class}.html`).toString());
    return;
});

app.get("/teacher/:teacher", (req, res)=>{
    // req.params.teacher = req.params.teacher.toUpperCase();
    if (!fs.readdirSync(`./planyNauczycieli/`).includes(`${req.params.teacher}.html`)) {
        return res.status(404).send(fs.readFileSync("./pages/404.html").toString());
    }
    res.status(200).send(fs.readFileSync(`./planyNauczycieli/${req.params.teacher}.html`).toString());
    return;
});

app.get("/room/:room", (req, res)=>{
    // req.params.room = req.params.room.toUpperCase();
    if (!fs.readdirSync(`./planySal/`).includes(`${req.params.room}.html`)) {
        return res.status(404).send(fs.readFileSync("./pages/404.html").toString());
    }
    res.status(200).send(fs.readFileSync(`./planySal/${req.params.room}.html`).toString());
    return;
});

app.get("*", (req, res)=>{
    res.status(404).send("Nie wiem co tu kurde robisz, jeśli znalazłeś jakiś błąd pisz na discord: iThomash#0209");
})
app.listen(port, () => {
    console.log("Plany nauczycieli");
    console.log("Nasłuchuje na: " + port);
});