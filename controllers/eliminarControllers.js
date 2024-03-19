const db = require("../db/db");
const socket = require("../socket");
const io = socket.getIO();

const eliminarCategoria = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM categoria WHERE id = ?", [id], (error, result) => {
    if (error) {
      res
        .status(404)
        .render("404", { texto: "Error al eliminar la categoría" });
    } else {
      io.emit("categoriaEliminada", { id });
      res.redirect("/categorias");
    }
  });
};

const eliminarCultivos = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM cultivo WHERE id = ?", [id], (error, result) => {
    if (error) {
      res.status(404).render("404", { texto: "Error al eliminar el cultivo" });
    } else {
      io.emit("cultivoEliminado", { id });
      res.redirect("/cultivos");
    }
  });
};
const eliminarTrabajadores = (req, res) => {
  const { id } = req.params;

  // Primero, verifica si el trabajador tiene tareas
  db.query("SELECT * FROM tareas WHERE trabajador_id = ?", [id], (error, tareas) => {
    if (error) {
      res.status(500).json({ error: "Error al buscar tareas del trabajador" });
    } else if (tareas.length > 0) {
      // Si el trabajador tiene tareas, no lo elimines
      res.status(400).json({ error: "Trabajador con tareas" });
    } else {
      // Si el trabajador no tiene tareas, procede a eliminarlo
      db.query("DELETE FROM trabajadores WHERE id = ?", [id], (error, result) => {
        if (error) {
          res.status(404).json({ error: "Error al eliminar el trabajador" });
        } else {
          // Emitir evento de trabajador eliminado
          io.emit("trabajadorEliminado", { id });
          console.log("Trabajador eliminado correctamente", { id });
          res.status(200).json({ message: "Trabajador eliminado correctamente" });
        }
      });
    }
  });
};
const eliminarTareas = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tareas WHERE id = ?", [id], (error, result) => {
    if (error) {
      res.status(404).render("404", { texto: "Error al eliminar la tarea" });
    } else {
      io.emit("tareaEliminada", { id });
      res.redirect("/tareas");
    }
  });
};
module.exports = {
  eliminarCategoria,
  eliminarTrabajadores,
  eliminarCultivos,
  eliminarTareas,
};
