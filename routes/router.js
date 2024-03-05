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
  vistaFormTrabajadores,
  vistaCultivos,
  vistaTableCategorias,
  vistaEditCategoria,
  vistaEditCultivo,
} = require("../controllers/PageControllers");
const {
  rTrabajadores,
  rCultivos,
  rCategorias,
} = require("../controllers/registroControllers");
const {
  eliminarCategoria,
  eliminarCultivos,
} = require("../controllers/eliminarControllers");
const {
  actualizarCategoria,
  actualizarCultivo,
} = require("../controllers/actualizarControllers");
const router = express.Router();
router.use(morgan("dev"));
router.use("views", express.static("views"));
router.get("/", vistaPrincipal);
router.get("/tabla", vistaTable);
router.get("/notificaciones", vistaNorificaciones);
router.get("/user", vistaUsuario);
router.get("/fTrabajadores", vistaFormTrabajadores);
router.get("/categorias", vistaTableCategorias);
router.get("/cultivos", vistaCultivos);
router.get("/editarCategoria/:id", vistaEditCategoria);
router.get("/editarCultivo/:id", vistaEditCultivo);

// rutas para manegar registros
router.post("/rTrabajadores", rTrabajadores);
router.post("/rCultivos", rCultivos);
router.post("/rCategoria", rCategorias);
// rutas para editar registros
router.post("/eTrabajadores", rTrabajadores);
// router.post("/eCultivos", actualizarCultivo);
router.post("/eCultivos", actualizarCultivo);
router.post("/eCategoria", actualizarCategoria);
// rutas para eliminar registros
// router.post("/dTrabajadores", eliminarTrabajadores);
router.post("/eliminarCultivos/:id", eliminarCultivos);
router.post("/eliminarCategoria/:id", eliminarCategoria);

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
