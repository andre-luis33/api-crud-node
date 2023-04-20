const Sequelize = require('sequelize');
const database = require('../database/database');

const Car = database.define('cars', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	brand: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	year: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	color: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	licensePlate: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false,
	}
}, { underscored: false });

module.exports = Car;
