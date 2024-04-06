const { Router } = require("express");
const { createRestaurantOwner } = require("../controllers/restaurant-owners");

const router = Router();

router.post("/restaurant-owners", createRestaurantOwner);

module.exports = router;
