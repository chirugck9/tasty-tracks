const { Router } = require("express");
const { createOrder, getAllOrders } = require("../controllers/orders");

const router = Router();

router.post("/orders", createOrder);
router.get("/orders/:page_id/:limit", getAllOrders);

module.exports = router;
