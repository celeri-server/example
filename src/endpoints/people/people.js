
let nextId = 1;
const people = new Map();

exports.getPerson = (id) => {
	return people.get(id);
};

exports.getAllPeople = () => {
	return [...people.values()];
};

exports.createPerson = (data) => {
	const id = nextId++;

	const person = Object.assign({ }, data, { id });
	person.id = id;
	people.set(id, person);

	return person;
};

exports.updatePerson = (id, data) => {
	const person = exports.getPerson(id);

	if (! person) {
		return;
	}

	Object.assign(person, data);
	return person;
};

exports.deletePerson = (id) => {
	if (people.has(id)) {
		people.delete(id);
		return true;
	}
};
