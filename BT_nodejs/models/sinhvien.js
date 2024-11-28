const mongoose = require('mongoose')

const sinhvienSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    MSSV: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Class: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sinhvien', sinhvienSchema)