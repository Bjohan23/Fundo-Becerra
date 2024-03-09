const db = require("../db/db");

const eliminarCategoria = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM categoria WHERE id = ?", [id], (error, result) => {
    if (error) {
      res
        .status(404)
        .render("404", { texto: "Error al eliminar la categoría" });
    } else {
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
      res.redirect("/tabla");
    }
  });
};
module.exports = { eliminarCategoria, eliminarTrabajadores, eliminarCultivos };
