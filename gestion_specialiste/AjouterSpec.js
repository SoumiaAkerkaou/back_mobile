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
            "SELECT * FROM `User` WHERE `email`=?",
            [req.body.email,
            ]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "cet utilisateur existe deja",
            });
        }

        const hashpass=await bcrypt.hash(req.body.password, 5);

        const [rows] = await conn.execute('INSERT INTO `User`(`nom`,`prenom`,`sexe`,`date_naissance`,`email`,`numero_tele`,`adresse`,`specialite`,`picture`,`password`,`isConfirmed`,`diplome`,`cv`,`role`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,"specialist")',[
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.specialite,
            req.body.picture,
            hashpass,
            req.body.isConfirmed,
            req.body.deplome,
            req.body.cv
           // hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "utilisateur insere avec succes",
            });
        }
        
    }catch(err){
        next(err);
    }
}