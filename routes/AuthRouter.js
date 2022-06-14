const AuthController = require('../controllers/AuthController')

const router = require('express').Router()
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.post('/login', AuthController.login)
router.post('/registration', AuthController.registration)
router.get('/check', AuthMiddleware, AuthController.check)

module.exports = router
