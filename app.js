// app.js
const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();

// Configuración del motor de plantillas EJS
app.set("view engine", "ejs");

// Middleware para el uso de layouts con EJS
app.use(expressLayouts);

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para el manejo de datos de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.use("/", require("./routes/router"));

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server is running on port 3000:  http://localhost:3000/");
});
