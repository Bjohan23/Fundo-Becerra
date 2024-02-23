var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fundo_becerra",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conectado!");
  console.log();
});

// con.query("SELECT * FROM trabajadores", function (err, result, fields) {
//   if (err) throw err;
//   console.log(result);
// });

module.exports = con; // Exportamos la conexión para poder utilizarla en otros archivos
