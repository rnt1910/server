const router = require('express').Router()
const CourseController = require('../controllers/CourseController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const path = require('path')
const multer = require('multer')
const { Course } = require('../models/models')

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, './previews')
	},
	filename(req, file, callback) {
		callback(
			null,
			file.fieldname + '_' + Date.now() + path.extname(file.originalname)
		)
	},
})

const imageUpload = multer({
	storage,
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
			// upload only png and jpg format
			return cb(new ApiError('Please upload a Image'))
		}
		cb(undefined, true)
	},
})

router.get('/', CourseController.getAllCourses)
router.get('/user/courses', AuthMiddleware, CourseController.getUserCourses)
router.get('/:course/add', AuthMiddleware, CourseController.addCourseToUser)
router.post(
	'/add',
	AuthMiddleware,
	imageUpload.single('image'),
	async (req, res) => {
		const { title, description, video } = req.body
		const course = await Course.create({
			authorId: req.user.id,
			title,
			video,
			description,
			preview: req.file.filename,
		})
		return res.json(course)
	}
)
router.get('/:id', CourseController.getCourse)
router.get('/:id/remove', AuthMiddleware, CourseController.removeCourse)
router.get(
	'/get-admins-courses/stats',
	AuthMiddleware,
	CourseController.getAdminCourses
)

module.exports = router
