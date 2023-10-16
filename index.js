require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const dbConnect = require("./database/index")
const cors = require('cors')

const app = express()
const port = 3333

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  console.log("Esse é meu tcc")
  const user = {
    name: 'Lucas', 
    sobrenome: 'Alves'
  }
  res.send({ user });
})

dbConnect .connectDatabase();

app.listen(port, () => {
  console.log(`Server run in port: ${port}`)
})

require('./controllers/userController')(app);
require('./controllers/instructionController')(app);
require('./controllers/projectController')(app);
require('./controllers/levelController')(app)

//Express - roteamento: https://expressjs.com/pt-br/guide/routing.html
//