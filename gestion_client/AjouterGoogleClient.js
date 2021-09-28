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
            "SELECT * FROM `client` WHERE  `nom` = ? AND `prenom`=? AND `email`=? ",
            [   req.body.nom,
                 req.body.prenom,
                 req.body.email
               
            ]
          );

        if (row.length > 0) {
            return res.send(
                 "ce compte existe deja"
            );
        }

       

        const [rows] = await conn.execute('INSERT INTO `client`(`nom`,`prenom`,`sexe`,`date_naissance`,`email`,`numero_tele`,`adresse`,`profession`,`niveauScolaire`,`idGoogle`,`isConfirmed`) VALUES(?,?,?,?,?,?,?,?,?,?,?)',[
            req.body.nom,
            req.body.prenom,
           req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.profession,
            req.body.niveauScolaire,
            req.body.idGoogle,
            req.body.isConfirmed
           
        ]);

        if (rows.affectedRows === 1) {
            return  res.send(
                 "compte creer avec success"
            );
        }
        
    }catch(err){
        next(err);
    }
}
   
       

        