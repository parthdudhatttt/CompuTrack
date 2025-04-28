const userSchema = require('./user.model')
const categorySchema = require('./category.model')
const productSchema = require('./product.model')
const historySchema = require('./history.model')
const warehouseSchema = require('./warehouse.model')
const warehouseProductSchema = require('./warehouseProduct.model')

module.exports = {
    userSchema,
    categorySchema,
    productSchema,
    historySchema,
    warehouseSchema,
    warehouseProductSchema
}