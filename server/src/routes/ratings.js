const { Router } = require("express");
const {
	createRating,
	avgRatingOfRestaurantById,
} = require("../controllers/ratings");

const router = Router();

router.post("/ratings", createRating);
router.get("/avg-ratings/:restaurantId", avgRatingOfRestaurantById);

module.exports = router;
