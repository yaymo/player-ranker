const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Player} = require('../models/player');

const playerRouter = express.Router();

playerRouter.use(jsonParser);

playerRouter.get('/', (req, res) => {
	Player.find(req.body.name)
		.then(players => {
			res.status(200).json(players);
		});
});

playerRouter.get('/:id', (req, res) => {
	Player.findById(req.params.id).then(player => {
			res.json(player)
		});
});

playerRouter.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['rank', '_id'];
	for(let i=0; i< requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)) {
			const message = `Missing ${field} in request body`
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if(req.params.id !== req.body._id) {
		const message = `Request path id ${req.params.id} and request body id must match`
		console.error(message);
		return res.status(400).send(message);
	}
	console.log(req.body._id);
	Player.update({ id: req.params.id }, { $set: req.body.rank }, () => {
		res.sendStatus(204);
	});
});

playerRouter.delete('/:id', (req, res) => {
	Player.findOneAndRemove({
		_id: req.params.id 
	}, function() {
		res.sendStatus(204);
	});
});

module.exports = {playerRouter};