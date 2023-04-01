const express = require('express');
const app = express();
const users = require('./users.js');
const items = require('./items.js');
const watchlists = require('./watchlists.js');

app.set("views",process.cwd()+"/src/views");
app.set("view engine","pug");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(req,res) => {
    res.render('index');
})

app.get('/user',(req,res) => {
    res.render('user');
})

app.get('/watchlist',(req,res) => {
    res.render('watchlist');
})

app.get('/item',(req,res) => {
    res.render('item');
})

app.use('/users',users);
app.use('/items',items);
app.use('/watchlists',watchlists);

module.exports = app;


