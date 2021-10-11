const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection');

exports.getAllSpec =  (req, res) => {
conn.query('SELECT * FROM User WHERE `role`="specialist"', (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
}
 