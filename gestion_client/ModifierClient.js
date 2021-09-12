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

             const [rows] = await conn.execute('UPDATE `client`  SET  `nom`=?,`prenom`=?,`sexe`=?,`date_naissance`=?,`email`=?,`numero_tele`=?,`adresse`=?,`profession`=?,`password`=? where  id = '+i  ,
        
        [
           
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tele,
            req.body.adresse,
            req.body.profession,
            req.body.password
           
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "client modifier avec succes",
            });
        }

         else{
              return res.status(201).json({
                message: "client non exist",
            });}
         

        
        
    }catch(err){
        next(err);
    }
}