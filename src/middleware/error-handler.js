
const { errorHandler } = require('@celeri/http-error');

exports.errorHandler = errorHandler(({ error }) => {
	const errors = Array.isArray(error) ? error : [ error ];

	return {
		errors: errors.map((error) => ({
			message: error.message
		}))
	};
});
