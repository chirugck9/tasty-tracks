const { Router } = require("express");
const { createRating } = require("../controllers/ratings");

const router = Router();

router.post("/ratings", createRating);

module.exports = router;
