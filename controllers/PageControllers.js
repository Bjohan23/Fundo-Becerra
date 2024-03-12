const con = require("../db/db");
const db = require("../db/db");

const vistaPrincipal = function (req, res) {
  // hacemos la consulta a la base de datos
  db.query("SELECT * FROM categoria", (error, categorias, fields) => {
    if (error) throw error;
    // renderizamos la vista y le pasamos los datos de la consulta
    res.render("home", { categorias: categorias });
    console.log(categorias);
  });
};
const vistaTable = function (req, res) {
  // hacemos la consulta a la base de datos
  db.query("SELECT * FROM trabajadores", (error, trabajadores, fields) => {
    if (error) throw error;
    // renderizamos la vista y le pasamos los datos de la consulta
    // console.log(trabajadores);
    res.render("tables", { trabajadores: trabajadores });
    //   res.json(trabajadores);
  });
  // res.render("tables");
};
const vistaTableCategorias = function (req, res) {
  // hacemos la consulta a la base de datos
  db.query("SELECT * FROM categoria", (error, categorias, fields) => {
    if (error) throw error;
    // renderizamos la vista y le pasamos los datos de la consulta
    res.render("categorias", { categorias: categorias });
    console.log(categorias);
  });
};

const vistaCultivos = (req, res) => {
  db.query("SELECT * FROM cultivo", (error, cultivos, fields) => {
    if (error) throw error;

    db.query("SELECT * FROM categoria", (error, categorias, fields) => {
      if (error) throw error;

      // renderizamos la vista y le pasamos los datos de la consulta
      res.render("cultivos", { cultivos: cultivos, categorias: categorias });
      console.log(cultivos);
    });
  });
};
const vistaNorificaciones = function (req, res) {
  res.render("notificaciones");
};
const vistaUsuario = (req, res) => {
  res.render("user");
};

const vistaEror = function (req, res) {
  res.status(404).render("404");
};
// editar
const vistaEditCategoria = (req, res) => {
  const { id } = req.params;
  // console.log("el id es : ", id);
  db.query(
    "SELECT * FROM categoria WHERE id = ?",
    [id],
    (error, categoria, fields) => {
      if (error) throw error;
      if (categoria.length > 0) {
        res.render("categoria_edit", { categoria: categoria[0] });
      } else {
        res.status(404).render("404", { texto: "Categoría no encontrada" });
      }
    }
  );
};

const vistaEditCultivo = (req, res) => {
  const { id } = req.params;
  // Consulta a la base de datos para obtener el cultivo con el id proporcionado
  db.query(
    "SELECT * FROM cultivo WHERE id = ?",
    [id],
    (error, cultivo, fields) => {
      if (error) throw error;
      // Si se encuentra el cultivo
      if (cultivo.length > 0) {
        // Consulta a la base de datos para obtener todas las categorías
        db.query("SELECT * FROM categoria ", (error, categoria, fields) => {
          if (error) throw error;
          // Formatea la fecha a YYYY-MM-DD
          let fecha = cultivo[0].fecha.toISOString().split("T")[0];
          // Renderiza la vista "cultivo_edit" y pasa los datos del cultivo y las categorías
          res.render("cultivo_edit", {
            cultivo: { ...cultivo[0], fecha: fecha },
            categoria: categoria,
          });
          console.log(cultivo);
        });
      } else {
        // Si no se encuentra el cultivo, renderiza la página 404
        res.status(404).render("404", { texto: "Cultivo no encontrado" });
      }
    }
  );
};
const vistaEditTrabajadores = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM trabajadores WHERE id = ?",
    [id],
    (error, trabajador, fields) => {
      if (error) throw error;
      if (trabajador.length > 0) {
        res.render("trabajadores_edit", { trabajador: trabajador[0] });
        console.log(trabajador);
      } else {
        res.status(404).render("404", { texto: "Trabajador no encontrado" });
      }
    }
  );
};

module.exports = {
  vistaPrincipal,
  vistaTable,
  vistaNorificaciones,
  vistaEror,
  vistaUsuario,
  vistaTableCategorias,
  vistaCultivos,
  vistaEditCategoria,
  vistaEditCultivo,
  vistaEditTrabajadores,
};
