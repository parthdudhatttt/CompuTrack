const express = require('express');
const router = express.Router();

const { warehouseProductController } = require('../controllers');
const { validate4warehouseProduct } = require('../utils/joi.validate');

router.get('/', warehouseProductController.getWarehouseProducts);
router.get('/:id', warehouseProductController.getWarehouseProductById);
router.get('/product/:productNo', warehouseProductController.getWarehouseProductByProductNo);
router.get('/warehouse/:id', warehouseProductController.getWarehouseProductByWarehouse);
router.post('/', validate4warehouseProduct, warehouseProductController.addWarehouseProduct);
router.put('/update', warehouseProductController.updateWarehouseProduct);
router.delete('/delete/:_id', warehouseProductController.deleteWarehouseProduct);

module.exports = router;