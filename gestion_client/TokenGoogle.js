const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbconnection');

exports.TokenGoogle = async (req,res,next) => {
   
       try{ 
               const client={ 
           "nom": req.body.nom,
            "prenom":req.body.prenom,
            "email":req.body.email,
            "googleid":req.body.idGoogle,
            "role":req.body.role
           
        } ;
        
         //console.log(client);
         c = JSON.parse(JSON.stringify(client));
         //console.log(c);

                    const theToken = jwt.sign(c,process.env.ACCESS_TOKEN_SECRET);

                 return res.json({
                      token:theToken
                          });

       }
        catch(err){
                next(err);
            }
res.end();
       
}
