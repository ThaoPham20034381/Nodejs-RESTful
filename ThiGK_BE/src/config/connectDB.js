const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ThiGK')
        console.log('connect to MongoDB sucessfully...')
    } catch {
        console.log(error)
    }
}

module.exports = connectDB