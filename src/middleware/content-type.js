
exports.contentType = (contentType) => ({ req, res }) => {
	res.setHeader('Content-Type', contentType);
};
