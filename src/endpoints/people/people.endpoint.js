
const { app } = require('../../index');
const { bodyParser } = require('../../middleware/body-parser');
const { getPerson, getAllPeople, createPerson, updatePerson, deletePerson } = require('./people');

app.get('/people')
	.use(({ req, res }) => {
		res.statusCode = 200;
		res.end(JSON.stringify({ data: getAllPeople() }));
	});

app.get('/people/:id')
	.use(({ req, res }) => {
		const id = parseFloat(req.params.id);

		if (! id) {
			res.statusCode = 400;
			res.end(JSON.stringify({
				errors: [
					{ message: `Person id "${id}" is invalid` }
				]
			}));
			return;
		}

		const person = getPerson(id);

		if (person) {
			res.statusCode = 200;
			res.end(JSON.stringify({ data: person }));
		}

		else {
			res.statusCode = 404;
			res.end(JSON.stringify({
				errors: [
					{ message: `Person with id=${req.params.id} not found` }
				]
			}));
		}
	});

app.post('/people')
	.use(bodyParser)
	.use(({ req, res }) => {
		const person = createPerson(req.body);

		res.statusCode = 201;
		res.end(JSON.stringify({
			meta: {
				link: `http://localhost:8080/people/${person.id}`
			},
			data: person
		}));
	});

app.patch('/people/:id')
	.use(bodyParser)
	.use(({ req, res }) => {
		const id = parseFloat(req.params.id);

		if (! id) {
			res.statusCode = 400;
			res.end(JSON.stringify({
				errors: [
					{ message: `Person id "${id}" is invalid` }
				]
			}));
			return;
		}

		const updatedPerson = updatePerson(id, req.body);

		if (updatedPerson) {
			res.statusCode = 200;
			res.end(JSON.stringify({ data: updatedPerson }));
		}

		else {
			res.statusCode = 404;
			res.end(JSON.stringify({
				errors: [
					{ message: `Person with id=${req.params.id} not found` }
				]
			}));
		}
	});

app.delete('/people/:id')
	.use(({ req, res }) => {
		const id = parseFloat(req.params.id);

		if (! id) {
			res.statusCode = 400;
			res.end(JSON.stringify({
				errors: [
					{ message: `Person id "${id}" is invalid` }
				]
			}));
			return;
		}

		const deleted = deletePerson(id);

		if (deleted) {
			res.statusCode = 204;
			res.end();
		}

		else {
			res.statusCode = 404;
			res.end(JSON.stringify({
				errors: [
					{ message: `Person with id=${req.params.id} not found` }
				]
			}));
		}
	});
