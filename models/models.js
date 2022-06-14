const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
	'user',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		email: { type: DataTypes.STRING, unique: true, allowNull: false },
		password: { type: DataTypes.STRING, allowNull: false },
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		role: { type: DataTypes.ENUM('admin', 'user'), defaultValue: 'user' },
	},
	{ timestamps: false }
)

const Course = sequelize.define(
	'course',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		title: { type: DataTypes.STRING, allowNull: false },
		video: { type: DataTypes.STRING, allowNull: false },
		description: { type: DataTypes.STRING, allowNull: false },
		preview: { type: DataTypes.STRING, allowNull: false },
		authorId: { type: DataTypes.INTEGER },
	},
	{ timestamps: false }
)

const UserCourse = sequelize.define('userCourse', {}, { timestamps: false })

User.belongsToMany(Course, { through: UserCourse, foreignKey: 'userId' })
Course.belongsToMany(User, { through: UserCourse })

module.exports = {
	User,
	Course,
	UserCourse,
}
