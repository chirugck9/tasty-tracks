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
		total_price,
		order_items,
	} = req.body;
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
				values: [
					orderId,
					item.menu_item_id,
					item.quantity,
					item.price,
					item.special_instructions,
				],
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

module.exports = {
	createOrder,
	getAllOrders,
};
