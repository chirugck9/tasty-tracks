const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const queries = require("./queries");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
	try {
		const page_id = req.params.page_id;
		const limit = req.params.limit;
		const offset = (page_id - 1) * limit;
		const getUsers = {
			text: "SELECT * FROM users ORDER BY registration_date DESC OFFSET ($1) LIMIT ($2)",
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
	const {
		username,
		email,
		password,
		first_name,
		last_name,
		phone_number,
		role_type,
	} = req.body;
	try {
		//hash the users password with bcrypts
		const hashedPassword = await hash(password, 10);

		//insert the user into the database
		let result = await db.query(queries.registerUser, [
			username,
			email,
			hashedPassword,
			first_name,
			last_name,
			phone_number,
			role_type,
		]);
		let newUser = result.rows[0];
		switch (role_type) {
			case "Customer":
				const query_customer = {
					text: "INSERT INTO customers (email,password,first_name,last_name,phone_number,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
					values: [
						email,
						password,
						first_name,
						last_name,
						phone_number,
						newUser.id,
					],
				};
				const RoleBasedRegisterCustomer = await db.query(query_customer);
				console.log(RoleBasedRegisterCustomer.rows[0]);
				break;
			case "Restaurant Owner":
				const query_restaurant_owner = {
					text: "INSERT INTO restaurant_owners (email,password,first_name,last_name,phone_number,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
					values: [
						email,
						password,
						first_name,
						last_name,
						phone_number,
						newUser.id,
					],
				};
				const RoleBasedRegisterRestaurantOwner = await db.query(
					query_restaurant_owner
				);
				console.log(RoleBasedRegisterRestaurantOwner.rows[0]);
				break;
			case "Delivery Agent":
				const query_delivery_agent = {
					text: "INSERT INTO delivery_persons (email,password,first_name,last_name,phone_number,user_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
					values: [
						email,
						password,
						first_name,
						last_name,
						phone_number,
						newUser.id,
					],
				};
				const RoleBasedRegisterDeliveryAgent = await db.query(
					query_delivery_agent
				);
				console.log(RoleBasedRegisterDeliveryAgent.rows[0]);
				break;

			default:
				console.log("Invalid role type");
				break;
		}
		return res.status(201).json({
			success: true,
			message: "Registration was succesfull",
			data: newUser,
		});
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({
			error: "An error occured while registration",
		});
	}
};

exports.login = async (req, res) => {
	let user = req.user;
	let payload = {
		id: user.id,
		email: user.email,
		first_name: user.first_name,
		last_name: user.last_name,
		phone_number: user.phone_number,
		role: user.role_type,
		created_at: user.created_at,
	};
	try {
		const token = await sign(payload, SECRET);
		return res
			.status(200)
			.cookie("token", token, { httpOnly: true })
			.json({
				...user,
				token: token,
				success: true,
				message: "Logged in succesfully",
			});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			error: error.message,
		});
	}
};
exports.protected = async (req, res) => {
	try {
		return res.status(200).json({
			info: "protected info",
		});
	} catch (error) {
		console.log(error.message);
	}
};

exports.logout = async (req, res) => {
	try {
		return res.status(200).clearCookie("token", { httpOnly: true }).json({
			success: true,
			message: "Logged out succesfully",
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({
			error: error.message,
		});
	}
};
