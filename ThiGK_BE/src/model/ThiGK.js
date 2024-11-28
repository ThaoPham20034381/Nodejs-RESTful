const mongoose = require('mongoose')
const {Schema} = mongoose

const ThiGK = new Schema({
    name: {
        type: String,
        require: true
    },
    mssv: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("ThiGK", ThiGK)