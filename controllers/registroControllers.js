const db = require("../db/db");
const socket = require("../socket");
const io = socket.getIO();

const rTrabajadores = (req, res) => {
  const { nombres, apellidos, edad, sexo, celular, dni } = req.body;
  console.log(nombres, apellidos, edad, sexo, celular, dni);
  db.query(
    "INSERT INTO trabajadores (nombres, apellidos, edad, sexo, celular, dni) VALUES (?,?,?,?,?,?)",
    [nombres, apellidos, edad, sexo, celular, dni],
    (error, results, fields) => {
      if (error) throw error;
      // Emitir evento a través de socket.io
      io.emit("nuevoTrabajador", {
        id: results.insertId, // Aquí se obtiene el id del nuevo trabajador
        nombres,
        apellidos,
        edad,
        sexo,
        celular,
        dni,
      });
    res.json({ message: "Trabajador registrado con éxito" });
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
        // Consulta para obtener el nombre de la categoría
        db.query(
          "SELECT nombre FROM categoria WHERE id = ?",
          [categoria],
          (error, results) => {
            if (error) {
              res
                .status(500)
                .send("Error al obtener el nombre de la categoría");
            } else {
              const nombreCategoria = results[0].nombre;
              console.log("Cultivo insertado correctamente:", result);
              io.emit("nuevoCultivo", {
                id: result.insertId,
                nombreProducto,
                peso,
                cantidad,
                fecha,
                categoria: nombreCategoria, // Usar el nombre de la categoría en lugar del ID
              });
              res.redirect("/cultivos");
            }
          }
        );
      }
    }
  );
};
// registrar tareas
const rTareas = (req, res) => {
  const { descripcion, trabajador } = req.body;
  console.log("datos", descripcion, trabajador);
  db.query(
    "INSERT INTO tareas (descripcion, trabajador_id) VALUES (?,?)",
    [descripcion, trabajador],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al insertar la tarea");
      } else {
        // consulta para obtener el nombre del trabajador
        db.query(
          "SELECT nombres FROM trabajadores WHERE id = ?",
          [trabajador],
          (error, results) => {
            if (error) {
              res.status(500).send("Error al obtener el nombre del trabajador");
            } else {
              const nombreTrabajador = results[0].nombres;
              console.log("Tarea insertada correctamente:", result);
              io.emit("nuevaTarea", {
                id: result.insertId,
                descripcion,
                trabajador: nombreTrabajador, // Enviar el nombre del trabajador en lugar del ID
              });
              res.redirect("/tareas");
            }
          }
        );
      }
    }
  );
};
const rCategorias = (req, res) => {
  const { nombre } = req.body;
  // Crear una nueva categoría
  db.query(
    "INSERT INTO categoria (nombre) VALUES (?)",
    [nombre],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al insertar la categoría");
      } else {
        console.log("Categoría insertada correctamente:", result);
        io.emit("nuevaCategoria", {
          id: result.insertId,
          nombre,
        });
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

module.exports = {
  rTrabajadores,
  rCultivos,
  rCategorias,
  rHorasTrabajadas,
  rTareas,
};
