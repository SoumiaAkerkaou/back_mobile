const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const conn = require('../dbconnection').promise();


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
        const adpass = await bcrypt.compare(req.body.password, admin[0].password);
         if(req.body.password != admin[0].password){
            
            return res.status(422).json({
                message: "mot de passe incorrect",
            });
        }
        /* return res.status(422).json({
               [ admin[0].password],
            });*/
       /* const theToken = jwt.sign({id:admin[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            token:theToken
        });*/

            res.send(admin[0]);
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
       /* const theToken = jwt.sign({id:spe[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            token:theToken
        });*/
        res.send(spe[0]);
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
                /* const theToken = jwt.sign({id:cl[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

                 return res.json({
                      token:theToken
                          });*/
                          res.send(cl[0]);
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

