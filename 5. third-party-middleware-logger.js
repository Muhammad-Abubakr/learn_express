const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

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

const PORT = 5000;
app.listen(PORT, 'localhost', () => {
    console.log(`Listening on PORT: ${PORT}...`);
})
