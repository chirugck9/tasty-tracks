const { Router } = require("express");
const {
	createMenuItem,
	getAllMenuItems,
	getMenuItemById,
	updateMenuItemById,
	deleteMenuItemById,
} = require("../controllers/menu-items");

const router = Router();

router.post("/menu-items", createMenuItem);
router.get("/menu-items/:page_id/:limit", getAllMenuItems);
router.get("/menu-items/:item_id", getMenuItemById);
router.put("/menu-items/:item_id", updateMenuItemById);
router.delete("/menu-items/:item_id", deleteMenuItemById);

module.exports = router;
