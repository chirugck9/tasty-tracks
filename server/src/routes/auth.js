const { Router } = require("express");
const { getUsers, register, login, protected } = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
	validationMiddleware,
} = require("../middlewares/validation-middlewares");
const { userAuth } = require("../middlewares/auth-middleware");

const router = Router();

router.get("/get-users/:page_id/:limit", getUsers);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.get("/protected", userAuth, protected);

module.exports = router;
