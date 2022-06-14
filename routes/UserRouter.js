const router = require('express').Router()
const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.post('/update', AuthMiddleware, UserController.changeUsername)

module.exports = router
