const express = require("express")
const router = express.Router()

const HompageRouter = require('./Homepage')
const StudentScoreRouter = require('./StudentScore')
router.use('/', HompageRouter)
router.use('/StudentScore', StudentScoreRouter)

module.exports = router
