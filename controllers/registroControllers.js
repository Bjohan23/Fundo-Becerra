const db = require("../db/db");
const socket = require("../socket");
const io = socket.getIO();

const rTrabajadores = (req, res) => {
  const { nombres, apellidos, edad, sexo, celular, dni } = req.body;
  console.log(nombres, apellidos, edad, sexo, celular, dni);
  db.query(
    "INSERT INTO trabajadores (nombres, apellidos, edad, sexo, celular, dni) VALUES (?,?,?,?,?,?)",
    [nombres, apellidos, edad, sexo, celular, dni],
    (error, trabajadores, fields) => {
      if (error) throw error;
      // Emitir evento a través de socket.io
      io.emit("nuevoTrabajador", {
        nombres,
        apellidos,
        edad,
        sexo,
        celular,
        dni,
      });
      res.redirect("/fTrabajadores");
    }
  );
};

module.exports = { rTrabajadores };
