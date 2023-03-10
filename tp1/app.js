const { request } = require('express');
const express = require('express');
const app = express();
const process = require("process")
const port = 3000;
let requests = {
    "status":"healthy",
    "requestsCount":{}
};

app.use((req, res, next) => {
    console.log("[" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]: " + req.url);
    next();
});

app.use((req,res,next) => {
    requests["requestsCount"][req.path] =  (requests["requestsCount"][req.path] || 0 ) + 1;
    next();
});


app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.get('/welcome',(req,res) => {
    res.status(200).send("Bienvenue sur le TP 1 du cours d'architecture logicielle");
})

app.get('/error',(req,res) => {
    res.status(500).json({Message:"Message d'erreur"});
})
 
app.get('/secret',(req,res) => {
    res.status(401).send("Vous ne possédez pas les droits pour accéder à ma page secrète");
})

app.get('/img',(req,res) => {
    console.log("test");
})

app.get('/redirectMe',(req,res) => {
    res.redirect('http://extra.univ-littoral.fr/');
})

app.get('/users/:name',(req,res) => {
    res.status(200).send("Bienvenue sur la page de "+req.params.name);
})

app.get('/somme',(req,res) => {
    res.status(200).send((parseInt(req.query.a)+parseInt(req.query.b)).toString());
})

app.get('/metrics',(req,res) => {

    res.status(200).json(
        {
            "status":requests.status,
            "requestsCount":requests.requestsCount,
            "startTime":process.uptime()
        }
    );
})

app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: "Not found"
    })
   })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
