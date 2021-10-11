const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbconnection').promise();
const jwt_decode = require('jwt-decode');
require('dotenv').config();

exports.login = async (req,res,next) =>{
    const errors = validationResult(req);

  if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{
   const [user] = await conn.execute(
            "SELECT * FROM `User` WHERE `email`=?",
            [req.body.email]
          );

        if (user.length !== 0) {
        const adpass = bcrypt.compareSync(req.body.password, user[0].password);
         if(!adpass){
            
            return res.status(422).json({
                message: "mot de passe incorrect",
            });
        }
          ad = JSON.parse(JSON.stringify(user[0]));
          console.log(user[0].role);
          

        const theToken = jwt.sign(ad,process.env.ACCESS_TOKEN_SECRET);

        return res.json({
            token:theToken,
            info:user[0]
        });

            
   }
     
}
catch(err){
   next(err);

}
res.end();  
}

