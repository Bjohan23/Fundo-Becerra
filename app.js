const express = require("express");
const app = express();

app.set("view engine", "ejs"); //para que pueda renderizar vistas
app.use(express.urlencoded({ extended: false })); //Para que pueda recibir datos de formularios
app.get("/", require("./router"));

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000: http://localhost:3000/");
});
