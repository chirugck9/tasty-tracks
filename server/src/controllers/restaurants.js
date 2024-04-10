const db = require("../db");

//create restaurant
const createRestaurant = async (req, res) => {
	const {
		restaurant_name,
		restaurant_description,
		address,
		open_hours,
		delivery_radius,
		delivery_fee,
		cuisine_types,
	} = req.body;
	const cuisineTypeJson = JSON.stringify(cuisine_types);
	const query = {
		text: "INSERT INTO restaurants(restaurant_name,restaurant_description,address,open_hours,delivery_radius,delivery_fee,cuisine_types) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
		values: [
			restaurant_name,
			restaurant_description,
			address,
			open_hours,
			delivery_fee,
			delivery_radius,
			cuisineTypeJson,
		],
	};
	try {
		const result = await db.query(query);
		return res.status(201).json({
			success: true,
			message: "Customer added succesfully",
			data: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating the restaurant");
	}
};

module.exports = { createRestaurant };
