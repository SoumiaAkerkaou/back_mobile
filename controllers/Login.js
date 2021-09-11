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
   const [admin] = await conn.execute(
            "SELECT * FROM `admin` WHERE `email`=?",
            [req.body.email]
          );

        if (admin.length !== 0) {
           /* return res.status(422).json({
                message: " vous etes admin",
            });*/
            // res.send("vous etes admin");
       // const adpass = await bcrypt.compare(req.body.password, admin[0].password);
         if(req.body.password != admin[0].password){
            
            return res.status(422).json({
                message: "mot de passe incorrect",
            });
        }
        /* return res.status(422).json({
               [ admin[0].password],
            });*/
          // const me='soumia'
          ad = JSON.parse(JSON.stringify(admin[0]));

        const theToken = jwt.sign(ad,process.env.ACCESS_TOKEN_SECRET);
        //console.log(ad);

        return res.json({
            token:theToken,
            info:admin[0]
        });

            //res.send(admin[0]);
   }
     else{  
       
       try{ 
        ////  check  aspecialiste table data second bacause it is the small one after admin
        const [spe] = await conn.execute(
            "SELECT * FROM `specialiste` WHERE `email`=?",
            [req.body.email]
          );

        if (spe.length !== 0) {
           /* return res.status(422).json({
                message: " vous etes spec",
            });*/
      //  const spepass =/* await bcrypt.*/compare(req.body.password, spe[0].password);
         //res.send(req.body.password);
         if(req.body.password != spe[0].password){
            
            return res.status(422).json({
                message: "mot de passe incorrect",
            });
        }
       s = JSON.parse(JSON.stringify(spe[0]));

        const theToken = jwt.sign(s,process.env.ACCESS_TOKEN_SECRET);
        console.log(s);

        return res.json({
            token:theToken,
            info:spe[0]
        });
        //res.send(spe[0]);
        }
        else{  
             /// ///
             try{  ////  check  client table data second bacause it is the biggest one
             const [cl] = await conn.execute(
             "SELECT * FROM `client` WHERE `email`=?",
            [req.body.email]
             );

             if (cl.length !== 0) {
                 /*return res.status(422).json({
                message: " vous etes client",
            });*/
                // const clpass = await bcrypt.compare(req.body.password, cl[0].password);
                 if(req.body.password != cl[0].password){
            
                return res.status(422).json({
                            message: "mot de passe incorrect", });
                 }
                 c = JSON.parse(JSON.stringify(cl[0]));
                 console.log(process.env.ACCESS_TOKEN_SECRET);

                    const theToken = jwt.sign(c,process.env.ACCESS_TOKEN_SECRET);
                    decoded = jwt_decode(theToken,process.env.ACCESS_TOKEN_SECRET);
                    console.log(decoded);

                 return res.json({
                      token:theToken,
                      info:cl[0]
                          });
                         // res.send(cl[0]);
             }
             else{
                res.status(404).send("l'email ou le mot de pass est incorrect");
             }
            }
            catch(err){
                next(err);
            }
        }
    }catch(err){
        next(err);
    }  
   }
}
catch(err){
   next(err);

}
res.end();  
}

