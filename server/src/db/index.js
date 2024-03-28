require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "tasty_tracks",
	password: "violet7#sql",
	port: 5432,
});

module.exports = {
	query: (text, params) => pool.query(text, params),
	pool: pool,
};
