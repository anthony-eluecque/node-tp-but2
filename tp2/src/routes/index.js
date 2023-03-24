const express = require('express');
const app = express();
const users = require('./users.js')
const items = require('./items.js');
const watchlists = require('./watchlists.js');


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/',(req,res) => {
    res.send('Welcome on my api');
})

app.use('/users',users)
app.use('/items',items)
app.use('/watchlist',watchlists)

module.exports = app


