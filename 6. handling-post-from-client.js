const express = require('express');

// 3rd party middlewares
// logger
const morgan = require('morgan');

// acquiring data
const { people } = require('./data');


// server instantiation
const app = express();

// middlewares setup
app.use([ express.static('./methods-public'), morgan('dev') ]);
app.use('/login', express.urlencoded({ extended: true })); // using html (urlencoded)
app.use('/api/people', express.json()); // using javascript,axios (json)


// end points
app.get('/api/people', (req, res) => {

    res.status(200).json({ status: 'success', data: people });
})

// Using html
app.post('/login', (req, res) => {
    const { name } = req.body;

    if (name) {
        return res.status(200).send(`<h1>Welcome ${name}</h1>`);
    }

    res.status(401).send('Please provide the credentials.')
})

// Using javsascript
app.post('/api/people', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ success: false, msg: 'Please provide the credentials' });
    }

    res.status(201).json({ success: true, person: name });
})

// PORT configuraiton
const PORT = 5000;
app.listen(PORT, 'localhost', () => {
    console.log(`Listening on the PORT: ${PORT}`);
})