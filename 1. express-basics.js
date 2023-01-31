const express = require('express');
const { products } = require('./data');

const app = express();


// Homepage
app.get('/', (req, res) => {
    console.log('User hit the server...');
    res.status(200).send('<h1> Homepage </h1> <br> <a href="/api/products">products</a> ');
})

// All Products
app.get('/api/products', (req, res) => {

    console.log(`Host : ${req.hostname}`);
    console.log(`Resource requested: ${req.url}`);

    const reduced_products = products.map((product) => {
        const { id, name, image } = product;

        return { id, name, image };
    });

    res.status(200).json(reduced_products);
})

// Single Products (using wildcards) - Route Parameters
app.get('/api/products/:pid', (req, res) => {
    console.log(`Resource Request: ${req.url}`);

    const pid = req.params.pid;
    const product = products.find((product) => product.id === Number(pid));

    if (!product) {
        res.status(404).send(`<h1>Resource ${req.url} not found!</h1> <br> <a href="/">Back to Homepage</a>`);
    }
    res.status(200).json(product);
})


// Query String / URL parameters
app.get('/api/v1/query', (req, res) => {

    const { search, limit } = req.query;
    console.log(req.query);


    if (limit && !Number(limit)) {
        res.status(400).send("<h1>BAD REQUEST</h1>")
    } else {

        let sortedProducts = [ ...products ];

        if (search) {
            sortedProducts = sortedProducts.filter((product) => product.name.startsWith(search));
        }
        if (limit) {
            sortedProducts = sortedProducts.slice(0, Number(limit));
        }

        res.status(200).json({ query: 'success', data: sortedProducts });
    }

})

// Handling end points other than defined above
app.all('*', (req, res) => {
    res.status(404).end(`<h1>Resource ${req.url} not found!</h1> <br> <a href="/">Back to Homepage</a>`);
})


// Server Port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})