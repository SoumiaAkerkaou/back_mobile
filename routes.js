const conn = require('./dbconnection')
const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/register');
const {login} = require('./controllers/Login');
//client
const {addClient} = require('./gestion_client/AjouterClient');
const {getClient} = require('./gestion_client/getClient');
const {updateClient} = require('./gestion_client/ModifierClient');
const {DeleteClient} = require('./gestion_client/SupprimerClient');
const {getAllClient} = require('./gestion_client/getAllClient');
const {addGclient} = require('./gestion_client/AjouterGoogleClient');
//specialiste
const {addSpec} = require('./gestion_specialiste/AjouterSpec');
const {updateSpec} = require('./gestion_specialiste/ModifierSpec');
const {DeleteSpec} = require('./gestion_specialiste/SupprimerSpec');
const {getAllSpec} = require('./gestion_specialiste/getAllSpec');

router.post('/register', [
   
], register);


router.post('/login',[
   
],login);
//gestion client
router.post('/addClient', [
   
], addClient);

router.post('/addGclient', [
   
], addGclient);

router.put('/updateClient/(:id)', [
  
], updateClient);

router.delete('/DeleteClient/(:id)', [
   
], DeleteClient);
router.get('/getClient/(:id)', [
   
], getClient);
router.get('/getAllClient', getAllClient);



//gestion specialiste
router.post('/addSpec', [
   
], addSpec);

router.put('/updateSpec/(:id)', [
  
], updateSpec);

router.delete('/DeleteSpec/(:id)', [
   
], DeleteSpec);



router.get('/getAllSpec',getAllSpec);

router.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});


//ajouter des fichiers
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");


//pour les diplomes
const filestoragediplome = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/diplome')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
})
 
const uploaddiplome = multer({ storage: filestoragediplome })

router.post('/diplome',uploaddiplome.single('file'),
(req,res) =>{
  console.log(req.file);
  res.send('single file uploaded');
});
//pour les CVs
const filestorageCV = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/cv')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
})
 
const uploadCv = multer({ storage: filestorageCV })
router.post('/cv',uploadCv.single('file'),
(req,res) =>{
  console.log(req.file);
  res.send('single file uploaded');
}
)

//google authentification


module.exports = router;