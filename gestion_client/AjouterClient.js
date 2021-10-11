const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const conn = require('../dbconnection').promise();

exports.addClient = async(req,res,next) => {
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
            return res.send(
                 "cet utilisateur existe deja"
            );
        }

        
      console.log(req.body.password);
       const salt = bcrypt.genSaltSync(10);
       const hashpass = bcrypt.hashSync(req.body.password, salt)

       

        const [rows] = await conn.execute('INSERT INTO `User`(`nom`,`prenom`,`sexe`,`date_naissance`,`email`,`numero_tele`,`adresse`,`profession`,`picture`,`niveauScolaire`,`password`,`isConfirmed`,`role`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,"client")',[
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.profession,
            req.body.picture,
            req.body.niveauScolaire,
            //req.body.password,
            hashpass,
            req.body.isConfirmed
           
        ]);

        if (rows.affectedRows === 1) {
            return  res.send(
                 "utilisateur insere avec succes"
            );
        }
        
    }catch(err){
        next(err);
    }
}