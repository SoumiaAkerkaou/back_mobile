const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection').promise();

exports.updateSpec = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const i = req.params.id;
        
        if(req.body.password === "")
        {
               const [rows] = await conn.execute('UPDATE `User`  SET  `nom`=?,`prenom`=?,`sexe`=?,`date_naissance`=?,`email`=?,`numero_tele`=?,`adresse`=?,`specialite`=? where  id = '+i  ,
        
        [
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.specialite
           
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

               const [rows] = await conn.execute('UPDATE `User`  SET  `nom`=?,`prenom`=?,`sexe`=?,`date_naissance`=?,`email`=?,`numero_tele`=?,`adresse`=?,`specialite`=?,`password`=? where  id = '+i  ,
        
        [
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.specialite,
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