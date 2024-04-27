require("dotenv").config();
const { Pool } = require("pg");

// const pool = new Pool({
// 	user: "postgres",
// 	host: "localhost",
// 	database: "tasty_tracks",
// 	password: "violet7#sql",
// 	port: 5432,
// });

const pool = new Pool({
	user: "postgres",
	host: "database-1.c5ak0u8oipwm.ap-south-1.rds.amazonaws.com",
	database: "tasty_tracks",
	password: "violet77#sql",
	port: 5432,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = {
	query: (text, params) => pool.query(text, params),
	pool: pool,
};
