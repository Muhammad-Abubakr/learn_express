const express = require('express');

// logger
const morgan = require('morgan');

// requiring data
const { people } = require('./data');

// server instantiation
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.static('./methods-public'));
app.use('/api/people', express.json()); // parse json payload in the incoming post requests
app.use('/login', express.urlencoded({ extended: true })); // parse www/http/form url-encoded post request

// Setting up end points
app.get('/api/people', (req, res) => {

    res.status(200).json({ status: 'success', data: people });
})

// http
app.post('/login', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(401).json({ status: 'failure', msg: 'Please enter your credentials.' })
    }

    res.status(200).json({ status: 'success', data: people });
})


// javascript
app.post('/api/people', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ status: 'failure', msg: 'Please provide a name.' })
    }

    res.status(201).json({ status: 'success', person: name });
})

// put request
app.put('/api/people/:id', (req, res) => {
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
app.delete('/api/people/:id', (req, res) => {

    const id = req.params.id;

    const filtered = people.filter((person) => person.id !== Number(id));

    if (people.length == filtered.length) {
        return res.status(404).json({ status: 'failure', msg: 'Resource not found!' });
    }

    res.status(200).json({ status: 'success', data: filtered });
})

// PORT setup
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}...`);
})