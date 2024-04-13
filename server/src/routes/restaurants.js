const { Router } = require("express");
const {
	createRestaurant,
	getAllRestaurants,
	getRestaurantByid,
	updateRestaurantById,
	deleteRestaurantById,
} = require("../controllers/restaurants");

const router = Router();

router.post("/restaurants", createRestaurant);
router.get("/restaurants/:page_id/:limit", getAllRestaurants);
router.get("/restaurants/:restaurant_id", getRestaurantByid);
router.put("/restaurants/:restaurant_id", updateRestaurantById);
router.delete("/restaurants/:restaurant_id", deleteRestaurantById);

module.exports = router;
