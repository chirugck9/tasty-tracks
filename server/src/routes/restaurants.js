const { Router } = require("express");
const { createRestaurant } = require("../controllers/restaurants");

const router = Router();

router.post("/restaurants", createRestaurant);

module.exports = router;
