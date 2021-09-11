const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection');

exports.addGclient = (req, res) => {
   
       

        conn.query('INSERT INTO `client`(`nom`,`prenom`,`email`,`idGoogle`) VALUES(?,?,?,?)',[
            req.body.nom,
            req.body.prenom,
            req.body.email,
            req.body.idGoogle
           
        ],(err, rows, fields) => {
if (!err)
res.send('ajouter');
else
console.log(err);
})
}