const express = require('express');
const router = express.Router();

const { categoryController } = require('../controllers');


router.get('/', categoryController.getCategories)  
router.post('/', categoryController.addCategory)
router.delete('/delete/:_id', categoryController.deleteCategory)


module.exports = router