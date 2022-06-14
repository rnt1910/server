const { Course, UserCourse, User } = require('../models/models')

class CourseController {
	async getAllCourses(req, res, next) {
		const courses = await Course.findAll({ where: {} })
		return res.json(courses)
	}

	async getCourse(req, res, next) {
		const { id } = req.query
		console.log(id)
		const course = await Course.findByPk(id)
		return res.json(course)
	}

	async getUserCourses(req, res, next) {
		const { id } = req.user
		const user = await User.findOne({ where: { id } })
		const courses = await user.getCourses()
		return res.json(courses)
	}

	async addCourseToUser(req, res, next) {
		const { id } = req.query
		const course = await Course.findByPk(id)
		const prevUsers = await course.getUsers()
		await course.setUsers([...prevUsers, req.user.id])
		return res.json(course)
	}

	async removeCourse(req, res, next) {
		const { id } = req.query
		await UserCourse.destroy({
			where: { courseId: id, userId: req.user.id },
		}).then(() => res.json('success'))
	}

	async getAdminCourses(req, res, next) {
		const courses = await Course.findAll({
			where: { authorId: req.user.id },
			include: User,
		})
		return res.json(courses)
	}
}

module.exports = new CourseController()
