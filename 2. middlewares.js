const express = require('express');

// Requiring the logger
const logger = require('./4. logger');
const authorize = require('./3. authorize');

// instantiating an express server
const app = express();

// Handling reqs and setting up end points
/* 
Using Middlewares
*/
// app.use('/api', logger); apply to every route with /api as base/prefix
app.use([ logger, authorize ]); // Order matters

// req => middleware => res
app.get('/', (req, res) => {

    res.send('<h1>HomePage</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/api/items', (req, res) => {
    console.log(req.user)
    res.send('items');
})


// setting up port
const PORT = 5000;
app.listen(PORT, 'localhost', () => {
    console.log(`Listening on PORT: ${PORT}...`);
})