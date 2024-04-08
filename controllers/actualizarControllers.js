const db = require("../db/db-local");
const socket = require("../socket");
const io = socket.getIO();

const actualizarCultivo = (req, res) => {
  const { id, nombreProducto, peso, cantidad, fecha, categoria } = req.body;
  console.log(
    "Datos a actualizar:",
    id,
    nombreProducto,
    peso,
    cantidad,
    fecha,
    categoria
  );
  db.query(
    "UPDATE cultivo SET nombre = ?, peso = ?, cantidad = ?, fecha = ?, categoria_id = ? WHERE id = ?",
    [nombreProducto, peso, cantidad, fecha, categoria, id],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al actualizar el cultivo");
      } else {
        console.log("Cultivo actualizado correctamente:", result);
        io.emit("cultivoActualizado", {
          id,
          nombreProducto,
          peso,
          cantidad,
          fecha,
          categoria,
        });
        res.redirect("/cultivos");
      }
    }
  );
};

const actualizarCategoria = (req, res) => {
  const { nombre, id } = req.body;
  console.log("Datos a actualizar:", nombre, id);
  db.query(
    "UPDATE categoria SET nombre = ? WHERE id = ?",
    [nombre, id],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al actualizar la categoría");
      } else {
        console.log("Categoría actualizada correctamente:", result);
        io.emit("categoriaActualizada", { id, nombre });
        res.redirect("/categorias");
      }
    }
  );
};
const actualizarTrabajadores = (req, res) => {
  const { id, nombres, apellidos, dni, celular, edad, sexo } = req.body;

  console.log(
    "Datos a actualizar:",
    id,
    nombres,
    apellidos,
    dni,
    celular,
    edad,
    sexo
  );
  db.query(
    "UPDATE trabajadores SET nombres = ?, apellidos = ?,celular = ?, dni= ?, edad = ? ,sexo = ? WHERE id = ?",
    [nombres, apellidos, celular, dni, edad, sexo, id],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al actualizar el trabajador");
      } else {
        // Emitir evento de trabajador actualizado
        io.emit("trabajadorActualizado", {
          id,
          nombres,
          apellidos,
          dni,
          celular,
          edad,
          sexo,
        });
        res.redirect("/tabla");
      }
    }
  );
};
const acTareas = (req, res) => {
  const { estado } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE tareas SET estado = ? WHERE id = ?",
    [estado, id],
    (error, result) => {
      if (error) {
        res.status(500).send("Error al actualizar el estado de la tarea");
      } else {
        io.emit("tareaActualizada", { id, estado });
        res.send("Estado de la tarea actualizado correctamente");
      }
    }
  );
};

module.exports = {
  actualizarCultivo,
  actualizarCategoria,
  actualizarTrabajadores,
  acTareas,
};
