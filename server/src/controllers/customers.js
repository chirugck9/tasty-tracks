const db = require("../db");

//function to create customer

const createCustomer = async (req, res) => {
	const { first_name, last_name, email, phone_number, password, address } =
		req.body;
	const query = {
		text: "INSERT INTO customers(first_name,last_name,email,phone_number,password,address) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
		values: [first_name, last_name, email, phone_number, password, address],
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
		throw new Error("An error occured while creating the customer");
	}
};
//function to get all customers
const getAllCustomers = async (req, res) => {
	try {
		const page_id = req.params.page_id;
		const limit = req.params.limit;
		const offset = (page_id - 1) * limit;
		const query = {
			text: "SELECT * FROM customers ORDER BY registration_date OFFSET($1) LIMIT($2)",
			values: [offset, limit],
		};
		const result = await db.query(query);
		if (!(result.rowCount == 0)) {
			return res.status(200).json({
				success: true,
				message: "All customers list",
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
		throw new Error("An error occured while fetching customers");
	}
};

module.exports = { createCustomer, getAllCustomers };
