var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

try {
    console.log(process.env.DB_USER);
    connection.connect();
} catch (e) {
    console.log('Database Connection failed:' + e);
}

module.exports = connection;