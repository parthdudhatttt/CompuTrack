const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');
const { validate4product, validate4delete, validate4updateProduct } = require('../utils/joi.validate');


router.get('/', productController.getProducts);
router.get('/:productNo', productController.getProductByProductNo);
router.post('/', productController.addProduct);
router.post('/upload', productController.uploadImage);
router.put('/update', validate4updateProduct, productController.updateProduct);
router.delete('/delete/:_id', validate4delete, productController.deleteProduct);

module.exports = router;