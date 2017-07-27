const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const playerSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	rank: {
		type: Number,
		required: true
	}
});


const Player = mongoose.model('Player', playerSchema);
module.exports = {Player};