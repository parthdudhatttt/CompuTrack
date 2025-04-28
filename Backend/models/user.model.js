const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
})

const user = new mongoose.model("user",userSchema,'user')
module.exports = user