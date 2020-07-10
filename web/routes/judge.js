const express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(global.DB_INFO);
connection.connect();

module.exports = router;
