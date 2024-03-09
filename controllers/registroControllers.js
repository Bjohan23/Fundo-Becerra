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
      res.redirect("/tabla");
    }
  );
};
const rCultivos = (req, res) => {
  const { id, nombreProducto, peso, cantidad, fecha, categoria } = req.body;

  db.query(
    "INSERT INTO cultivo (nombre, peso, cantidad, fecha, categoria_id) VALUES (?,?,?,?,?)",
    [nombreProducto, peso, cantidad, fecha, categoria],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al insertar el cultivo");
      } else {
        console.log("Cultivo insertado correctamente:", result);
        res.redirect("/cultivos");
      }
    }
  );
};
const rCategorias = (req, res) => {
  const { id, nombre } = req.body;
  // Crear una nueva categoría
  db.query(
    "INSERT INTO categoria (nombre) VALUES (?)",
    [nombre],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al insertar la categoría");
      } else {
        console.log("Categoría insertada correctamente:", result);
        res.redirect("/categorias");
      }
    }
  );
};

// const rHorasTrabajadas = (id, horas, fecha, callback) => {
//   db.query(
//     "INSERT INTO RegistroHoras (ID_Registro, Horas, Fecha) VALUES (?, ?, ?)",
//     [id, horas, fecha],
//     (error, result) => {
//       if (error) {
//         console.error(error);
//         callback(error);
//       } else {
//         callback(null, result);
//       }
//     }
//   );
//   redirect("/mostrarCalendario/:id");
// };
const rHorasTrabajadas = (req, res) => {
  const { horas, fecha } = req.body;
  const id = req.params.id;
  console.log("datos", id, horas, fecha);
  db.query(
    "INSERT INTO RegistroHoras (ID_Trabajador, Horas, Fecha) VALUES (?, ?, ?)",
    [id, horas, fecha],
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al insertar las horas trabajadas");
      } else {
        console.log("Horas trabajadas insertadas correctamente:", result);
        res.redirect(`/mostraCalendario/${id}`);
      }
    }
  );
};

module.exports = { rTrabajadores, rCultivos, rCategorias, rHorasTrabajadas };
