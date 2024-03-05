const express = require("express");
const http = require("http");
const socket = require("./socket");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const server = http.createServer(app);
socket.init(server); // Inicializa Socket.IO

// Requiere el archivo de rutas después de inicializar Socket.IO
app.use("/", require("./routes/router"));

server.listen(3000, () => {
  console.log("Server is running on port 3000:  http://localhost:3000/");
});
