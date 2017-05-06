
exports.requestLogger = (({ req, res }) => {
	const startTime = Date.now();
	const end = res.end;
	res.end = (...args) => {
		end.call(res, ...args);
		console.log(`Request Completed - HTTP/1.1 ${req.url} status=${res.statusCode} duration=${Date.now() - startTime}ms`);
	};
});
