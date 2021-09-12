const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection').promise();

exports.addSpec = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

     try{
        //verifier l'existance d'un utilisateur
         const [row] = await conn.execute(
            "SELECT * FROM `specialiste` WHERE `nom`=? AND `prenom`=?",
            [req.body.nom,
             req.body.prenom
            ]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "ce specialiste existe deja",
            });
        }

       

        const [rows] = await conn.execute('INSERT INTO `specialiste`(`nom`,`prenom`,`sexe`,`date_naissance`,`email`,`numero_tele`,`adresse`,`specialite`,`picture`,`password`,`isConfirmed`,`deplome`,`cv`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',[
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.specialite,
            req.body.picture,
            req.body.password,
            req.body.isConfirmed,
            req.body.deplome,
            req.body.cv
           // hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "specialiste insere avec succes",
            });
        }
        
    }catch(err){
        next(err);
    }
}