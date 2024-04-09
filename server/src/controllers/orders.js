const db = require("../db");

//create order
const createOrder = async (req, res) => {
	const {
		customer_id,
		restaurant_id,
		delivery_person_id,
		delivery_address,
		total_price,
	} = req.body;
	const orderQuery = {
		text: "INSERT INTO orders(customer_id,restaurant_id,delivery_person_id,delivery_address,total_price) VALUES ($1,$2,$3,$4,$5) RETURNING * ",
		values: [
			customer_id,
			restaurant_id,
			delivery_person_id,
			delivery_address,
			total_price,
		],
	};
	try {
		const result = await db.query(orderQuery);
		const orderId = result.rows[0].order_id;

		const itemsQuery = {
			text: "INSERT INTO order_items (order_id, menu_item_id, quantity, price, description) VALUES ($1, $2, $3, $4, $5)",
		};
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating the order");
	}
};
