const db = require("../db/db");

const vistaPrincipal = function (req, res) {
  res.render("home");
};
const vistaTable = function (req, res) {
  // hacemos la consulta a la base de datos
  db.query("SELECT * FROM trabajadores", (error, trabajadores, fields) => {
    if (error) throw error;
    // renderizamos la vista y le pasamos los datos de la consulta
    res.render("tables", { trabajadores: trabajadores });
    console.log(trabajadores);
    //   res.json(trabajadores);
  });
  // res.render("tables");
};

const vistaNorificaciones = function (req, res) {
  res.render("notificaciones");
};

const vistaUsuario = (req, res) => {
  res.render("user");
};

const vistaEror = function (req, res) {
  res.status(404).render("404");
};

module.exports = {
  vistaPrincipal,
  vistaTable,
  vistaNorificaciones,
  vistaEror,
  vistaUsuario,
};
