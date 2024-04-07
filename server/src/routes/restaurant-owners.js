const { Router } = require("express");
const {
	createRestaurantOwner,
	getAllRestaurantOwners,
	getRestaurantOwnerById,
	updateRestaurantOwnerById,
	deleteRestaurantOwnerById,
} = require("../controllers/restaurant-owners");

const router = Router();

router.post("/restaurant-owners", createRestaurantOwner);
router.get("/restaurant-owners/:page_id/:limit", getAllRestaurantOwners);
router.get("/restaurant-owners/:owner_id", getRestaurantOwnerById);
router.put("/restaurant-owners/:owner_id", updateRestaurantOwnerById);
router.delete("/restaurant-owners/:owner_id", deleteRestaurantOwnerById);

module.exports = router;
