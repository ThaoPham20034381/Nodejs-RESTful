if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const sv = express()
const expressLayouts  = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const sinhvienRouter = require('./routes/sinhvien')
const methodOverride = require('method-override')

sv.set('view engine', 'ejs')
sv.set('views', __dirname + '/views')
sv.set('layout', 'layouts/layout')
sv.use(expressLayouts)
sv.use(methodOverride('_method'))

sv.use(express.static('public'))
sv.use(express.urlencoded({ extended: true }))
sv.use(express.json())
sv.use(bodyParser.urlencoded({ limit: "50mb", extended: false }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))


sv.use('/', indexRouter)
sv.use('/sinhvien', sinhvienRouter)


sv.listen(process.env.PORT || 3000)