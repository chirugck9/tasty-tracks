const { Router } = require("express");
const {
	createRestaurantOwner,
	getAllRestaurantOwners,
	getRestaurantOwnerById,
} = require("../controllers/restaurant-owners");

const router = Router();

router.post("/restaurant-owners", createRestaurantOwner);
router.get("/restaurant-owners/:page_id/:limit", getAllRestaurantOwners);
router.get("/restaurant-owners/:owner_id", getRestaurantOwnerById);

module.exports = router;
