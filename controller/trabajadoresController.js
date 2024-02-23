const db = require("../db/db");
// const express = require("express");

const TrabajadoresController = {
  mostrarTrabajadores: (req, res) => {
    // hacemos la consulta a la base de datos
    db.query("SELECT * FROM trabajadores", (error, trabajadores, fields) => {
      if (error) throw error;
      // renderizamos la vista y le pasamos los datos de la consulta
      res.render("trabajadores", { trabajadores: trabajadores });
      //   res.json(trabajadores);
    });
  },
};
module.exports = TrabajadoresController;
