const express = require('express');
const fileUpload = require('express-fileUpload');
const routes = require('./routes');
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const util = require('util');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false})); // enable http request
app.use(cors()); 
app.use(express.json());
app.use(routes);



// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


app.listen(3000,() => console.log('Server is running on port 3000'));