const { Router } = require("express");
const { getUsers, register, protected } = require("../controllers/auth");
const { registerValidation } = require("../validators/auth");
const {
	validationMiddleware,
} = require("../middlewares/validation-middlewares");

const router = Router();

router.get("/get-users/:page_id/:limit", getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.get("/protected", userAuth, protected);

module.exports = router;
