const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection').promise();

exports.addGclient = async(req,res,next) => {
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
            return res.send(
                 "ce client existe deja"
            );
        }

       

        const [rows] = await conn.execute('INSERT INTO `client`(`nom`,`prenom`,`email`,`idGoogle`) VALUES(?,?,?,?)',[
            req.body.nom,
            req.body.prenom,
            req.body.email,
            req.body.idGoogle,
           
        ]);

        if (rows.affectedRows === 1) {
            return  res.send(
                 "client insere avec succes"
            );
        }
        
    }catch(err){
        next(err);
    }
}