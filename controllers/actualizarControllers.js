const db = require("../db/db");

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
        res.redirect("/categorias");
      }
    }
  );
};
module.exports = { actualizarCultivo, actualizarCategoria };
