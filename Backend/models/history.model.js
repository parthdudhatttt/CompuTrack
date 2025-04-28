const mongoose = require('mongoose')
const historySchema = new mongoose.Schema({
    warehouse: {
        type: mongoose.Schema.ObjectId, ref: 'warehouse',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId, ref: 'product',
        required: true
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    type: {
        type: String,
        required: true,
        enums: [ 'outgoing', 'incoming' ]
    },
    quantity: {
        type: Number,
        required: true
    },
    total_profit: {
        type: Number,
        required: true
    },
},
{
    timestamps: true,
    versionKey: false,
    autoCreate: true,
})

const history = new mongoose.model("history",historySchema,'history')
module.exports = history