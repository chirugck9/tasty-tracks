const { check } = require("express-validator");
const db = require("../db");

//email
const email = check("email")
	.isEmail()
	.withMessage("Please provide a valid email");

//password
const password = check("password")
	.isLength({ min: 6, max: 15 })
	.withMessage("The password has to be between 6 to 15 characters");

//role
const allowedRole = ["Customer", "Restaurant Owner", "Delivery Agent"];
const role = check("role_type")
	.isIn(allowedRole)
	.withMessage(
		"Invalid role. Allowed roles are: Customer,Restaurant Owner,Delivery Agent"
	);

//if email already exists
const emailExists = check("email").custom(async (value) => {
	const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
		value,
	]);
	if (rows.length) {
		throw new Error("Email already exists");
	}
});

module.exports = {
	registerValidation: [email, password, emailExists, role],
};
