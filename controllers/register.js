const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection').promise();

exports.register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        //verifier l'existance d'un utilisateur
         const [row] = await conn.execute(
            "SELECT * FROM `client` WHERE `nom`=? AND `prenom`=?",
            [req.body.nom,
             req.body.prenom
            ]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "ce client existe deja",
            });
        }

       

        const [rows] = await conn.execute('INSERT INTO `client`(`nom`,`prenom`,`sexe`,`date_naissance`,`email`,`numero_tel`,`profession`,`password`) VALUES(?,?,?,?,?,?,?,?)',[
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tel,
            req.body.profession,
            req.body.password
           // hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "client insere avec succes",
            });
        }
        
    }catch(err){
        next(err);
    }
}