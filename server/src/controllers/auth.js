const db = require("../db");

exports.getUsers = async (req, res) => {
	try {
		const response = await db.query("SELECT * FROM users");
		console.log(response);
	} catch (error) {
		console.log(error.message);
	}
};
