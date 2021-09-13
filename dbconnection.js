const mysql = require("mysql2");

const db_connection = mysql
  .createConnection({
      host: "192.248.180.71",
    user: "backmob",
    password: "B@ckMob123",
    database: "medico",
    port: "3306"
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection;