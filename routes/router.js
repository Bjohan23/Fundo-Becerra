// router.js
const express = require("express");
const morgan = require("morgan");
const {
  vistaPrincipal,
  vistaTable,
  vistaNorificaciones,
  vistaEror,
  vistaUsuario,
} = require("../controllers/PageControllers");
const router = express.Router();
router.use(morgan("dev"));
router.use("views", express.static("views"));
router.get("/", vistaPrincipal);
router.get("/tabla", vistaTable);
router.get("/notificaciones", vistaNorificaciones);
router.get("/user", vistaUsuario);
router.use(vistaEror);

module.exports = router; // Cambia { router: router } por router
