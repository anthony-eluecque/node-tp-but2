const {connectTodB} = require('./services/db/connection.js')
app = require("./routes/index.js")

const createServer = () => {
  connectTodB()
  app.listen(3000);
  console.log('Ecoute le port 3000');
}

createServer()