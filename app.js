const express = require('express');

// logger
const morgan = require('morgan');

// server instantiation
const app = express();

// routers
const people = require('./routes/people');
const auth = require('./routes/auth');

// middlewares
app.use(morgan('dev'));
app.use(express.static('./methods-public'));
app.use('/api/people', express.json()); // parse json payload in the incoming post requests
app.use('/login', express.urlencoded({ extended: true })); // parse www/http/form url-encoded post request

// setting up routers
app.use('/api/people', people);
app.use('/login', auth);

// PORT setup
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}...`);
})