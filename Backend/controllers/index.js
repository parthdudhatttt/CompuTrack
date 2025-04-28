const userController = require('./user.controller');
const categoryController = require('./category.controller');
const warehouseController = require('./warehouse.controller');
const productController = require('./product.controller');
const warehouseProductController = require('./warehouseProduct.controller');
const historyController = require('./history.controller');


module.exports = {
    userController,
    categoryController,
    warehouseController,
    productController,
    warehouseProductController,
    historyController
}
