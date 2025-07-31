const { Pool } = require('pg'); // Añade esta línea al inicio

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool  // Exportamos el pool por si necesitas acceso directo
};