const db = require("../db");

//create restaurant owner
const createRestaurantOwner = async (req, res) => {
	const { first_name, last_name, email, password, phone_number, address } =
		req.body;
	const query = {
		text: "INSERT INTO restaurant_owners(first_name,last_name,email,password,phone_number,address) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
		values: [first_name, last_name, email, password, phone_number, address],
	};

	try {
		const result = await db.query(query);
		return res.status(201).json({
			success: true,
			message: "Restaurant owner added succesfully",
			data: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating restaurant owner");
	}
};

module.exports = { createRestaurantOwner };
