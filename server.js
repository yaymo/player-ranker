const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {DATABASE_URL, PORT} = require('./config/database');
const jsonParser = bodyParser.json();
const {playerRouter} = require('./app/routes/playerRouter');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(morgan('common'));
app.use(jsonParser);
app.use('/players', playerRouter);

let server;
function runServer() {
	return new Promise((resolve, reject) => {
		mongoose.connect(DATABASE_URL, err => {
			if(err) {
				return reject(err);
			}
			server = app.listen(PORT, () => {
				console.log(`App is listening on port ${PORT}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('closing server');
			server.close(err => {
				if(err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if(require.main === module) {
	runServer().catch(err => console.error(err));
};
module.exports = {app, runServer, closeServer};