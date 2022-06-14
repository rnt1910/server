const { Sequelize } = require('sequelize')
const { config } = require('./config')

module.exports = new Sequelize(
	config.DB_NAME,
	config.DB_USER,
	config.DB_PASSWORD,
	{
		dialect: 'postgres',
		host: config.DB_HOST,
		port: config.DB_PORT,
	}
)
