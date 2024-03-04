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
const rCultivos = (req, res) => {
  const { nombreProducto, peso, cantidad, fecha, categoria } = req.body;
  console.log(nombreProducto, peso, cantidad, fecha, categoria);
  db.query(
    "INSERT INTO cultivo (nombre, peso, cantidad, fecha, categoria_id) VALUES (?,?,?,?,?)",
    [nombreProducto, peso, cantidad, fecha, categoria],
    (error, result) => {
      if (error) {
        // Aquí puedes enviar una respuesta de error al cliente si lo deseas
        res.status(500).send("Error al insertar el cultivo");
      } else {
        console.log("Cultivo insertado correctamente:", result);
        // Aquí puedes redirigir a una página de éxito o realizar alguna otra acción
        res.redirect("/cultivos");
      }
    }
  );
};
const rCategorias = (req, res) => {
  const {nombre}= req.body;
  db.query("INSERT INTO categoria (nombre) VALUES (?)", [nombre], (error, result) => {
    if (error) {
      // Aquí puedes enviar una respuesta de error al cliente si lo deseas
      res.status(500).send("Error al insertar la categoria");
    } else {
      console.log("Categoria insertada correctamente:", result);
      // Aquí puedes redirigir a una página de éxito o realizar alguna otra acción
      res.redirect("/categorias");
    }
  });
};

module.exports = { rTrabajadores, rCultivos,rCategorias };
