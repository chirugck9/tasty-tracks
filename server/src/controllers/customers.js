const db = require("../db");
const { hash } = require("bcryptjs");

//function to create customer

const createCustomer = async (req, res) => {
	const { first_name, last_name, email, phone_number, password, address } =
		req.body;
	const hashedPassword = await hash(password, 10);
	const query = {
		text: "INSERT INTO customers(first_name,last_name,email,phone_number,password,address) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
		values: [
			first_name,
			last_name,
			email,
			phone_number,
			hashedPassword,
			address,
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

//function to get customers by id
const getCustomerById = async (req, res) => {
	try {
		const query = {
			text: "SELECT * FROM customers WHERE customer_id = $1",
			values: [req.params.customer_id],
		};
		const result = await db.query(query);
		if (result.rows[0]) {
			return res.status(200).json({
				success: true,
				message: "Customer retrived succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Customer not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching the customer");
	}
};

//function to update customer by customer_id
const updateCustomerById = async (req, res) => {
	const { first_name, last_name, email, password, phone_number, address } =
		req.body;
	const customerId = req.params.customer_id;
	try {
		const query = {
			text: "UPDATE customers SET first_name = $1 ,last_name = $2 , email = $3 ,password = $4 , phone_number = $5,address = $6 WHERE customer_id = $7 RETURNING *",
			values: [
				first_name,
				last_name,
				email,
				password,
				phone_number,
				address,
				customerId,
			],
		};
		const result = await db.query(query);
		const queryUser = {
			text: "UPDATE users SET first_name = $1 ,last_name = $2 , email = $3 ,password = $4 , phone_number = $5,address = $6 WHERE id= $7 RETURNING *",
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
				message: "Customer updated succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Customer not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error has occured while updating the customer");
	}
};
//delete customer by customer id
const deleteCustomerById = async (req, res) => {
	try {
		const query = {
			text: "DELETE FROM customers WHERE customer_id = $1 RETURNING *",
			values: [req.params.customer_id],
		};
		const result = await db.query(query);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Customer deleted succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Customer not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while deleting the customer");
	}
};

module.exports = {
	createCustomer,
	getAllCustomers,
	getCustomerById,
	updateCustomerById,
	deleteCustomerById,
};
