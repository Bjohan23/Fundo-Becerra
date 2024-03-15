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
  db.query("DELETE FROM trabajadores WHERE id = ?", [id], (error, result) => {
    if (error) {
      res
        .status(404)
        .render("404", { texto: "Error al eliminar el trabajador" });
    } else {
      // Emitir evento de trabajador eliminado
      io.emit("trabajadorEliminado", { id });
      console.log("Trabajador eliminado correctamente", { id });
      res.redirect("/tabla");
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
