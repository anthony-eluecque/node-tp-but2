const express = require('express');
const app = express();
const users = require('./users.js')

app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome on my api');
})

app.use('/users',users)


module.exports = app


