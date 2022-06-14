const { User } = require('../models/models')

class UserController {
	async changeUsername(req, res, next) {
		const update = await User.update(
			{ username: req.body.username },
			{ where: { id: req.user.id }, returning: true, plain: true }
		)
		return res.json({ user: update[1] })
	}
}

module.exports = new UserController()
