const connection = require('../config');

module.exports.show = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify({
        'result': 'Not Found',
        'data': null
    }));
};