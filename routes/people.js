const express = require('express');

// instantiating express router
const router = express.Router();

// requiring data
const { people } = require('../data');


// -------------- Endpoints ----------------
router.get('/', (req, res) => {

    res.status(200).json({ status: 'success', data: people });
})


// javascript
router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ status: 'failure', msg: 'Please provide a name.' })
    }

    res.status(201).json({ status: 'success', person: name });
})

// put request
router.put('/:id', (req, res) => {
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
})

// Delete
router.delete('/:id', (req, res) => {

    const id = req.params.id;

    const filtered = people.filter((person) => person.id !== Number(id));

    if (people.length == filtered.length) {
        return res.status(404).json({ status: 'failure', msg: 'Resource not found!' });
    }

    res.status(200).json({ status: 'success', data: filtered });
})

module.exports = router;