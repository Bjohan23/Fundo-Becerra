const { Pool } = require("pg");

const pool = new Pool({
  host: "dpg-cmo5d7un7f5s73d31vj0-a.oregon-postgres.render.com",
  port: 5432,
  database: "crud_nodejs_db",
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
