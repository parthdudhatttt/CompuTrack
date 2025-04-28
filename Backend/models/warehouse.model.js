const mongoose = require('mongoose')
const warehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
})

const warehouse = new mongoose.model("warehouse",warehouseSchema,'warehouse')
module.exports = warehouse