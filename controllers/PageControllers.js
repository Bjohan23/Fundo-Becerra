const db = require("../db/db");

const vistaPrincipal = async function (req, res) {
  try {
    const categorias = await db`SELECT * FROM categoria`;
    res.render("home", { categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al realizar la consulta a la base de datos");
  }
};

const vistaLogin = function (req, res) {
  res.render("login");
};
const vistaTable = async function (req, res) {
  try {
    const trabajadores = await db`SELECT * FROM trabajadores`;
    res.render("tables", { trabajadores });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al realizar la consulta a la base de datos");
  }
};

const vistaTableCategorias = async function (req, res) {
  try {
    const categorias = await db`SELECT * FROM categoria`;
    res.render("categorias", { categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al realizar la consulta a la base de datos");
  }
};

const vistaCultivos = async (req, res) => {
  try {
    const cultivos = await db`SELECT * FROM cultivo`;
    const categorias = await db`SELECT * FROM categoria`;
    res.render("cultivos", { cultivos, categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al realizar la consulta a la base de datos");
  }
};

const vistaTareas = async (req, res) => {
  try {
    const tareas = await db`SELECT * FROM tareas`;
    const trabajadores = await db`SELECT * FROM trabajadores`;
    res.render("tareas", { tareas: tareas, trabajadores: trabajadores });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send("Error al obtener tareas o trabajadores: " + error.message);
  }
};

// const vistaTareas = (req, res) => {
//   db.query("SELECT * FROM tareas", (error, tareas, fields) => {
//     if (error) throw error;
//     db.query("SELECT * FROM trabajadores", (error, trabajadores, fields) => {
//       if (error) throw error;
//       res.render("tareas", { tareas: tareas, trabajadores: trabajadores });
//       console.log(tareas);
//     });
//   });
// };

const vistaNorificaciones = function (req, res) {
  res.render("notificaciones");
};
const vistaCuentas = (req, res) => {
  res.render("cuentas");
};
const vistaUsuario = (req, res) => {
  res.render("user");
};

const vistaEror = function (req, res) {
  res.status(404).render("404");
};

// editar
const vistaEditCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await db`SELECT * FROM categoria WHERE id = ${id}`;
    if (categoria.length > 0) {
      res.render("categoria_edit", { categoria: categoria[0] });
    } else {
      res.status(404).render("404", { texto: "Categoría no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al realizar la consulta a la base de datos");
  }
};

const vistaEditCultivo = async (req, res) => {
  const { id } = req.params;
  try {
    const cultivo = await db`SELECT * FROM cultivo WHERE id = ${id}`;
    if (cultivo.length > 0) {
      const categoria = await db`SELECT * FROM categoria`;
      let fecha = cultivo[0].fecha.toISOString().split("T")[0];
      res.render("cultivo_edit", {
        cultivo: { ...cultivo[0], fecha: fecha },
        categoria: categoria,
      });
    } else {
      res.status(404).render("404", { texto: "Cultivo no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al realizar la consulta a la base de datos");
  }
};

const vistaEditTrabajadores = async (req, res) => {
  const { id } = req.params;
  try {
    const trabajador = await db`SELECT * FROM trabajadores WHERE id = ${id}`;
    if (trabajador.length > 0) {
      res.render("trabajadores_edit", { trabajador: trabajador[0] });
    } else {
      res.status(404).render("404", { texto: "Trabajador no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al realizar la consulta a la base de datos");
  }
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
  vistaCuentas,
  vistaTareas,
  vistaLogin,
};
