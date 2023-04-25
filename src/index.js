const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = [app, server];
