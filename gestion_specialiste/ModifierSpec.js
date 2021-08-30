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

             const [rows] = await conn.execute('UPDATE `specialiste`  SET  `nom`=?,`prenom`=?,`sexe`=?,`date_naissance`=?,`email`=?,`numero_tel`=?,`adresse`=?,`specialite`=?,`password`=? where  id = '+i  ,
        
        [
            req.body.nom,
            req.body.prenom,
            req.body.sexe,
            req.body.date_naissance,
            req.body.email,
            req.body.numero_tel,
            req.body.adresse,
            req.body.specialite,
            req.body.password
           
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "specialiste modifier avec succes",
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