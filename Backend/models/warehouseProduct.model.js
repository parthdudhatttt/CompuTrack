const mongoose = require('mongoose')
const warehouseProductSchema = new mongoose.Schema({
    warehouse: {
        type: mongoose.Schema.ObjectId, ref: 'warehouse',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId, ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
        required: true
    },
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
})

const warehouseProduct = new mongoose.model("warehouseProduct",warehouseProductSchema,'warehouseProduct')
module.exports = warehouseProduct