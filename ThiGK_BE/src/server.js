const express = require('express')
const app = express()
const cors = require('cors')
const Router = require('./routes/api')
const port = 3000
const connectDB = require('./config/connectDB')
connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use('/', Router)
app.listen(port, () => {
    console.log(`App listening on ${port}`)
})