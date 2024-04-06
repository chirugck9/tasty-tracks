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

//get all restaurant-owners
const getAllRestaurantOwners = async (req, res) => {
	try {
		const page_id = req.params.page_id;
		const limit = req.params.limit;
		const offset = (page_id - 1) * limit;
		const query = {
			text: "SELECT * FROM restaurant_owners ORDER BY registration_date OFFSET($1) LIMIT ($2)",
			values: [offset, limit],
		};
		const result = await db.query(query);
		if (!(result.rowCount === 0)) {
			return res.status(200).json({
				success: true,
				message: "All restaurant owners list",
				data: result.rows,
			});
		} else {
			return res.status(200).json({
				success: true,
				message: "data limit reached",
				data: [],
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching restaurant owners");
	}
};

//get restaurant owner by id
const getRestaurantOwnerById = async (req, res) => {
	try {
		const query = {
			text: "SELECT * FROM restaurant_owners WHERE owner_id = $1",
			values: [req.params.owner_id],
		};
		const result = await db.query(query);
		if (result.rows[0]) {
			return res.status(200).json({
				success: true,
				message: "Restaurant owner retrieved succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Restaurant owner not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching the restaurant owner");
	}
};

module.exports = {
	createRestaurantOwner,
	getAllRestaurantOwners,
	getRestaurantOwnerById,
};
