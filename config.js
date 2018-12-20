var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});

try {
    connection.connect();
} catch (e) {
    console.log('Database Connection failed:' + e);
}

module.exports = connection;