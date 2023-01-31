// requiring data
const { people } = require('../data');

// Handlers / Controllers
const getPeople = (req, res) => {

    res.status(200).json({ status: 'success', data: people });
}

const createPerson = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ status: 'failure', msg: 'Please provide a name.' })
    }

    res.status(201).json({ status: 'success', person: name });
}

const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => person.id === Number(id));

    if (!person) {
        return res.status(404).json({ status: 'failure', msg: 'Resource not found!' })
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }

        return person;
    })

    res.status(200).json({ status: 'success', data: newPeople })
}

const deletePerson = (req, res) => {

    const id = req.params.id;

    const filtered = people.filter((person) => person.id !== Number(id));

    if (people.length == filtered.length) {
        return res.status(404).json({ status: 'failure', msg: 'Resource not found!' });
    }

    res.status(200).json({ status: 'success', data: filtered });
}

module.exports = { getPeople, createPerson, updatePerson, deletePerson };