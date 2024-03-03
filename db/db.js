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
}
);

module.exports = con; // Exportamos la conexión para poder utilizarla en otros archivos
