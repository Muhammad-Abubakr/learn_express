const express = require('express');

// requiring data
const { people } = require('../data');

// Setting up Express Router (grouping api calls / endpoints with same prefix)
const router = express.Router();

// Endpoints
// http
router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(401).json({ status: 'failure', msg: 'Please enter your credentials.' })
    }

    res.status(200).json({ status: 'success', data: people });
})

module.exports = router;