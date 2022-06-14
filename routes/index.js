const router = require('express').Router()
const AuthRouter = require('./AuthRouter')
const CourseRouter = require('./CourseRouter')
const UserRouter = require('./UserRouter')

router.use('/auth', AuthRouter)
router.use('/courses', CourseRouter)
router.use('/user', UserRouter)

module.exports = router
