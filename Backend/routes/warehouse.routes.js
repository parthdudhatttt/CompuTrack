const express = require('express');
const router = express.Router();

const { warehouseController } = require('../controllers');

router.get('/', warehouseController.getWarehouses);
router.get('/:_id', warehouseController.getWarehouseById);
router.post('/', warehouseController.addWarehouse);
router.put('/update', warehouseController.updateWarehouse);
router.delete('/delete/:_id', warehouseController.deleteWarehouse);

module.exports = router