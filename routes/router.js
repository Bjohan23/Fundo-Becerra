// router.js
const express = require("express");
const morgan = require("morgan");
const socket = require("../socket");

const io = socket.getIO(); // Obtiene la instancia de Socket.IO
const {
  vistaPrincipal,
  vistaTable,
  vistaNorificaciones,
  vistaEror,
  vistaUsuario,
  vistaCultivos,
  vistaTableCategorias,
  vistaEditCategoria,
  vistaEditCultivo,
  vistaEditTrabajadores,
} = require("../controllers/PageControllers");
const {
  rTrabajadores,
  rCultivos,
  rCategorias,
  rHorasTrabajadas,
} = require("../controllers/registroControllers");
const {
  eliminarCategoria,
  eliminarCultivos,
  eliminarTrabajadores,
} = require("../controllers/eliminarControllers");
const {
  actualizarCategoria,
  actualizarCultivo,
  actualizarTrabajadores,
} = require("../controllers/actualizarControllers");
const { mostrarCalendario } = require("../controllers/calendarioController");
const router = express.Router();
router.use(morgan("dev"));
router.use("views", express.static("views"));
// Rutas para las vistas
router.get("/", vistaPrincipal);
router.get("/tabla", vistaTable);
router.get("/notificaciones", vistaNorificaciones);
router.get("/user", vistaUsuario);
router.get("/categorias", vistaTableCategorias);
router.get("/cultivos", vistaCultivos);
router.get("/editarCategoria/:id", vistaEditCategoria);
router.get("/editarCultivo/:id", vistaEditCultivo);
router.get("/trabajadores_edit/:id", vistaEditTrabajadores);

// rutas para manegar registros
router.post("/rTrabajadores", rTrabajadores);
router.post("/rCultivos", rCultivos);
router.post("/rCategoria", rCategorias);
router.post("/rHorasTrabajadas/:id", rHorasTrabajadas);

// rutas para editar registros
router.post("/eTrabajadores", rTrabajadores);
router.post("/eCultivos", actualizarCultivo);
router.post("/eCategoria", actualizarCategoria);
router.post("/aTrabajadores", actualizarTrabajadores);

// router.post("/eCategoria", actualizarCategoria);
// rutas para eliminar registros
router.post("/eliminarTrabajadores/:id", eliminarTrabajadores);
router.post("/eliminarCultivos/:id", eliminarCultivos);
router.post("/eliminarCategoria/:id", eliminarCategoria);

// calenadario
router.get("/mostraCalendario/:id", mostrarCalendario);

io.on("connection", (socket) => {
  console.log("Usuario conectado", socket.id);
  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.id);
  });
  console.log("Usuarios conectados", io.engine.clientsCount);
});

// Middleware para manejar errores
router.use(vistaEror);

module.exports = router; // Cambia { router: router } por router
