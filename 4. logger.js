const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    let [ date, time ] = new Date().toISOString().split('T');
    time = time.split('.')[ 0 ]

    console.log(`${date},${time}: Method: ${method}, URL: ${url}`);

    next();
}

module.exports = logger