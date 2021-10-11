const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection').promise();

exports.updateClient = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const i = req.params.id;
<<<<<<< HEAD
        
        if(req.body.password === "")
        {
               const [rows] = await conn.execute('UPDATE `User`  SET  `nom`=?,`prenom`=?,`sexe`=?,`date_naissance`=?,`email`=?,`numero_tele`=?,`adresse`=?,`profession`=?, `niveauScolaire`=? where  id = '+i  ,
=======

             const [rows] = await conn.execute('UPDATE `client`  SET  `nom`=?,`prenom`=?,`sexe`=?,`date_naissance`=?,`email`=?,`numero_tele`=?,`adresse`=?,`profession`=?,`niveauScolaire`=?,`password`=? where  id = '+i  ,
>>>>>>> cf0cb32dd54a2970f7890707ac6a34ca8532906c
        
        [
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.profession,
            req.body.niveauScolaire
           
        ]);
        console.log("modif sans password");

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "utilisateur modifier avec succes",
            });
        }

         else{
              return res.status(201).json({
                message: "utilisateur non exist",
            });}

        }
        else{
            const salt = bcrypt.genSaltSync(10);
           const hashpass = bcrypt.hashSync(req.body.password, salt)

               const [rows] = await conn.execute('UPDATE `User`  SET  `nom`=?,`prenom`=?,`sexe`=?,`date_naissance`=?,`email`=?,`numero_tele`=?,`adresse`=?,`profession`=?, `niveauScolaire`=?,`password`=? where  id = '+i  ,
        
        [
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
           req.body.profession,
            req.body.niveauScolaire,
            hashpass
           
        ]);
        console.log("modif avec password");

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "utilisateur modifier avec succes",
            });
        }

         else{
              return res.status(201).json({
                message: "utilisateur non exist",
            });}
        }

          
         
        
    }catch(err){
        next(err);
    }
}
