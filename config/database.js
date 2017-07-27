exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						'mongodb://jamesonhill:12345@ds129422.mlab.com:29422/player-ranker';

exports.PORT = process.env.PORT || 8080;