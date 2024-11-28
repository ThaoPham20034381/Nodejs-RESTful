const express = require('express')
const HomePageRouter = express.Router()

HomePageRouter.get('/', (req, res) => {
    res.render('index')
})

module.exports = HomePageRouter