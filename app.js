//express js
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const { Server } = require('socket.io')

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN
  }
})
const port = 3000
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

//routes
const userRoute = require('./routes/userRoute')
const sheetsRoute = require('./routes/sheetsRoute')(io)
const authRoute = require('./routes/authRoute')

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)
app.use(express.json())
app.use('/users', userRoute)
app.use('/sheets', sheetsRoute)
app.use('/auth', authRoute)

app.get('/', (req, res) => {
  res.send('hello world')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
