// router.js
const express = require("express");
const morgan = require("morgan");
const db = require("../db/db");

const api = express();

api.get("/api/cultivos", (req, res) => {
  let sql = "SELECT * FROM cultivos";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = api;
