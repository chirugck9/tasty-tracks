const { Router } = require("express");
const { getUsers, register, login } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
	validationMiddleware,
} = require("../middlewares/validation-middlewares");

const router = Router();

router.get("/get-users/:page_id/:limit", getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);

module.exports = router;
