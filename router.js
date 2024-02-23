const express = require("express");
const router = express.Router();
const db = require("./db/db");
const TrabajadoresController = require("./controller/trabajadoresController");
const morgan = require("morgan");

router.use(morgan("dev"));
router.use(express.json());

router.get("/", TrabajadoresController.mostrarTrabajadores);

module.exports = router;
