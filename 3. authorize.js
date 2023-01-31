const authorize = (req, res, next) => {

    const { user } = req.query;

    if (user) {
        req.user = { name: 'john', id: 3 }
    } else {
        return res.status(401).send('Unauthorized')
    }

    next();
}

module.exports = authorize;