const CarModel = require('../models/CarModel');

class CarController {

	/** @type {import("express").RequestHandler} */
	async index(req, res) {
		const cars = await CarModel.findAll();
		return res.json(cars);
	}

	/** @type {import("express").RequestHandler} */
	async show(req, res) {
		const { id } = req.params;

		const car = await CarModel.findByPk(id);
		return car ? res.json(car) : res.status(404).json({ message: 'Car not found' });
	}



	/** @type {import("express").RequestHandler} */
	async count(req, res) {
		const count = await CarModel.count();
		return res.json({count: count});
	}



	/** @type {import("express").RequestHandler} */
	async store(req, res) {
		const { name, year, color, price, licensePlate } = req.body;

		if(!name || !year || !price || !licensePlate) {
			return res.status(400).json({
				message: 'Missing required fields',
				requiredFields: 'name, year, price and licensePlate'
			});
		}

		const safeYear = parseInt(year);
		if(isNaN(safeYear) || year < 1980) {
			return res.status(400).json({ message: 'Invalid {year}, please provide a year greater than 1979' });
		}

		const safePrice = parseFloat(price);
		if(isNaN(price) || price < 1) {
			return res.status(400).json({ message: 'Invalid {price}, please provide a price greater than 0' });
		}

		const licensePlateExists = await CarModel.count({ where: { licensePlate: licensePlate } });
		if(licensePlateExists) {
			return res.status(400).json({ message: 'The provided {licensePlate} already exists' });
		}


		try {
			const car = await CarModel.create({
				name: name, year: safeYear, color: color, price: safePrice, licensePlate: licensePlate
			});

			return res.status(201).json(car);

		} catch (error) {
			return res.status(500).json({ message: 'Internal Server Error' });
		}

	}


	/** @type {import("express").RequestHandler} */
	async update(req, res) {
		const { name, year, color, price, licensePlate } = req.body;

		const id = parseInt(req.params.id) || 0;

		if(id == 1 || id == 2) {
			return res.status(400).json({ message: 'You can\'t update this car. Car 1 and 2 are too special to be updated :)' });
		}

		if(!name || !year || !price || !licensePlate) {
			return res.status(400).json({
				message: 'Missing required fields',
				requiredFields: 'name, year, price and licensePlate'
			});
		}

		const safeYear = parseInt(year);
		if(isNaN(safeYear) || year < 1980) {
			return res.status(400).json({ message: 'Invalid {year}, please provide a year greater than 1979' });
		}

		const safePrice = parseFloat(price);
		if(isNaN(price) || price < 1) {
			return res.status(400).json({ message: 'Invalid {price}, please provide a price greater than 0' });
		}


		const car = await CarModel.findOne({ where: { id: id } });
		if(!car) {
			return res.status(404).json({ message: 'Car not found' });
		}


		const carByLicensePlate = await CarModel.findOne({ where: { licensePlate: licensePlate } });
		if(carByLicensePlate && carByLicensePlate.licensePlate != car.licensePlate) {
			return res.status(400).json({ message: 'The provided {licensePlate} already exists' });
		}

		try {
			const carUpdated = await car.update(
				{ name: name, year: safeYear, color: color, price: safePrice, licensePlate: licensePlate },
				{ where: { id: id } }
			);

			return res.status(200).json(carUpdated);

		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: 'Internal Server Error' });
		}

	}


	/** @type {import("express").RequestHandler} */
	async destroy(req, res) {
		const id = parseInt(req.params.id) || 0;

		if(id == 1 || id == 2) {
			return res.status(400).json({ message: 'You can\'t delete this car. Car 1 and 2 are too special to be deleted :)' });
		}

		await CarModel.destroy({ where: { id: id } });
		return res.sendStatus(204);
	}

}

module.exports = new CarController();
