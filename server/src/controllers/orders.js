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
		console.log(result);
		// const orderId = result.rows[0].order_id;
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while creating the order");
	}
};

module.exports = {
	createOrder,
};
