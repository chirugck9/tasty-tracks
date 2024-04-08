const db = require("../db");

//create delivery person
const createRider = async (req, res) => {
	const {
		first_name,
		last_name,
		email,
		password,
		phone_number,
		vehicle_type,
		license_plate,
	} = req.body;
	const query = {
		text: "INSERT INTO delivery_persons (first_name,last_name,email,password,phone_number,vehicle_type,license_plate) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
		values: [
			first_name,
			last_name,
			email,
			password,
			phone_number,
			vehicle_type,
			license_plate,
		],
	};
	try {
		const result = await db.query(query);
		return res.status(200).json({
			success: true,
			message: "Rider added succesfully",
			data: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating the rider");
	}
};

//getAllriders
const getAllRiders = async (req, res) => {
	try {
		const page_id = req.params.page_id;
		const limit = req.params.limit;
		const offset = (page_id - 1) * limit;
		const query = {
			text: "SELECT * FROM delivery_persons ORDER BY registration_date OFFSET($1) LIMIT($2)",
			values: [offset, limit],
		};
		const result = await db.query(query);
		if (!(result.rowCount == 0)) {
			return res.status(200).json({
				success: true,
				message: "All riders list",
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
		throw new Error("An error occured while fetching riders");
	}
};

//get rider by id
const getRiderById = async (req, res) => {
	try {
		const query = {
			text: "SELECT * FROM delivery_persons WHERE delivery_person_id = $1",
			values: [req.params.delivery_person_id],
		};
		const result = await db.query(query);
		if (result.rows[0]) {
			return res.status(200).json({
				success: true,
				message: "rider retrived succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Rider not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching the rider");
	}
};

//update rider by id
const updateRiderByid = async (req, res) => {
	const {
		first_name,
		last_name,
		email,
		password,
		phone_number,
		vehicle_type,
		license_plate,
	} = req.body;
	const riderId = req.params.delivery_person_id;
	try {
		const query = {
			text: "UPDATE delivery_persons SET first_name = $1 ,last_name = $2 , email = $3 ,password = $4 , phone_number = $5,vehicle_type = $6 , license_plate = $7 WHERE delivery_person_id = $8 RETURNING *",
			values: [
				first_name,
				last_name,
				email,
				password,
				phone_number,
				vehicle_type,
				license_plate,
				riderId,
			],
		};
		const result = await db.query(query);
		const queryUser = {
			text: "UPDATE users SET first_name = $1 ,last_name = $2 , email = $3 ,password = $4 , phone_number = $5 WHERE id= $6 RETURNING *",
			values: [
				first_name,
				last_name,
				email,
				password,
				phone_number,
				result.rows[0].user_id,
			],
		};
		const resultUser = await db.query(queryUser);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Rider updated succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Rider not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error has occured while updating the rider");
	}
};
module.exports = {
	createRider,
	getAllRiders,
	getRiderById,
	updateRiderByid,
};
