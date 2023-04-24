const { Router } = require('express');

const CarController = require('./controllers/CarController');


const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to the API' });
});

router.get('/cars', CarController.index);
router.get('/cars/count', CarController.count);
router.get('/cars/:id', CarController.show);


router.post('/cars', CarController.store);
router.put('/cars/:id', CarController.update);
router.delete('/cars/:id', CarController.destroy);

router.use((req, res) => {
	res.status(404).json({message: `The requested route was not found: ${req.originalUrl}`});
});

module.exports = router;
