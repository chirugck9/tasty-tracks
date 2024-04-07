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

//update restaurant owner by id
const updateRestaurantOwnerById = async (req, res) => {
	const { first_name, last_name, email, password, phone_number, address } =
		req.body;
	const ownerId = req.params.owner_id;
	try {
		const query = {
			text: "UPDATE restaurant_owners SET first_name = $1,last_name = $2,email = $3,password = $4, phone_number = $5 , address = $6 WHERE owner_id = $7 RETURNING *",
			values: [
				first_name,
				last_name,
				email,
				password,
				phone_number,
				address,
				ownerId,
			],
		};
		const result = await db.query(query);
		const queryUser = {
			text: "UPDATE users SET first_name = $1,last_name = $2,email = $3,password = $4, phone_number = $5 , address = $6 updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *",
			values: [
				first_name,
				last_name,
				email,
				password,
				phone_number,
				address,
				result.rows[0].user_id,
			],
		};
		const resultUser = await db.query(queryUser);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Restaurant owner updated succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Restaurant owner not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while updating the restaurant owner");
	}
};

//delete restaurant owner by id
const deleteRestaurantOwnerById = async (req, res) => {
	try {
		const query = {
			text: "DELETE FROM restaurant_owners WHERE owner_id = $1 RETURNING *",
			values: [req.params.owner_id],
		};
		const result = await db.query(query);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Restaurant owner deleted succesfully",
				data: result.rows[0],
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while deleting restaurant owner");
	}
};

module.exports = {
	createRestaurantOwner,
	getAllRestaurantOwners,
	getRestaurantOwnerById,
	updateRestaurantOwnerById,
	deleteRestaurantOwnerById,
};
