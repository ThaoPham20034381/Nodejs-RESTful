const mongoose = require('mongoose')
const {Schema} = mongoose

const Score = new Schema({
    name: {
        type: String,
        require: true
    },
    mssv: {
        type: String,
        require: true
    },
    tk1: {
        type: Number,
        default: 0
    },
    tk2: {
        type: Number,
        default: 0
    },
    gk: {
        type: Number,
        default: 0
    },
    ck: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Score", Score)