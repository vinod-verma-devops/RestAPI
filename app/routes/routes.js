exports.attachHandlers = function attachHandlers(server) {
	require('index.js')(server);
	require('../sessions/session.js')(server);
 };