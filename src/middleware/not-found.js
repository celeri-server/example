
exports.notFound = ({ req, res }) => {
	res.statusCode = 404;
	res.end(JSON.stringify({ error: 'Route not found' }));
};
