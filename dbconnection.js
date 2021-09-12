const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
    host: "192.248.180.71",
    user: "test",
    password: "Y@$123$er",
    database: "medico",
    port: "3306"
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;