const db = require("../db");

exports.getUsers = async (req, res) => {
	try {
		const page_id = req.params.page_id;
		const limit = req.params.limit;
		const offset = (page_id - 1) * limit;
		const getUsers = {
			text: "SELECT * FROM users ORDER BY created_at DESC OFFSET ($1) LIMIT ($2)",
			values: [offset, limit],
		};
		const result = await db.query(getUsers);
		if (!(result.rowCount == 0)) {
			return res.status(200).json({
				success: true,
				message: "All users list",
				data: result.rows,
			});
		} else {
			return (
				res.status(200),
				json({
					success: true,
					message: "data limit reached",
					data: [],
				})
			);
		}
	} catch (error) {
		console.log(error.message);
	}
};

exports.register = async (req, res) => {
	try {
		console.log("validation Passed");
	} catch (error) {
		console.log(error.message);
	}
};
