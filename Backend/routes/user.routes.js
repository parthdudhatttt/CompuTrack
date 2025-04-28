const express = require("express")
const router = express.Router()

const { userController } = require('../controllers')
const { validate4login, validate4register } = require('../utils/joi.validate')


router.post('/register', validate4register, userController.register)
router.post('/login', validate4login, userController.login)

module.exports = router