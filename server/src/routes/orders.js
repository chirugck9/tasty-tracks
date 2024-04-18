const { Router } = require("express");
const {
	createOrder,
	getAllOrders,
	getOrderByid,
	updateOrderById,
	deleteOrderById,
	updateOrderStatusById,
} = require("../controllers/orders");

const router = Router();

router.post("/orders", createOrder);
router.get("/orders/:page_id/:limit", getAllOrders);
router.get("/orders/:order_id", getOrderByid);
router.put("/orders/:order_id", updateOrderById);
router.delete("/orders/:order_id", deleteOrderById);
router.put("/orders/:order_id/:status", updateOrderStatusById);

module.exports = router;
