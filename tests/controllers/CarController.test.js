const request = require('supertest');
const [app, server] = require('../../src/index');
const CarModel = require('../../src/models/CarModel');

describe('Requests at /cars', () => {

	afterAll(() => {
		server.close();
	});

	test('get cars', async () => {
		const response = await request(app)
			.get('/cars');

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThanOrEqual(2);
	});

	test('create car with missing fields', async () => {
		const incompleteCar = {
			name: 'Honda Civic',
			year: '2010',
		};

		const response = await request(app)
			.post('/cars')
			.send(incompleteCar);

		expect(response.status).toBe(400);
	});

	test('create a valid car', async () => {

		const validCar = {
			name: 'Fiat Punto',
			year: 2013,
			color: 'Cinza',
			price: 27000,
			licensePlate: 'GBN-7643'
		};

		const response = await request(app)
			.post('/cars')
			.send(validCar);

		expect(response.status).toBe(201);

		const carId = response.body.id;
		await CarModel.destroy({ where: { id: carId } });
	});

});
