//express js
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

//routes
const userRoute = require('./routes/userRoute')
const sheetsRoute = require('./routes/sheetsRoute')
const authRoute = require('./routes/authRoute')

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
)
app.use(express.json())
app.use('/api/v1/user', userRoute)
app.use('/api/v1/sheets', sheetsRoute)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
