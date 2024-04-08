var mysql = require("mysql");
// local con xampp
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fundo_becerra",
});
module.exports = con; // Exportamos la conexión para poder utilizarla en otros archivos
