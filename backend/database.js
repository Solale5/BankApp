var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "bankappdb.civbp2vs1lry.us-east-2.rds.amazonaws.com",
    database: "public",
    user: "Team1",
    password: "BankTeam1"
});

module.exports = connection;
