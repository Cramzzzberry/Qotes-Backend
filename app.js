//express js
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

//routes
const userRoute = require('./routes/userRoute')
const sheetsRoute = require('./routes/sheetsRoute')
const authRoute = require('./routes/authRoute')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/users', userRoute)
app.use('/sheets', sheetsRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
