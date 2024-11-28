const mongoose = require('mongoose')
const productModel = require('./Product.model.mongodb copy')
const {
  createProduct,
  getAllProduct,
  getProductBySlug,
  getProductByID,
  updateProductBySlug,
  deleteProductBySlug,
  getAllProduct,
  createProduct
} = require('./product.services')


const getAllProductController = async (req,res) =>{
  try {
    const getAllProduct = await getAllProduct()
    res.status(200).json({
      data: getAllProduct
    })
  } catch (error) {
    res.json({
      data: error.message
    })
  }
}

const getProductBySlugController = async (req,res) => {
  try {
    const slug = req.params
    const findBySlug = await getProductBySlug(slug)
    if(findBySlug = null) {
      return res.status(404).json({
        data: 'not found !!!'
      })
    } else {
      res.status(200).json({
        data: findBySlug
      })
    }
  } catch (error) {
    res.status(400).json({
      data: error.message
    })
  }
}

const deleteProductController = async (req,res) => {
  try {
    const slug = req.params
    if(!slug) {
      return res.status(400).json({
        data: 'Missing slug'
      })
    }
    const findProduct = await getProductBySlug(slug)
    if(findProduct = null) {
      return res.status(404).json({
        data: 'not found !!!'
      })
    } else {
      const deleteProduct = await deleteProductBySlug(slug)
      return res.status(200).json({
        data: 'Delete successfully!'
      })
    }
  } catch (error) {
    return res.status(400).json({
      data: error.message
    })
  }
}

module.exports = {
  getAllProductController,
  getProductBySlugController,
  deleteProductController
}

