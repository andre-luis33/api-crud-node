const database  = require('./database');
const CarModel = require('../models/CarModel');

(async () => {

	await database.sync();

	const car1 = {
		name: 'Sandero 1.0',
		year: 2010,
		color: 'Preto',
		licensePlate: 'HGB-660',
		price: 150000
	};

	const car2 = {
		name: 'Palio 1.0',
		year: 2011,
		color: 'Preto',
		licensePlate: 'JMY-3230',
		price: 17000
	};

	await CarModel.create(car1);
	await CarModel.create(car2);

})();
