const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection');

exports.getAllClient =  (req, res) => {
conn.query('SELECT * FROM client', (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
}
 