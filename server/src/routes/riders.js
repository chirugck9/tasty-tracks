const { Router } = require("express");
const {
	createRider,
	getAllRiders,
	getRiderById,
	updateRiderByid,
} = require("../controllers/riders");

const router = Router();

router.post("/riders", createRider);
router.get("/riders/:page_id/:limit", getAllRiders);
router.get("/riders/:delivery_person_id", getRiderById);
router.put("/riders/:delivery_person_id", updateRiderByid);

module.exports = router;
