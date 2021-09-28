const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbconnection').promise();
const jwt_decode = require('jwt-decode');
require('dotenv').config();

exports.TokenGoogle = async (req,res,next) => {
   
       try{ 
            const [row] = await conn.execute(
            "SELECT * FROM `client` WHERE  `email`=? ",
            [  /* req.body.nom,
                 req.body.prenom,*/
                 req.body.email
               
            ]
          );
              if (row.length !== 0) {
            s = JSON.parse(JSON.stringify(row[0]));
            const theToken = jwt.sign(s,process.env.ACCESS_TOKEN_SECRET);
            console.log(s);

        return res.json({
            token:theToken,
            info:row[0],
            isgoogle:1
        });
        }else{ 
             return res.json({
            
              isgoogle:0
        });
        }
        } 
        catch(err){
                next(err);
            }
res.end();
// `nom` = ? AND `prenom`=? AND
       
}
