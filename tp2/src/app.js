const express = require('express')
const app = express()
const port = 3000

const {connectTodB} = require('./services/db/connection.js')
const { insertOne, find, updateOne } = require('./services/db/crud.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectTodB()
  .then(
    // updateOne('template',{title:'test'},{$set:{title:'avatar'}})
  )