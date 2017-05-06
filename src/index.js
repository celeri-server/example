
const { createServer } = require('@celeri/http-server');
const { requestLogger } = require('./middleware/request-logger');
const { contentType } = require('./middleware/content-type');
const { notFound } = require('./middleware/not-found');
const { errorHandler } = require('./middleware/error-handler');

const app = exports.app = createServer({ port: 8080 }, () => {
	console.log('HTTP/1.1 server listening on port 8080...');
});

app.use(requestLogger);
app.use(contentType('application/json'));
app.use(app.router({ notFound }));
app.catch(errorHandler);

require('./endpoints/people/people.endpoint');
