const express = require('express')
const sv = express()
const expressLayouts  = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const connectDB = require('./config/connectMongodb')
require('dotenv').config()

const port = process.env.PORT

// sv.set('view engine', 'ejs')
// sv.set('views', __dirname + '/views')
// sv.set('layout', 'layouts/layout')
// sv.use(expressLayouts)
// sv.use(methodOverride('_method'))

sv.use(express.static('public'))
sv.use(express.urlencoded({ extended: true }))
sv.use(express.json())
sv.use(bodyParser.urlencoded({ limit: "50mb", extended: false }))
app.use(bodyParser.json());

sv.use('/', indexRouter)

connectDB()

sv.listen(port, () => {
    console.log('listening on localhost:'+ port)
})