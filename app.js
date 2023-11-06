//express js
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: { origin: '*' }
})
const port = 3000

//routes
const userRoute = require('./routes/userRoute')
const sheetsRoute = require('./routes/sheetsRoute')(io)
const authRoute = require('./routes/authRoute')

app.use(cors())
app.use(express.json())
app.use('/users', userRoute)
app.use('/sheets', sheetsRoute)
app.use('/auth', authRoute)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
