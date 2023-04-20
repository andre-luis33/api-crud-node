const database  = require('./database');
const CarsModel = require('../models/CarsModel');


(async () => {

	await database.sync();

	const car1 = {
		brand: 'Renault',
		name: 'Sandero 1.0',
		year: 2010,
		color: 'Preto',
		licensePlate: 'HGB-660',
		price: 150000
	};

	const car2 = {
		brand: 'Fiat',
		name: 'Palio 1.0',
		year: 2011,
		color: 'Preto',
		licensePlate: 'JMY-3230',
		price: 17000
	};

	await CarsModel.create(car1);
	await CarsModel.create(car2);

})();
