const express = require('express')
const router = express.Router()

const {
  getAllProductController,
  getProductBySlugController,
  deleteProductController
} = require('./Product.controller')

router.get('/:slug', getProductBySlugController)
router.get('/', getAllProductController)
router.delete('/delete/:slug', deleteProductController)

module.exports = router


