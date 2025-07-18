const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_db',
});

module.exports = pool;
