const mongoose = require('mongoose')
const { productModel } = require('./Product.model.mongodb copy')

const createProduct = async (data) => {
  try {
    if(!data) {
      Error = 'Không có dữ liệu'
      throw Error
    }
    const createProductDatabase = await productModel.create(data).exec()
    return createProductDatabase
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getAllProduct = async () => {
  try {
    const getAll = await productModel.find()
    return getAll
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getProductBySlug = async (slug) => {
  try {
    const findBySlug = await productModel.findOne({ slug }).exec()
    if(!findBySlug) {
      return null
    } else {
      return findBySlug
    }
  } catch (error) {
    console.log(error)
    return error.message
  }
}

const getProductByID = async (_id) => {
  try {
    const findById = await productModel.findById(_id).exec()
    if(!findById) {
      return null
    } else {
      return findById
    }
  } catch (error) {
    console.log(error)
    return error.message
  }
}

const updateProductBySlug = async (slug,data) => {
  try {
    if(!slug) {
      return null
    }
    const updateProduct = await productModel.findOneAndUpdate( slug, data, {new: true})
    return updateProduct
  } catch (error) {
    console.log(error)
    return error.message
  }
}

const deleteProductBySlug = async (slug) => {
  try {
    const deleteProduct = productModel.deleteOne(slug)
    return deleteProduct
  } catch (error) {
    console.log(error)
    return error.message
  }
}

module.exports = {
  createProduct,
  getAllProduct,
  getProductBySlug,
  getProductByID,
  updateProductBySlug,
  deleteProductBySlug
}

