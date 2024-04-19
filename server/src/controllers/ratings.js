const db = require("../db");

//create rating
const createRating = async (req, res) => {
	const {
		orderId,
		restaurantRating,
		restaurantComment,
		deliveryPersonRating,
		deliveryPersonComment,
	} = req.body;
	try {
		const query = {
			text: ` INSERT INTO ratings (
                order_id,
                restaurant_id,
                restaurant_rating,
                restaurant_comment,
                delivery_person_id,
                delivery_person_rating,
                delivery_person_comment
              ) 
              SELECT 
                $1,
                o.restaurant_id,
                $2,
                $3,
                o.delivery_person_id,
                $4,
                $5 
              FROM 
                orders o 
              WHERE 
                o.order_id = $1
            `,
			values: [
				orderId,
				restaurantRating,
				restaurantComment,
				deliveryPersonRating,
				deliveryPersonComment,
			],
		};
		const result = await db.query(query);
		return res.status(201).json({
			success: true,
			message: "Rating submitted succesfully",
			data: result.rows[0],
		});
	} catch (error) {
		console.error(error);
		throw new Error("An error occured while submitting ratings");
	}
};

//average rating of restaurant
const avgRatingOfRestaurantById = async (req, res) => {
	const { restaurantId } = req.params;
	try {
		const query = {
			text: `SELECT ROUND(AVG(restaurant_rating),2) AS average_rating FROM ratings WHERE restaurant_id = $1`,
			values: [restaurantId],
		};
		const result = await db.query(query);
		const avgRating = result.rows[0].average_rating;
		return res.status(200).json({
			success: true,
			message: "Avg fetched succesfully",
			data: [avgRating],
		});
	} catch (error) {
		console.error(error);
		throw new Error(
			"An error occcured while calculating avg rating of restaurant"
		);
	}
};
module.exports = { createRating, avgRatingOfRestaurantById };
