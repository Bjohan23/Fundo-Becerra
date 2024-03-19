const { Pool } = require("pg");

const pool = new Pool({
  host: "dpg-cmo5d7un7f5s73d31vj0-a.oregon-postgres.render.com",
  port: 5432,
  database: "postgres",
  user: "johan",
  password: "6kFs5GDYo9pDt4zDXmONeTCD3xkrX4cz",
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = pool; // Exportamos la conexión para poder utilizarla en otros archivos

// Exportamos la conexión para poder utilizarla en otros archivos

/*
Anfitrión: sql6.freesqldatabase.com
Nombre de la base de datos: sql6689014
Usuario de la base de datos: sql6689014
Contraseña de la base de datos: u9DTru6xlL
Número de puerto: 3306
 */
// var con = mysql.createConnection({
//   host: "sql6.freesqldatabase.com",
//   user: "sql6689014",
//   password: "u9DTru6xlL",
//   database: "sql6689014",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Conectado!");
//   console.log();
// });

/*
const { Pool } = require("pg");

const pool = new Pool({
  host: "dpg-cmo5d7un7f5s73d31vj0-a.oregon-postgres.render.com",
  port: 5432,
  database: "postgres",
  user: "johan",
  password: "6kFs5GDYo9pDt4zDXmONeTCD3xkrX4cz",
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database");
  }
});

module.exports = pool;
*/
