const { text } = require("express");
const db = require("../db");

//create restaurant
const createRestaurant = async (req, res) => {
	const {
		restaurant_name,
		owner_id,
		restaurant_description,
		address,
		open_hours,
		delivery_radius,
		delivery_fee,
		cuisine_types,
	} = req.body;
	const query = {
		text: "INSERT INTO restaurants(restaurant_name,owner_id,restaurant_description,address,open_hours,delivery_radius,delivery_fee,cuisine_types) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
		values: [
			restaurant_name,
			owner_id,
			restaurant_description,
			address,
			open_hours,
			delivery_fee,
			delivery_radius,
			cuisine_types,
		],
	};
	try {
		const result = await db.query(query);
		return res.status(201).json({
			success: true,
			message: "Restaurant added succesfully",
			data: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating the restaurant");
	}
};

//get all restaurants
const getAllRestaurants = async (req, res) => {
	const page_id = req.params.page_id;
	const limit = req.params.limit;
	const offset = (page_id - 1) * limit;
	const query = {
		text: "SELECT * FROM restaurants ORDER BY registration_date OFFSET($1) LIMIT($2)",
		values: [offset, limit],
	};
	try {
		const result = await db.query(query);
		if (!(result.rowCount === 0)) {
			return res.status(200).json({
				success: true,
				message: "All restaurants",
				data: result.rows,
			});
		} else {
			return res.status(200).json({
				success: true,
				message: "Data limit reached",
				data: [],
			});
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching all restaurants ");
	}
};

//get restaurant by id
const getRestaurantByid = async (req, res) => {
	try {
		const query = {
			text: "SELECT * FROM restaurants WHERE restaurant_id = $1",
			values: [req.params.restaurant_id],
		};
		const result = await db.query(query);
		if (result.rows[0]) {
			return res.status(200).json({
				success: true,
				message: "Restaurant retrived succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Restaurant not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching restaurant by id");
	}
};

//update restaurant by id
const updateRestaurantById = async (req, res) => {
	const {
		restaurant_name,
		owner_id,
		restaurant_description,
		address,
		open_hours,
		delivery_radius,
		delivery_fee,
		cuisine_types,
	} = req.body;
	const restaurantId = req.params.restaurant_id;
	try {
		const query = {
			text: "UPDATE restaurants SET restaurant_name = $1 , owner_id= $2 , restaurant_description = $3 ,address = $4 , open_hours = $5, delivery_radius = $6,delivery_fee = $7 , cuisine_types = $8 WHERE restaurant_id = $9 RETURNING *",
			values: [
				restaurant_name,
				owner_id,
				restaurant_description,
				address,
				open_hours,
				delivery_radius,
				delivery_fee,
				cuisine_types,
				restaurantId,
			],
		};
		const result = await db.query(query);

		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Restaurant updated succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Restaurant not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error has occured while updating the customer");
	}
};

//delete restaurant by id
const deleteRestaurantById = async (req, res) => {
	try {
		const query = {
			text: "DELETE FROM restaurants WHERE restaurant_id = $1",
			values: [req.params.restaurant_id],
		};
		const result = await db.query(query);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Restaurant deleted succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Restaurant not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while deleting the restaurant");
	}
};
module.exports = {
	createRestaurant,
	getAllRestaurants,
	getRestaurantByid,
	updateRestaurantById,
	deleteRestaurantById,
};
