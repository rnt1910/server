const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, email) => {
	return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AuthController {
	async registration(req, res, next) {
		let role = 'user'
		const { email, password, username } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Некорректный email или пароль'))
		}
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			return next(
				ApiError.badRequest('Пользователь с таким email уже существует')
			)
		}
		if (username === 'admin') {
			role = 'admin'
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({
			email,
			password: hashPassword,
			username,
			role,
		})
		const token = generateJwt(user.id, user.email)
		return res.json({ token, user })
	}

	async login(req, res, next) {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return next(ApiError.badRequest('Неверный логин или пароль'))
		}
		const comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.badRequest('Неверный логин или пароль'))
		}
		const token = generateJwt(user.id, user.email)
		return res.json({ token, user })
	}

	async check(req, res, next) {
		const { id, email } = req.user
		const user = await User.findOne({ where: { email } })
		const token = generateJwt(id, email)
		return res.json({ token, user })
	}
}

module.exports = new AuthController()
