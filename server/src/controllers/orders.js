const db = require("../db");

//create order
const createOrder = async (req, res) => {
	const {
		customer_id,
		restaurant_id,
		delivery_person_id,
		delivery_address,
		city,
		state,
		zipcode,
		country,
		order_items,
	} = req.body;
	let total_price = 0;
	for (const item of order_items) {
		total_price += item.price * item.quantity;
	}
	const orderQuery = {
		text: "INSERT INTO orders(customer_id,restaurant_id,delivery_person_id,delivery_address,city,state,zipcode,country,total_price) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING order_id ",
		values: [
			customer_id,
			restaurant_id,
			delivery_person_id,
			delivery_address,
			city,
			state,
			zipcode,
			country,
			total_price,
		],
	};
	try {
		const result = await db.query(orderQuery);
		const orderId = result.rows[0].order_id;
		for (const item of order_items) {
			const { menu_item_id, quantity, price, special_instructions } = item;
			const itemsQuery = {
				text: "INSERT INTO order_items (order_id,menu_item_id,quantity,price,special_instructions) VALUES($1,$2,$3,$4,$5) RETURNING *",
				values: [orderId, menu_item_id, quantity, price, special_instructions],
			};
			const itemResult = await db.query(itemsQuery);
		}

		return res.status(201).json({
			success: true,
			message: "Order created succesfully",
			data: { order_id: orderId, order_items },
		});
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating the order");
	}
};

//get all orders
const getAllOrders = async (req, res) => {
	try {
		const page_id = req.params.page_id;
		const limit = req.params.limit;
		const offset = (page_id - 1) * limit;
		const query = {
			text: "SELECT * FROM orders ORDER BY created_at OFFSET($1) LIMIT ($2)",
			values: [offset, limit],
		};
		const result = await db.query(query);
		if (!(result.rowCount === 0)) {
			return res.status(200).json({
				success: true,
				message: "All orders list",
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
		throw new Error("An error occured while fetching orders");
	}
};

//get order by id
const getOrderByid = async (req, res) => {
	try {
		const query = {
			text: "SELECT * FROM orders WHERE order_id = $1",
			values: [req.params.order_id],
		};
		const result = await db.query(query);
		if (result.rows[0]) {
			return res.status(200).json({
				success: true,
				message: "Order retrived succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Order not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while fetching order by id");
	}
};

//update order by id
const updateOrderById = async (req, res) => {
	const {
		order_id,
		customer_id,
		restaurant_id,
		delivery_person_id,
		delivery_address,
		city,
		state,
		zipcode,
		country,
		total_price,
		order_items,
	} = req.body;
	const orderId = req.params.order_id;
	try {
		const query = {
			text: "UPDATE orders SET customer_id = $1 , restaurant_id= $2 , delivery_person_id = $3 ,delivery_address = $4 , city = $5, state = $6,zipcode = $7 , country = $8 ,total_price=$9,order_items=$10 WHERE order_id = $11 RETURNING *",
			values: [
				order_id,
				customer_id,
				restaurant_id,
				delivery_person_id,
				delivery_address,
				city,
				state,
				zipcode,
				country,
				total_price,
				order_items,
				orderId,
			],
		};
		const result = await db.query(query);

		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "Order updated succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("Order not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error has occured while updating the order");
	}
};

//delete order
const deleteOrderById = async (req, res) => {
	try {
		const query = {
			text: "DELETE FROM orders WHERE order_id = $1",
			values: [req.params.order_id],
		};
		const result = await db.query(query);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: "order deleted succesfully",
				data: result.rows[0],
			});
		} else {
			throw new Error("order not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while deleting the order");
	}
};

//upadte order status
const updateOrderStatusById = async (req, res) => {
	try {
		const orderId = req.params.order_id;
		const status = req.params.status;
		const query = {
			text: "UPDATE orders SET status = $1 WHERE order_id = $2",
			values: [status, orderId],
		};
		const result = await db.query(query);
		if (result.rowCount === 1) {
			return res.status(200).json({
				success: true,
				message: `Order status updated to ${status}`,
				data: result.rows[0],
			});
		} else {
			throw new Error("Order not found");
		}
	} catch (error) {
		console.error(error);
		throw new Error("An error has occurred while updating the order status");
	}
};

module.exports = {
	createOrder,
	getAllOrders,
	getOrderByid,
	updateOrderById,
	deleteOrderById,
	updateOrderStatusById,
};
